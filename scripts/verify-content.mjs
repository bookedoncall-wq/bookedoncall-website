#!/usr/bin/env node

import fs from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const requiredRoutes = [
  "app/page.tsx",
  "app/about/page.tsx",
  "app/features/page.tsx",
  "app/how-it-works/page.tsx",
  "app/pricing/page.tsx",
  "app/sign-up/page.tsx",
  "app/api/leads/route.ts",
  "app/faq/page.tsx",
  "app/examples/page.tsx",
  "app/compare/ai-receptionist-vs-voicemail/page.tsx",
  "app/compare/after-hours-call-answering-for-plumbers/page.tsx",
  "app/for/plumbers/page.tsx",
  "app/for/hvac/page.tsx",
  "app/for/electricians/page.tsx",
  "app/for/painters/page.tsx",
  "app/for/flooring/page.tsx",
  "app/for/landscaping/page.tsx",
  "app/for/general-home-services/page.tsx",
  "app/integrations/jobber/page.tsx",
  "app/integrations/google-calendar/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/dpa/page.tsx",
  "app/llms.txt/route.ts",
  "app/manifest.ts",
  "app/robots.ts",
  "app/sitemap.ts",
]

const bannedPatterns = [
  /join the waitlist/i,
  /\/api\/checkout/i,
  /automatic appointment booking/i,
  /jobber job(?:s)? (?:are|is) created automatically/i,
  /writes? new appointments? back in real time/i,
  /usage analytics dashboard/i,
  /team member access/i,
]

const requiredFiles = [
  ".env.example",
  "config/public-site-contract.json",
  "scripts/sync-monorepo-public-truth.mjs",
  ".github/workflows/verify-content.yml",
]

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8")
}

const errors = []

for (const relativePath of [...requiredRoutes, ...requiredFiles]) {
  if (!fs.existsSync(path.join(repoRoot, relativePath))) {
    errors.push(`Missing required file: ${relativePath}`)
  }
}

const appFiles = []
function collectFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      collectFiles(fullPath)
      continue
    }
    if (/\.(tsx?|json|mjs)$/.test(entry.name)) {
      appFiles.push(fullPath)
    }
  }
}
collectFiles(path.join(repoRoot, "app"))
collectFiles(path.join(repoRoot, "config"))
collectFiles(path.join(repoRoot, "components"))

for (const filePath of appFiles) {
  const source = fs.readFileSync(filePath, "utf8")
  for (const pattern of bannedPatterns) {
    if (pattern.test(source)) {
      errors.push(`Banned phrase or stale checkout reference matched ${pattern} in ${path.relative(repoRoot, filePath)}`)
    }
  }
}

const layoutSource = readText("app/layout.tsx")
if (!layoutSource.includes("StructuredData")) {
  errors.push("app/layout.tsx must emit structured data")
}

const sitemapSource = readText("app/sitemap.ts")
if (!sitemapSource.includes("/faq") || !sitemapSource.includes("/integrations/jobber") || !sitemapSource.includes("/examples")) {
  errors.push("app/sitemap.ts must include FAQ, demo, and integration pages")
}

if (fs.existsSync(path.join(repoRoot, "app/api/checkout/route.ts"))) {
  errors.push("Website-owned checkout route must not exist")
}

if (fs.existsSync(path.join(repoRoot, "public/robots.txt"))) {
  errors.push("Use app/robots.ts as the canonical robots source instead of public/robots.txt")
}

const packageJson = JSON.parse(readText("package.json"))
if (packageJson.dependencies?.stripe || packageJson.devDependencies?.stripe) {
  errors.push("package.json must not depend on stripe in the website repo")
}

const envExample = readText(".env.example")
if (/^\s*STRIPE_[A-Z0-9_]*\s*=/im.test(envExample)) {
  errors.push(".env.example must not define STRIPE_* variables in the website repo")
}

if (errors.length > 0) {
  console.error("verify:content failed")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log("verify:content passed")

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
  "lib/integration-review-intake.ts",
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
  "app/integrations/text-sms/page.tsx",
  "app/integrations/quickbooks/page.tsx",
  "app/integrations/housecall-pro/page.tsx",
  "app/integrations/servicetitan/page.tsx",
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
  /live integrations/i,
  /housecall pro (?:is|integration is) (?:available|supported|live)/i,
  /servicetitan (?:is|integration is) (?:available|supported|live)/i,
  /no setup fees?/i,
  /no contracts/i,
  /no long contract/i,
  /no long-term commitment/i,
  /cancel anytime/i,
]

const requiredFiles = [
  ".env.example",
  "config/public-site-contract.json",
  "scripts/sync-monorepo-public-truth.mjs",
  ".github/workflows/verify-content.yml",
  "scripts/verify-runtime.mjs",
  "scripts/verify-journeys.mjs",
]

const forbiddenLeadWebhookEnvNames = [
  "BOOKEDONCALL_LEAD_WEBHOOK_URL",
  "BOOKEDONCALL_LEAD_WEBHOOK_SECRET",
]

const leadWebhookGuardFiles = [
  ".env.example",
  "README.md",
  "app/api/leads/route.ts",
  "components/marketing/LeadCaptureForm.tsx",
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
collectFiles(path.join(repoRoot, "lib"))

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
if (
  !sitemapSource.includes("/faq") ||
  !sitemapSource.includes("/integrations/jobber") ||
  !sitemapSource.includes("/integrations/text-sms") ||
  !sitemapSource.includes("/integrations/quickbooks") ||
  !sitemapSource.includes("/integrations/housecall-pro") ||
  !sitemapSource.includes("/integrations/servicetitan") ||
  !sitemapSource.includes("/examples")
) {
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
if (packageJson.scripts?.["verify:runtime"] !== "node ./scripts/verify-runtime.mjs") {
  errors.push("package.json must expose npm run verify:runtime for production-mode route and lead API smoke coverage")
}
if (packageJson.scripts?.["verify:journeys"] !== "node ./scripts/verify-journeys.mjs") {
  errors.push("package.json must expose npm run verify:journeys for production-mode marketing route and CTA journey coverage")
}

const envExample = readText(".env.example")
if (/^\s*STRIPE_[A-Z0-9_]*\s*=/im.test(envExample)) {
  errors.push(".env.example must not define STRIPE_* variables in the website repo")
}

for (const relativePath of leadWebhookGuardFiles) {
  const source = readText(relativePath)
  for (const envName of forbiddenLeadWebhookEnvNames) {
    if (source.includes(envName)) {
      errors.push(`${relativePath} must not reference ${envName}; website lead delivery must use explicit Resend email or mailto fallback`)
    }
  }
}

const leadRouteSource = readText("app/api/leads/route.ts")
if (!leadRouteSource.includes("RESEND_API_KEY") || !leadRouteSource.includes("RESEND_FROM_EMAIL")) {
  errors.push("app/api/leads/route.ts must support explicit Resend lead delivery")
}

const runtimeVerifierSource = readText("scripts/verify-runtime.mjs")
for (const requiredRuntimeGuard of [
  ".next/server/app/page.js",
  ".next/server/app/sign-up/page.js",
  ".next/server/app/api/leads/route.js",
  "RESEND_API_KEY: \"\"",
  "Housecall%20Pro%20review%20lead",
  "client_secret: abcdefghijklmnopqrstuvwxyz",
  "Do not paste provider credentials",
]) {
  if (!runtimeVerifierSource.includes(requiredRuntimeGuard)) {
    errors.push(`scripts/verify-runtime.mjs must preserve production runtime guard phrase: ${requiredRuntimeGuard}`)
  }
}
if (!leadRouteSource.includes("mailtoHref") || !leadRouteSource.includes("buildLeadMailtoHref")) {
  errors.push("app/api/leads/route.ts must preserve the mailto fallback lead path")
}

const journeyVerifierSource = readText("scripts/verify-journeys.mjs")
for (const requiredJourneyGuard of [
  "SYNTHETIC_PASS",
  "manual gate",
  "unexpected app handoff path",
  "not deployed website proof",
  "not live in BookedOnCall today",
]) {
  if (!journeyVerifierSource.includes(requiredJourneyGuard)) {
    errors.push(`scripts/verify-journeys.mjs must preserve production journey guard phrase: ${requiredJourneyGuard}`)
  }
}
for (const requiredLeadSecretGuard of [
  "providerSecretMessage",
  "containsProviderSecretLikeContent",
  "@/lib/integration-review-intake",
  "Provider credential policy: no provider credentials should be collected through the public form."
]) {
  if (!leadRouteSource.includes(requiredLeadSecretGuard)) {
    errors.push(`app/api/leads/route.ts must preserve assisted-review secret guard phrase: ${requiredLeadSecretGuard}`)
  }
}

const leadFormSource = readText("components/marketing/LeadCaptureForm.tsx")
if (!leadFormSource.includes("buildLeadMailtoHref") || !leadFormSource.includes("client_request_failed")) {
  errors.push("components/marketing/LeadCaptureForm.tsx must preserve a client-side mailto fallback when lead API submission fails")
}
for (const requiredLeadFormGuard of [
  "containsProviderSecretLikeContent",
  "@/lib/integration-review-intake",
  "Request review",
]) {
  if (!leadFormSource.includes(requiredLeadFormGuard)) {
    errors.push(`components/marketing/LeadCaptureForm.tsx must preserve assisted-review intake guard phrase: ${requiredLeadFormGuard}`)
  }
}

const integrationReviewIntakeSource = readText("lib/integration-review-intake.ts")
for (const requiredSharedGuard of [
  "providerSecretLikePatterns",
  "containsProviderSecretLikeContent",
  "Request Housecall Pro review",
  "Request ServiceTitan review",
  "Do not paste provider credentials",
  "Do not paste API keys, webhook secrets, or credentials",
  "Do not paste tenant IDs, client secrets, app keys, booking-provider tags, or credentials"
]) {
  if (!integrationReviewIntakeSource.includes(requiredSharedGuard)) {
    errors.push(`lib/integration-review-intake.ts must preserve assisted-review intake guard phrase: ${requiredSharedGuard}`)
  }
}

const pricingSource = readText("app/pricing/page.tsx")
if (/No contracts/i.test(pricingSource)) {
  errors.push("app/pricing/page.tsx must not make absolute no-contract claims that can conflict with custom commercial terms")
}

const quickBooksSource = readText("app/integrations/quickbooks/page.tsx")
if (/buildServiceSchema/i.test(quickBooksSource)) {
  errors.push("app/integrations/quickbooks/page.tsx must not emit Service schema for a roadmap-only integration")
}
const assistedReviewRoutes = [
  {
    path: "app/integrations/housecall-pro/page.tsx",
    required: [
      "Assisted integration review",
      "Request Housecall Pro review",
      "No credentials are collected through the public form",
      "Provider-backed test evidence and customer workflow review are required"
    ],
    forbidden: [/Connect Housecall Pro/i, /Housecall Pro is available/i, /Housecall Pro is supported/i]
  },
  {
    path: "app/integrations/servicetitan/page.tsx",
    required: [
      "Assisted integration review",
      "Request ServiceTitan review",
      "No ServiceTitan secrets are collected through the public form",
      "Provider-backed test evidence and customer workflow approval are required"
    ],
    forbidden: [/Connect ServiceTitan/i, /ServiceTitan is available/i, /ServiceTitan is supported/i]
  },
]

for (const { path: relativePath, required, forbidden } of assistedReviewRoutes) {
  const source = readText(relativePath)
  if (/buildServiceSchema/i.test(source)) {
    errors.push(`${relativePath} must not emit Service schema for a roadmap-only integration`)
  }
  for (const requiredPhrase of required) {
    if (!source.includes(requiredPhrase)) {
      errors.push(`${relativePath} must include assisted-review proof-boundary phrase: ${requiredPhrase}`)
    }
  }
  for (const forbiddenPattern of forbidden) {
    if (forbiddenPattern.test(source)) {
      errors.push(`${relativePath} must not imply an unsupported provider is connectable or live: ${forbiddenPattern}`)
    }
  }
}

const verifyWorkflowSource = readText(".github/workflows/verify-content.yml")
if (!/npm run verify:seo/.test(verifyWorkflowSource)) {
  errors.push(".github/workflows/verify-content.yml must run npm run verify:seo after build")
}
if (!/npm run verify:journeys/.test(verifyWorkflowSource)) {
  errors.push(".github/workflows/verify-content.yml must run npm run verify:journeys after build")
}

if (errors.length > 0) {
  console.error("verify:content failed")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log("verify:content passed")

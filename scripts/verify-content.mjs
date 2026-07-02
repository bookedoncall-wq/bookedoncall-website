#!/usr/bin/env node

import fs from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { customerFacingRoutes } from "./lib/customer-facing-routes.mjs"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const requiredRoutes = [
  "app/page.tsx",
  "app/about/page.tsx",
  "app/features/page.tsx",
  "app/how-it-works/page.tsx",
  "app/industries/page.tsx",
  "app/product/page.tsx",
  "app/pricing/page.tsx",
  "app/login/page.tsx",
  "app/sign-up/page.tsx",
  "app/resources/page.tsx",
  "app/integrations/page.tsx",
  "app/api/leads/route.ts",
  "app/api/demo-session/route.ts",
  "lib/integration-review-intake.ts",
  "app/faq/page.tsx",
  "app/demo-calls/page.tsx",
  "app/examples/page.tsx",
  "app/compare/ai-receptionist-vs-voicemail/page.tsx",
  "app/compare/missed-calls-for-home-service-businesses/page.tsx",
  "app/compare/answering-service-vs-receptionist-vs-ai-receptionist/page.tsx",
  "app/compare/after-hours-call-answering-for-hvac/page.tsx",
  "app/compare/after-hours-call-answering-for-plumbers/page.tsx",
  "app/for/plumbers/page.tsx",
  "app/for/hvac/page.tsx",
  "app/for/electricians/page.tsx",
  "app/for/painters/page.tsx",
  "app/for/flooring/page.tsx",
  "app/for/landscaping/page.tsx",
  "app/for/roofing/page.tsx",
  "app/for/general-home-services/page.tsx",
  "app/integrations/jobber/page.tsx",
  "app/integrations/google-calendar/page.tsx",
  "app/integrations/email/page.tsx",
  "app/integrations/text-sms/page.tsx",
  "app/integrations/quickbooks/page.tsx",
  "app/integrations/housecall-pro/page.tsx",
  "app/integrations/servicetitan/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/call-handling-notice/page.tsx",
  "app/sms-terms/page.tsx",
  "app/dpa/page.tsx",
  "app/contact/page.tsx",
  "app/auth-proof/session/page.tsx",
  "app/auth-proof/session/session-client.tsx",
  "app/llms.txt/route.ts",
  "app/manifest.ts",
  "app/robots.txt/route.ts",
  "app/sitemap.xml/route.ts",
  "components/marketing/VapiDemoCallPreview.tsx",
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
  /Available now/i,
  /Integrations available today/i,
  /housecall pro (?:is|integration is) (?:available|supported|live)/i,
  /servicetitan (?:is|integration is) (?:available|supported|live)/i,
  /no setup fees?/i,
  /no contracts/i,
  /no long contract/i,
  /no long-term commitment/i,
  /cancel anytime/i,
  /safe demo path/i,
  /browser call preview/i,
  /configured workflow\*/i,
  /roadmap only\*/i,
  /when it is connected/i,
  /connected in this environment/i,
  /not connected in this environment/i,
  /not connected here/i,
  /this environment yet/i,
  /self-serve checkout is enabled/i,
  /auth proof/i,
  /proof-only route/i,
  /session proof/i,
  /not proof of a live/i,
  /vapi-powered/i,
  /reached vapi/i,
  /vapi session/i,
]

const requiredFiles = [
  ".env.example",
  "config/public-site-contract.json",
  "scripts/check-public-site-contract.mjs",
  ".github/workflows/verify-content.yml",
  "scripts/verify-runtime.mjs",
  "scripts/verify-journeys.mjs",
  "scripts/verify-production-leads.mjs",
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

function normalizeInlineText(value) {
  return value.replace(/\s+/g, " ")
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

const sitemapSource = readText("app/sitemap.xml/route.ts")
for (const route of customerFacingRoutes) {
  if (!sitemapSource.includes(`"${route}"`)) {
    errors.push(`app/sitemap.xml/route.ts must include customer-facing route: ${route}`)
  }
}

if (fs.existsSync(path.join(repoRoot, "app/api/checkout/route.ts"))) {
  errors.push("Website-owned checkout route must not exist")
}

if (fs.existsSync(path.join(repoRoot, "public/robots.txt"))) {
  errors.push("Use app/robots.txt/route.ts as the canonical robots source instead of public/robots.txt")
}

const packageJson = JSON.parse(readText("package.json"))
if (packageJson.dependencies?.stripe || packageJson.devDependencies?.stripe) {
  errors.push("package.json must not depend on stripe in the website repo")
}
if (packageJson.dependencies?.["@vapi-ai/web"] !== "^2.5.2") {
  errors.push("package.json must depend on @vapi-ai/web for the controlled live voice demo")
}
if (packageJson.scripts?.build !== "next build") {
  errors.push("package.json must use the Next 16 default production builder; next build --webpack produced a local next start 500 during launch verification")
}
if (packageJson.scripts?.["verify:runtime"] !== "node ./scripts/verify-runtime.mjs") {
  errors.push("package.json must expose npm run verify:runtime for production-mode route and lead API smoke coverage")
}
if (packageJson.scripts?.["verify:journeys"] !== "node ./scripts/verify-journeys.mjs") {
  errors.push("package.json must expose npm run verify:journeys for production-mode marketing route and CTA journey coverage")
}
if (packageJson.scripts?.["verify:production-leads"] !== "node ./scripts/verify-production-leads.mjs") {
  errors.push("package.json must expose npm run verify:production-leads for synthetic production lead-capture checks")
}
if (packageJson.scripts?.["check:public-truth"] !== "node ./scripts/check-public-site-contract.mjs") {
  errors.push("package.json must expose npm run check:public-truth for website-local public contract checks")
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
  "assertBuildRoutes(repoRoot, requiredBuildRoutes, \"verify:runtime\")",
  "\"/page\"",
  "\"/sign-up/page\"",
  "\"/api/leads/route\"",
  "\"/api/demo-session/route\"",
  "POST /api/demo-session disabled by default",
  "BOOKEDONCALL_DEMO_VOICE_ENABLED: \"false\"",
  "RESEND_API_KEY: \"\"",
  "Housecall%20Pro%20roadmap%20interest",
  "client_secret: abcdefghijklmnopqrstuvwxyz",
  "Do not paste provider credentials",
]) {
  if (!runtimeVerifierSource.includes(requiredRuntimeGuard)) {
    errors.push(`scripts/verify-runtime.mjs must preserve production runtime guard phrase: ${requiredRuntimeGuard}`)
  }
}
const productionLeadVerifierSource = readText("scripts/verify-production-leads.mjs")
for (const requiredProductionLeadGuard of [
  "--execute-send",
  "Synthetic production lead smoke",
  "client_secret: abcdefghijklmnopqrstuvwxyz",
  "Do not paste provider credentials",
  "lead-provider acceptance when delivery=resend",
  "does not prove checkout",
]) {
  if (!productionLeadVerifierSource.includes(requiredProductionLeadGuard)) {
    errors.push(`scripts/verify-production-leads.mjs must preserve production lead verifier guard phrase: ${requiredProductionLeadGuard}`)
  }
}
if (!leadRouteSource.includes("mailtoHref") || !leadRouteSource.includes("buildLeadMailtoHref")) {
  errors.push("app/api/leads/route.ts must preserve the mailto fallback lead path")
}

const examplesSource = readText("app/examples/page.tsx")
if (/\b\d{3}-555-\d{4}\b/.test(examplesSource)) {
  errors.push("app/examples/page.tsx must avoid phone-number-like sample values in public examples")
}
for (const requiredExamplesGuard of [
  "Decision path",
  "See decision paths",
  "View sample conversation",
  "callback number captured",
]) {
  if (!examplesSource.includes(requiredExamplesGuard)) {
    errors.push(`app/examples/page.tsx must preserve compact buyer-friendly examples guard phrase: ${requiredExamplesGuard}`)
  }
}

const journeyVerifierSource = readText("scripts/verify-journeys.mjs")
for (const requiredJourneyGuard of [
  "assertBuildRoutes(repoRoot, requiredBuildRoutes, \"verify:journeys\")",
  "\"/sitemap.xml/route\"",
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
const productionVerifierSource = readText("scripts/lib/next-production-verifier.mjs")
for (const requiredProductionVerifierGuard of [
  ".next/BUILD_ID",
  ".next/server/app-paths-manifest.json",
  ".next/app-path-routes-manifest.json",
  "next start",
  "Request timed out after",
]) {
  if (!productionVerifierSource.includes(requiredProductionVerifierGuard)) {
    errors.push(`scripts/lib/next-production-verifier.mjs must preserve production verification guard phrase: ${requiredProductionVerifierGuard}`)
  }
}
for (const requiredLeadSecretGuard of [
  "providerSecretMessage",
  "containsProviderSecretLikeContent",
  "@/lib/integration-review-intake",
  "Credential note: do not collect provider credentials through the public form."
]) {
  if (!leadRouteSource.includes(requiredLeadSecretGuard)) {
    errors.push(`app/api/leads/route.ts must preserve roadmap-interest secret guard phrase: ${requiredLeadSecretGuard}`)
  }
}

const leadFormSource = readText("components/marketing/LeadCaptureForm.tsx")
if (!leadFormSource.includes("buildLeadMailtoHref") || !leadFormSource.includes("client_request_failed")) {
  errors.push("components/marketing/LeadCaptureForm.tsx must preserve a client-side mailto fallback when lead API submission fails")
}
for (const requiredLeadFormGuard of [
  "containsProviderSecretLikeContent",
  "@/lib/integration-review-intake",
  "Share interest",
]) {
  if (!leadFormSource.includes(requiredLeadFormGuard)) {
    errors.push(`components/marketing/LeadCaptureForm.tsx must preserve roadmap-interest intake guard phrase: ${requiredLeadFormGuard}`)
  }
}

const demoRouteSource = readText("app/api/demo-session/route.ts")
for (const requiredDemoGuard of [
  "BOOKEDONCALL_DEMO_VOICE_ENABLED",
  "VAPI_WEB_PUBLIC_KEY",
  "VAPI_DEMO_ASSISTANT_ID",
  "VAPI_DEMO_MONTHLY_BUDGET_USD",
  "BOOKEDONCALL_DEMO_MAX_CALL_SECONDS",
  "BOOKEDONCALL_DEMO_MAX_STARTS_PER_HOUR",
  "maxDemoCallSeconds",
  "isAllowedDemoOrigin",
  "isRateLimited",
]) {
  if (!demoRouteSource.includes(requiredDemoGuard)) {
    errors.push(`app/api/demo-session/route.ts must preserve live demo session guard phrase: ${requiredDemoGuard}`)
  }
}
const requiredDemoProfileIds = [
  "summit-air-hvac",
  "oakline-plumbing",
  "brightline-electric",
  "truecoat-painting",
  "grainline-flooring",
  "greenridge-landscaping",
  "ridgecap-roofing",
  "fixwell-home-services",
]
for (const profileId of requiredDemoProfileIds) {
  if (!demoRouteSource.includes(profileId)) {
    errors.push(`app/api/demo-session/route.ts must allow demo profile: ${profileId}`)
  }
}

const vapiDemoSource = readText("components/marketing/VapiDemoCallPreview.tsx")
for (const requiredVapiDemoGuard of [
  "@vapi-ai/web",
  "/api/demo-session",
  "public_website_demo_no_real_actions",
  "No real appointments, calendar changes, customer texts, or customer records",
  "demo_voice_call_started",
]) {
  if (!vapiDemoSource.includes(requiredVapiDemoGuard)) {
    errors.push(`components/marketing/VapiDemoCallPreview.tsx must preserve live demo guard phrase: ${requiredVapiDemoGuard}`)
  }
}
for (const profileId of requiredDemoProfileIds) {
  if (!vapiDemoSource.includes(profileId)) {
    errors.push(`components/marketing/VapiDemoCallPreview.tsx must render demo profile: ${profileId}`)
  }
}

const integrationReviewIntakeSource = readText("lib/integration-review-intake.ts")
for (const requiredSharedGuard of [
  "providerSecretLikePatterns",
  "containsProviderSecretLikeContent",
  "Share Housecall Pro interest",
  "Share ServiceTitan interest",
  "roadmap interest, not a live integration request",
  "Do not paste provider credentials",
  "Do not paste API keys, webhook secrets, or credentials",
  "Do not paste tenant IDs, client secrets, app keys, booking-provider tags, or credentials"
]) {
  if (!integrationReviewIntakeSource.includes(requiredSharedGuard)) {
    errors.push(`lib/integration-review-intake.ts must preserve roadmap-interest intake guard phrase: ${requiredSharedGuard}`)
  }
}

const siteConfigSource = readText("config/site.ts")
for (const requiredIntegrationGuard of [
  "getIntegrationBadgeLabel",
  "getIntegrationActionLabel",
  "getIntegrationTextLinkLabel",
  "Ready during setup",
  "Planned",
  "See current status",
  "See the planned ${integration.name} workflow"
]) {
  if (!siteConfigSource.includes(requiredIntegrationGuard)) {
    errors.push(`config/site.ts must preserve roadmap integration guard phrase: ${requiredIntegrationGuard}`)
  }
}

for (const { path: relativePath, required } of [
  {
    path: "app/page.tsx",
    required: ["getIntegrationBadgeLabel(integration)", "getIntegrationActionLabel(integration)"]
  },
  {
    path: "app/integrations/page.tsx",
    required: ["Ready during setup", "Roadmap", "roadmapIntegrations", "getIntegrationBadgeLabel(integration)", "getIntegrationActionLabel(integration)"]
  },
  {
    path: "app/product/page.tsx",
    required: ["getIntegrationBadgeLabel(integration)"]
  },
  {
    path: "app/features/page.tsx",
    required: ["getIntegrationTextLinkLabel(integration)"]
  }
]) {
  const source = readText(relativePath)
  for (const requiredPhrase of required) {
    if (!source.includes(requiredPhrase)) {
      errors.push(`${relativePath} must use shared roadmap integration labeling: ${requiredPhrase}`)
    }
  }
}

const pricingSource = readText("app/pricing/page.tsx")
if (/No contracts/i.test(pricingSource)) {
  errors.push("app/pricing/page.tsx must not make absolute no-contract claims that can conflict with custom commercial terms")
}

const termsSource = readText("app/terms/page.tsx")
const normalizedTermsSource = normalizeInlineText(termsSource)
for (const forbiddenLegalTransferPattern of [/transfer callers/i, /transfer destinations/i]) {
  if (forbiddenLegalTransferPattern.test(termsSource)) {
    errors.push(`app/terms/page.tsx must not imply live transfer behavior: ${forbiddenLegalTransferPattern}`)
  }
}
for (const requiredTermsPhrase of [
  "route callers to a configured next step",
  "You remain responsible for reviewing call summaries",
  "The Service is not a 911 service"
]) {
  if (!normalizedTermsSource.includes(requiredTermsPhrase)) {
    errors.push(`app/terms/page.tsx must preserve customer-facing call-handling legal phrase: ${requiredTermsPhrase}`)
  }
}

const privacySource = readText("app/privacy/page.tsx")
const normalizedPrivacySource = normalizeInlineText(privacySource)
if (/transfer destinations/i.test(privacySource)) {
  errors.push("app/privacy/page.tsx must describe customer-facing routing behavior instead of transfer destinations")
}
for (const requiredPrivacyPhrase of [
  "route next steps",
  "Customers remain responsible for notices, consent",
  "caller information may be processed"
]) {
  if (!normalizedPrivacySource.includes(requiredPrivacyPhrase)) {
    errors.push(`app/privacy/page.tsx must preserve customer-facing call-handling privacy phrase: ${requiredPrivacyPhrase}`)
  }
}

const quickBooksSource = readText("app/integrations/quickbooks/page.tsx")
if (/buildServiceSchema/i.test(quickBooksSource)) {
  errors.push("app/integrations/quickbooks/page.tsx must not emit Service schema for a planned integration")
}
for (const forbiddenCustomerFacingIntegrationPhrase of [
  /launch-safe path/i,
  /launch integration/i,
  /launch integrations/i,
  /launch claim/i,
  /provider proof/i,
  /provider-backed test evidence/i,
  /provider-backed testing/i,
  /provider write path/i,
  /pilot workflow review/i,
  /compatibility review/i,
  /assisted integration review/i,
  /guided .* review/i,
  /request compatibility review/i,
  /tenant-admin gated/i,
  /evaluation bucket/i,
  /partner-gated bucket/i,
]) {
  for (const relativePath of [
    "app/integrations/quickbooks/page.tsx",
    "app/integrations/housecall-pro/page.tsx",
    "app/integrations/servicetitan/page.tsx",
    "config/marketing.ts",
  ]) {
    if (forbiddenCustomerFacingIntegrationPhrase.test(readText(relativePath))) {
      errors.push(`${relativePath} must use buyer-facing roadmap wording instead of internal proof/release phrase: ${forbiddenCustomerFacingIntegrationPhrase}`)
    }
  }
}
const roadmapRoutes = [
  {
    path: "app/integrations/housecall-pro/page.tsx",
    required: [
      "Roadmap",
      "Planned",
      "Share Housecall Pro interest",
      "not available in BookedOnCall today",
      "Do not paste API keys, webhook secrets, or Housecall Pro credentials"
    ],
    forbidden: [/Connect Housecall Pro/i, /Housecall Pro is available/i, /Housecall Pro is supported/i, /compatibility review/i, /Request Housecall Pro review/i]
  },
  {
    path: "app/integrations/servicetitan/page.tsx",
    required: [
      "Roadmap",
      "Planned",
      "Share ServiceTitan interest",
      "not available in BookedOnCall today",
      "Do not paste tenant IDs, client secrets, app keys, booking-provider tags, or credentials"
    ],
    forbidden: [/Connect ServiceTitan/i, /ServiceTitan is available/i, /ServiceTitan is supported/i, /compatibility review/i, /Request ServiceTitan review/i]
  },
]

for (const { path: relativePath, required, forbidden } of roadmapRoutes) {
  const source = readText(relativePath)
  if (/buildServiceSchema/i.test(source)) {
    errors.push(`${relativePath} must not emit Service schema for a planned integration`)
  }
  for (const requiredPhrase of required) {
    if (!source.includes(requiredPhrase)) {
      errors.push(`${relativePath} must include roadmap proof-boundary phrase: ${requiredPhrase}`)
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

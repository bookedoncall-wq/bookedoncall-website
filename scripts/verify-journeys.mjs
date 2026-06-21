#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { assertBuildRoutes, getFreePort, requestText, startNextServer, waitForServer } from "./lib/next-production-verifier.mjs"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const contract = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "public-site-contract.json"), "utf8"))
const siteOrigin = new URL(contract.brand.websiteOrigin).origin
const appOrigin = new URL(contract.brand.appOrigin).origin

const requiredBuildRoutes = [
  "/page",
  "/sitemap.xml/route",
  "/demo-calls/page",
  "/integrations/email/page",
  "/sign-up/page",
]

const criticalRouteExpectations = {
  "/": ["BookedOnCall", "Start setup", "Try demo calls"],
  "/product": ["answers inbound calls", "callback", "booking"],
  "/pricing": ["Starter", "Pro", "included minutes"],
  "/login": ["Go to customer login", `${appOrigin}/sign-in`],
  "/sign-up": ["Request setup", "setup review call"],
  "/demo-calls": ["Demo calls", "Sample shop demo", "setup review call", "Start setup"],
  "/examples": ["After basic setup", "Booking request pending owner confirmation", "Urgent owner alert", "Owner summary"],
  "/integrations": ["Jobber", "Google Calendar", "Email summaries", "QuickBooks", "Housecall Pro", "ServiceTitan"],
  "/integrations/jobber": ["Jobber", "connected"],
  "/integrations/google-calendar": ["Google Calendar", "connected"],
  "/integrations/email": ["Email summaries", "call summaries", "inbox"],
  "/integrations/text-sms": ["Text", "supported follow-up"],
  "/integrations/quickbooks": ["Planned", "not live in BookedOnCall today", "QuickBooks"],
  "/integrations/housecall-pro": ["Planned", "not available in BookedOnCall today", "Share Housecall Pro interest"],
  "/integrations/servicetitan": ["Planned", "not available in BookedOnCall today", "Share ServiceTitan interest"],
  "/contact": ["Product questions", contract.contacts.salesEmail],
}

const bannedPublicPhrases = [
  /NO_GO/i,
  /SYNTHETIC_PASS/i,
  /public-readiness/i,
  /manual gate/i,
  /repo proof/i,
  /live proof/i,
  /current-head/i,
  /dirty worktree/i,
  /release blocker/i,
  /stale command evidence/i,
  /Safe demo path/i,
  /browser call preview/i,
  /Configured workflow\*/i,
  /Roadmap only\*/i,
  /when it is connected/i,
  /connected in this environment/i,
  /not connected in this environment/i,
  /not connected here/i,
  /this environment yet/i,
  /self-serve checkout is enabled/i,
  /Auth proof/i,
  /Proof-only route/i,
  /Session proof/i,
  /not proof of a live/i,
  /\b(?:Vapi|Retell|Telnyx|Twilio|Deepgram|ElevenLabs)\b/i,
  /\bDaily(?:\.co)?\b/i,
]

function parseArgs(argv) {
  const options = {
    jsonOut: "",
  }
  for (const arg of argv) {
    if (arg === "--") continue
    if (arg.startsWith("--json-out=")) {
      options.jsonOut = arg.slice("--json-out=".length)
      continue
    }
    throw new Error(`Unknown option: ${arg}`)
  }
  return options
}

function assertBuildArtifacts() {
  assertBuildRoutes(repoRoot, requiredBuildRoutes, "verify:journeys")
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

function parseSitemapLocations(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/gi)).map((match) => decodeHtml(match[1]).trim())
}

function routeFromUrl(value) {
  const url = new URL(value)
  const pathname = url.pathname.replace(/\/+$/, "")
  return pathname || "/"
}

function extractAnchors(html) {
  return Array.from(html.matchAll(/<a\b[^>]*\bhref\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi))
    .map((match) => decodeHtml(match[2] ?? match[3] ?? match[4] ?? ""))
    .filter(Boolean)
}

function toLocalTarget(href, baseUrl, sourceRoute) {
  if (href.startsWith("#")) return null
  if (/^(mailto|tel):/i.test(href)) return null
  if (/^(javascript|data):/i.test(href)) {
    return { ok: false, reason: `unsafe href scheme on ${sourceRoute}: ${href}` }
  }

  let parsed
  try {
    parsed = new URL(href, siteOrigin)
  } catch {
    return { ok: false, reason: `invalid href on ${sourceRoute}: ${href}` }
  }

  if (parsed.origin === appOrigin) {
    const allowedAppPaths = new Set(["/sign-in", "/start"])
    if (!allowedAppPaths.has(parsed.pathname)) {
      return { ok: false, reason: `unexpected app handoff path on ${sourceRoute}: ${parsed.toString()}` }
    }
    return null
  }

  if (parsed.origin !== siteOrigin) return null

  const localUrl = new URL(`${parsed.pathname}${parsed.search}`, baseUrl)
  return { ok: true, url: localUrl.toString(), path: `${parsed.pathname}${parsed.search}` }
}

function hasLeadFormPath(html) {
  return html.includes("id=\"lead-form\"") || html.includes("Loading form...")
}

function assertRouteCopy(errors, route, body) {
  for (const pattern of bannedPublicPhrases) {
    if (pattern.test(body)) {
      errors.push(`${route} contains internal readiness/proof language: ${pattern}`)
    }
  }

  const snippets = criticalRouteExpectations[route] || []
  for (const snippet of snippets) {
    if (!body.includes(snippet)) {
      errors.push(`${route} did not include required journey snippet: ${snippet}`)
    }
  }

  if (route === "/sign-up" && !hasLeadFormPath(body)) {
    errors.push("/sign-up did not render the lead form or loading fallback")
  }
}

function assertIntegrationClaimBoundaries(errors, route, body) {
  if (route === "/integrations/quickbooks" && /connect quickbooks|quickbooks is available|quickbooks is supported/i.test(body)) {
    errors.push("/integrations/quickbooks may imply planned QuickBooks support is currently available")
  }
  if (
    route === "/integrations/housecall-pro" &&
    /provider-backed|provider proof|provider write path|evaluation bucket|compatibility review|request housecall pro review|connect housecall pro|housecall pro is available|housecall pro is supported/i.test(
      body
    )
  ) {
    errors.push("/integrations/housecall-pro contains internal posture language or implies Housecall Pro is currently self-serve or live")
  }
  if (
    route === "/integrations/servicetitan" &&
    /provider-backed|provider proof|provider write path|partner-gated|tenant-admin gated|compatibility review|request servicetitan review|connect servicetitan|servicetitan is available|servicetitan is supported/i.test(
      body
    )
  ) {
    errors.push("/integrations/servicetitan contains internal posture language or implies ServiceTitan is currently self-serve or live")
  }
}

function writeJson(relativePath, report) {
  const outPath = path.resolve(repoRoot, relativePath)
  const relative = path.relative(repoRoot, outPath)
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`json output must stay inside the website repo: ${relativePath}`)
  }
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`)
}

async function runJourneyChecks(baseUrl) {
  const errors = []
  const visitedRoutes = []
  const checkedLinks = new Map()
  const sitemapResponse = await requestText(`${baseUrl}/sitemap.xml`)
  if (sitemapResponse.status !== 200) {
    errors.push(`/sitemap.xml returned ${sitemapResponse.status}`)
    return { errors, visitedRoutes, checkedLinks: [] }
  }

  const sitemapLocations = parseSitemapLocations(sitemapResponse.body)
  const routes = sitemapLocations.map(routeFromUrl)
  for (const requiredRoute of Object.keys(criticalRouteExpectations)) {
    if (!routes.includes(requiredRoute)) {
      errors.push(`sitemap is missing critical journey route: ${requiredRoute}`)
    }
  }

  for (const route of routes) {
    const response = await requestText(`${baseUrl}${route}`)
    visitedRoutes.push({ route, status: response.status })
    if (response.status !== 200) {
      errors.push(`${route} returned ${response.status}; expected 200`)
      continue
    }

    assertRouteCopy(errors, route, response.body)
    assertIntegrationClaimBoundaries(errors, route, response.body)

    for (const href of extractAnchors(response.body)) {
      const target = toLocalTarget(href, baseUrl, route)
      if (!target) continue
      if (!target.ok) {
        errors.push(target.reason)
        continue
      }
      if (!checkedLinks.has(target.url)) {
        checkedLinks.set(target.url, { path: target.path, sources: new Set([route]), status: null })
      } else {
        checkedLinks.get(target.url).sources.add(route)
      }
    }
  }

  for (const [url, target] of checkedLinks) {
    const response = await requestText(url)
    target.status = response.status
    if (response.status >= 400 || response.status < 200) {
      errors.push(`linked route ${target.path} returned ${response.status}; sources: ${[...target.sources].join(", ")}`)
    }
  }

  return {
    errors,
    visitedRoutes,
    checkedLinks: [...checkedLinks.values()].map((target) => ({
      path: target.path,
      sources: [...target.sources].sort(),
      status: target.status,
    })),
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  assertBuildArtifacts()

  const port = process.env.BOOKEDONCALL_VERIFY_JOURNEYS_PORT || (await getFreePort())
  const baseUrl = `http://127.0.0.1:${port}`
  const { child, logs } = startNextServer(repoRoot, port, {
    BOOKEDONCALL_LEAD_NOTIFY_TO: "",
    RESEND_API_KEY: "",
    RESEND_FROM_EMAIL: "",
    RESEND_REPLY_TO_EMAIL: "",
  })

  try {
    await waitForServer(baseUrl, child, logs)
    const result = await runJourneyChecks(baseUrl)
    const report = {
      schemaVersion: "bookedoncall_marketing_journey_evidence_v1",
      generatedAt: new Date().toISOString(),
      proofBoundary: "Local production-mode website journey evidence only. This is not deployed website proof, provider delivery proof, live handset proof, launch readiness, or manual-gate approval.",
      baseUrl,
      siteOrigin,
      appOrigin,
      routeCount: result.visitedRoutes.length,
      checkedLinkCount: result.checkedLinks.length,
      visitedRoutes: result.visitedRoutes,
      checkedLinks: result.checkedLinks,
      errors: result.errors,
    }

    if (options.jsonOut) writeJson(options.jsonOut, report)
    if (result.errors.length > 0) {
      throw new Error(result.errors.map((error) => `- ${error}`).join("\n"))
    }

    console.log(`verify:journeys passed (${report.routeCount} sitemap routes, ${report.checkedLinkCount} internal links checked)`)
    if (options.jsonOut) console.log(`json=${options.jsonOut}`)
    console.log(`proof_boundary=${report.proofBoundary}`)
  } finally {
    child.kill("SIGTERM")
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})

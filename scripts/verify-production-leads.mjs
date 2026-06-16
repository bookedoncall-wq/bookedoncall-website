#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const contract = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "public-site-contract.json"), "utf8"))
const defaultOrigin = new URL(contract.brand.websiteOrigin).origin
const requestTimeoutMs = 10_000

function parseArgs(argv) {
  const options = {
    origin: defaultOrigin,
    executeSend: false,
    json: false,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    const readValue = () => {
      const value = argv[index + 1]
      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for ${arg}`)
      }
      index += 1
      return value
    }

    if (arg === "--origin") {
      options.origin = new URL(readValue()).origin
    } else if (arg === "--execute-send") {
      options.executeSend = true
    } else if (arg === "--json") {
      options.json = true
    } else if (arg === "--help" || arg === "-h") {
      options.help = true
    } else if (arg === "--") {
      continue
    } else {
      throw new Error(`Unknown option: ${arg}`)
    }
  }

  return options
}

function usage() {
  return `Usage:
  node scripts/verify-production-leads.mjs [--origin https://www.bookedoncall.com] [--execute-send] [--json]

Checks the live lead-capture API with synthetic data only.

Options:
  --origin <url>     Production or preview origin. Default: ${defaultOrigin}
  --execute-send     Submit one synthetic safe lead. This may send a Resend email if production delivery is configured.
  --json             Print machine-readable output.
`
}

async function postLead(origin, payload) {
  const response = await fetch(`${origin}/api/leads`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "bookedoncall-production-lead-verifier/1.0",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(requestTimeoutMs),
  })
  const bodyText = await response.text()
  let body = {}
  try {
    body = bodyText ? JSON.parse(bodyText) : {}
  } catch {
    body = { parseError: true, bodyText: bodyText.slice(0, 240) }
  }
  return {
    status: response.status,
    ok: response.ok,
    body,
  }
}

function assertNoEchoedSyntheticSecrets(report) {
  const serialized = JSON.stringify(report)
  const forbidden = [
    "abcdefghijklmnop",
    "client_secret: abcdefghijklmnopqrstuvwxyz",
    "lead-smoke@example.com",
    "555-0100",
  ]
  return forbidden.filter((value) => serialized.includes(value))
}

function buildSafeLead() {
  return {
    name: "BookedOnCall Production Smoke",
    businessName: "Synthetic HVAC Lead Smoke",
    trade: "HVAC",
    phone: "555-0100",
    email: "lead-smoke@example.com",
    planInterest: "starter",
    source: "production-lead-capture-smoke",
    details: "Synthetic production lead smoke submitted by the website verifier. No customer data. Please ignore if delivered.",
  }
}

function buildSecretGuardLead() {
  return {
    name: "BookedOnCall Secret Guard Smoke",
    businessName: "Synthetic HVAC Lead Smoke",
    trade: "HVAC",
    phone: "555-0100",
    email: "lead-smoke@example.com",
    planInterest: "starter",
    source: "servicetitan-roadmap-interest",
    details: "client_secret: abcdefghijklmnopqrstuvwxyz",
  }
}

function summarizeSafeLead(result, executeSend) {
  if (!executeSend) {
    return {
      status: "skipped",
      reason: "safe lead send requires --execute-send",
    }
  }

  const delivery = typeof result.body?.delivery === "string" ? result.body.delivery : "unknown"
  const pass = result.status === 200 && result.body?.ok === true && ["resend", "mailto"].includes(delivery)
  return {
    status: pass ? "pass" : "fail",
    httpStatus: result.status,
    delivery,
    routeAccepted: result.body?.ok === true,
    resendAccepted: delivery === "resend",
    mailtoFallbackReturned: delivery === "mailto",
  }
}

function summarizeSecretGuard(result) {
  const message = result.body?.errors?.details || result.body?.message || ""
  const pass = result.status === 400
    && result.body?.ok === false
    && String(message).includes("Do not paste provider credentials")
  return {
    status: pass ? "pass" : "fail",
    httpStatus: result.status,
    rejected: result.body?.ok === false,
    providerCredentialWarningReturned: String(message).includes("Do not paste provider credentials"),
  }
}

async function buildReport(options) {
  const report = {
    schemaVersion: "bookedoncall_website_production_lead_verification_v1",
    generatedAt: new Date().toISOString(),
    origin: options.origin,
    proofLevel: options.executeSend
      ? "production website route proof plus lead-provider acceptance when delivery=resend"
      : "production website secret-guard proof only",
    proofBoundary:
      "Synthetic website lead verification only. This does not prove checkout, app onboarding, customer-data readiness, phone go-live, live voice, sales follow-up, inbox delivery, revenue readiness, public testing readiness, or launch readiness.",
    executeSend: options.executeSend,
    safeLead: null,
    secretGuard: null,
    pass: false,
    blockedChecks: [],
  }

  if (options.executeSend) {
    report.safeLead = summarizeSafeLead(await postLead(options.origin, buildSafeLead()), true)
  } else {
    report.safeLead = summarizeSafeLead(null, false)
    report.blockedChecks.push("safe_lead_send_skipped_without_execute_send")
  }

  report.secretGuard = summarizeSecretGuard(await postLead(options.origin, buildSecretGuardLead()))

  if (options.executeSend && report.safeLead.status !== "pass") {
    report.blockedChecks.push("synthetic_safe_lead_not_accepted")
  }
  if (report.secretGuard.status !== "pass") {
    report.blockedChecks.push("provider_secret_payload_not_rejected")
  }

  const echoedForbiddenValues = assertNoEchoedSyntheticSecrets(report)
  if (echoedForbiddenValues.length > 0) {
    report.blockedChecks.push("verifier_output_contains_raw_synthetic_contact_or_secret_shape")
  }

  report.pass = report.blockedChecks.length === 0 || (
    !options.executeSend
    && report.blockedChecks.length === 1
    && report.blockedChecks[0] === "safe_lead_send_skipped_without_execute_send"
    && report.secretGuard.status === "pass"
  )

  return report
}

function renderMarkdown(report) {
  return [
    "Production lead verification",
    `- Origin: ${report.origin}`,
    `- Safe lead send executed: ${report.executeSend ? "yes" : "no"}`,
    `- Safe lead status: ${report.safeLead?.status ?? "unknown"}`,
    `- Safe lead delivery: ${report.safeLead?.delivery ?? "n/a"}`,
    `- Resend accepted: ${report.safeLead?.resendAccepted ? "yes" : "no"}`,
    `- Mailto fallback returned: ${report.safeLead?.mailtoFallbackReturned ? "yes" : "no"}`,
    `- Secret guard status: ${report.secretGuard?.status ?? "unknown"}`,
    `- Provider credential warning returned: ${report.secretGuard?.providerCredentialWarningReturned ? "yes" : "no"}`,
    `- Pass: ${report.pass ? "yes" : "no"}`,
    `- Blocked checks: ${report.blockedChecks.length ? report.blockedChecks.join(", ") : "none"}`,
    `- Proof boundary: ${report.proofBoundary}`,
  ].join("\n")
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    console.log(usage())
    return
  }

  const report = await buildReport(options)
  if (options.json) {
    console.log(JSON.stringify(report, null, 2))
  } else {
    console.log(renderMarkdown(report))
  }

  if (!report.pass || (options.executeSend && report.safeLead?.status !== "pass")) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})

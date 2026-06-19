#!/usr/bin/env node

import path from "node:path"
import { fileURLToPath } from "node:url"
import { assertBuildRoutes, getFreePort, requestText, startNextServer, waitForServer } from "./lib/next-production-verifier.mjs"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const requiredBuildRoutes = [
  "/page",
  "/sign-up/page",
  "/auth-proof/session/page",
  "/api/leads/route",
  "/api/demo-session/route",
]

function assertBuildArtifacts() {
  assertBuildRoutes(repoRoot, requiredBuildRoutes, "verify:runtime")
}

function assertResponse(errors, label, response, expectedStatus, expectedBodySnippets = []) {
  if (response.status !== expectedStatus) {
    errors.push(`${label} returned ${response.status}; expected ${expectedStatus}. Body: ${response.body.slice(0, 240)}`)
    return
  }

  for (const snippet of expectedBodySnippets) {
    if (!response.body.includes(snippet)) {
      errors.push(`${label} did not include expected snippet: ${snippet}`)
    }
  }
}

async function postJson(baseUrl, payload) {
  return requestText(`${baseUrl}/api/leads`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}

async function postDemoSession(baseUrl, payload) {
  return requestText(`${baseUrl}/api/demo-session`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}

async function runRuntimeChecks(baseUrl) {
  const errors = []

  assertResponse(errors, "GET /", await requestText(`${baseUrl}/`), 200, ["BookedOnCall"])
  assertResponse(
    errors,
    "GET /sign-up roadmap interest",
    await requestText(`${baseUrl}/sign-up?plan=starter&source=housecall-pro-roadmap-interest`),
    200,
    ["Request setup", "Loading form..."]
  )
  assertResponse(
    errors,
    "GET /auth-proof/session inactive by default",
    await requestText(`${baseUrl}/auth-proof/session`),
    200,
    ["Customer app access check unavailable", "does not show customer records"]
  )
  assertResponse(
    errors,
    "GET /api/demo-session disabled by default",
    await requestText(`${baseUrl}/api/demo-session`),
    200,
    ["\"ok\":true", "\"configured\":false", "\"maxCallSeconds\":180"]
  )
  assertResponse(
    errors,
    "POST /api/demo-session disabled by default",
    await postDemoSession(baseUrl, { scenarioId: "summit-air-hvac" }),
    503,
    ["\"ok\":false", "live web demo is temporarily unavailable"]
  )

  const safeLead = await postJson(baseUrl, {
    name: "Runtime Test Owner",
    businessName: "Runtime Test HVAC",
    trade: "HVAC",
    phone: "555-0100",
    email: "runtime@example.com",
    planInterest: "starter",
    source: "housecall-pro-roadmap-interest",
    details: "Housecall Pro callback handoff would matter most.",
  })
  assertResponse(errors, "POST /api/leads safe roadmap-interest lead", safeLead, 200, [
    "\"ok\":true",
    "\"delivery\":\"mailto\"",
    "Housecall%20Pro%20roadmap%20interest",
    "Credential%20note",
  ])

  const secretLead = await postJson(baseUrl, {
    name: "Runtime Test Owner",
    businessName: "Runtime Test HVAC",
    trade: "HVAC",
    phone: "555-0100",
    email: "runtime@example.com",
    planInterest: "starter",
    source: "servicetitan-roadmap-interest",
    details: "client_secret: abcdefghijklmnopqrstuvwxyz",
  })
  assertResponse(errors, "POST /api/leads provider-secret payload", secretLead, 400, [
    "\"ok\":false",
    "Do not paste provider credentials",
  ])

  return errors
}

async function main() {
  assertBuildArtifacts()

  const port = process.env.BOOKEDONCALL_VERIFY_RUNTIME_PORT || (await getFreePort())
  const baseUrl = `http://127.0.0.1:${port}`
  const { child, logs } = startNextServer(repoRoot, port, {
    BOOKEDONCALL_DEMO_VOICE_ENABLED: "false",
    VAPI_WEB_PUBLIC_KEY: "",
    VAPI_DEMO_ASSISTANT_ID: "",
    BOOKEDONCALL_LEAD_NOTIFY_TO: "",
    RESEND_API_KEY: "",
    RESEND_FROM_EMAIL: "",
    RESEND_REPLY_TO_EMAIL: "",
  })

  try {
    await waitForServer(baseUrl, child, logs)
    const errors = await runRuntimeChecks(baseUrl)
    if (errors.length > 0) {
      throw new Error(errors.join("\n"))
    }
    console.log(`Website runtime verification passed at ${baseUrl}`)
  } finally {
    child.kill("SIGTERM")
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})

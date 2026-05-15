#!/usr/bin/env node

import path from "node:path"
import { fileURLToPath } from "node:url"
import { assertBuildRoutes, getFreePort, requestText, startNextServer, waitForServer } from "./lib/next-production-verifier.mjs"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const requiredBuildRoutes = [
  "/page",
  "/sign-up/page",
  "/api/leads/route",
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

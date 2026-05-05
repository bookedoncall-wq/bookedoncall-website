#!/usr/bin/env node

import { spawn } from "node:child_process"
import fs from "node:fs"
import http from "node:http"
import net from "node:net"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const startupTimeoutMs = 30_000
const requestTimeoutMs = 8_000

const requiredBuildArtifacts = [
  ".next/server/app/page.js",
  ".next/server/app/sign-up/page.js",
  ".next/server/app/api/leads/route.js",
]

function addLogLine(logs, chunk) {
  const value = String(chunk || "").trim()
  if (!value) return
  logs.push(value)
  while (logs.length > 80) {
    logs.shift()
  }
}

function assertBuildArtifacts() {
  const missing = requiredBuildArtifacts.filter((relativePath) => !fs.existsSync(path.join(repoRoot, relativePath)))
  if (missing.length > 0) {
    throw new Error(`Missing production build artifacts: ${missing.join(", ")}. Run npm run build before npm run verify:runtime.`)
  }
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.once("error", reject)
    server.listen(0, "127.0.0.1", () => {
      const address = server.address()
      const port = typeof address === "object" && address ? address.port : null
      server.close(() => {
        if (port) {
          resolve(port)
        } else {
          reject(new Error("Unable to reserve a local runtime verification port."))
        }
      })
    })
  })
}

function requestText(url, options = {}) {
  return new Promise((resolve, reject) => {
    const request = http.request(url, options, (response) => {
      const chunks = []
      response.on("data", (chunk) => chunks.push(chunk))
      response.on("end", () => {
        resolve({
          status: response.statusCode || 0,
          headers: response.headers,
          body: Buffer.concat(chunks).toString("utf8"),
        })
      })
    })

    request.setTimeout(requestTimeoutMs, () => {
      request.destroy(new Error(`Request timed out after ${requestTimeoutMs}ms: ${url}`))
    })
    request.on("error", reject)

    if (options.body) {
      request.write(options.body)
    }
    request.end()
  })
}

async function waitForServer(baseUrl, child, logs) {
  const startedAt = Date.now()
  let lastError = null

  while (Date.now() - startedAt < startupTimeoutMs) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited before serving requests with code ${child.exitCode}. Logs:\n${logs.join("\n")}`)
    }

    try {
      await requestText(`${baseUrl}/`)
      return
    } catch (error) {
      lastError = error
      await new Promise((resolve) => setTimeout(resolve, 400))
    }
  }

  throw new Error(`Timed out waiting for next start. Last error: ${lastError?.message || "unknown"}. Logs:\n${logs.join("\n")}`)
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
    "GET /sign-up assisted review",
    await requestText(`${baseUrl}/sign-up?plan=starter&source=housecall-pro-integration-review`),
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
    source: "housecall-pro-integration-review",
    details: "Housecall Pro MAX admin can review callback handoff.",
  })
  assertResponse(errors, "POST /api/leads safe assisted-review lead", safeLead, 200, [
    "\"ok\":true",
    "\"delivery\":\"mailto\"",
    "Housecall%20Pro%20review%20lead",
    "Provider%20credential%20policy",
  ])

  const secretLead = await postJson(baseUrl, {
    name: "Runtime Test Owner",
    businessName: "Runtime Test HVAC",
    trade: "HVAC",
    phone: "555-0100",
    email: "runtime@example.com",
    planInterest: "starter",
    source: "servicetitan-integration-review",
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
  const nextBin = path.join(repoRoot, "node_modules", "next", "dist", "bin", "next")
  const logs = []

  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: repoRoot,
    env: {
      ...process.env,
      BOOKEDONCALL_LEAD_NOTIFY_TO: "",
      RESEND_API_KEY: "",
      RESEND_FROM_EMAIL: "",
      RESEND_REPLY_TO_EMAIL: "",
    },
    stdio: ["ignore", "pipe", "pipe"],
  })

  child.stdout.on("data", (chunk) => addLogLine(logs, chunk))
  child.stderr.on("data", (chunk) => addLogLine(logs, chunk))

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

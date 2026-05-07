import { spawn } from "node:child_process"
import fs from "node:fs"
import http from "node:http"
import net from "node:net"
import path from "node:path"

export const startupTimeoutMs = 30_000
export const requestTimeoutMs = 8_000

export function addLogLine(logs, chunk) {
  const value = String(chunk || "").trim()
  if (!value) return
  logs.push(value)
  while (logs.length > 80) logs.shift()
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

export function assertBuildRoutes(repoRoot, routeKeys, verifierLabel) {
  const missingFiles = [
    ".next/BUILD_ID",
    ".next/server/app-paths-manifest.json",
    ".next/app-path-routes-manifest.json",
  ].filter((relativePath) => !fs.existsSync(path.join(repoRoot, relativePath)))

  if (missingFiles.length > 0) {
    throw new Error(`Missing production build markers for ${verifierLabel}: ${missingFiles.join(", ")}. Run npm run build first.`)
  }

  const appPathsManifest = readJson(path.join(repoRoot, ".next", "server", "app-paths-manifest.json"))
  const routeManifest = readJson(path.join(repoRoot, ".next", "app-path-routes-manifest.json"))
  const missingRoutes = routeKeys.filter((routeKey) => !appPathsManifest[routeKey] || !routeManifest[routeKey])

  if (missingRoutes.length > 0) {
    throw new Error(`Missing built App Router entries for ${verifierLabel}: ${missingRoutes.join(", ")}. Run npm run build first.`)
  }
}

export function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.once("error", reject)
    server.listen(0, "127.0.0.1", () => {
      const address = server.address()
      const port = typeof address === "object" && address ? address.port : null
      server.close(() => {
        if (port) resolve(port)
        else reject(new Error("Unable to reserve a local verification port."))
      })
    })
  })
}

export function requestText(url, options = {}) {
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

export async function waitForServer(baseUrl, child, logs) {
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

export function startNextServer(repoRoot, port, envOverrides = {}) {
  const nextBin = path.join(repoRoot, "node_modules", "next", "dist", "bin", "next")
  const logs = []
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: repoRoot,
    env: {
      ...process.env,
      ...envOverrides,
    },
    stdio: ["ignore", "pipe", "pipe"],
  })

  child.stdout.on("data", (chunk) => addLogLine(logs, chunk))
  child.stderr.on("data", (chunk) => addLogLine(logs, chunk))

  return { child, logs }
}

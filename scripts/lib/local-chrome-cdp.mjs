import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import { readFile, rm } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

const chromeCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
]

export function resolveLocalChromeExecutable(explicitPath) {
  const candidates = explicitPath ? [explicitPath] : chromeCandidates
  return candidates.find((candidate) => existsSync(candidate)) ?? null
}

export async function launchLocalChromeCdp({
  chromePath,
  headless = true,
  startupTimeoutMs = 60_000,
  userDataDir,
} = {}) {
  const resolvedChromePath = resolveLocalChromeExecutable(chromePath)
  if (!resolvedChromePath) {
    throw new Error("local_chrome_executable_missing")
  }

  const tempUserDataDir = userDataDir ?? path.join(os.tmpdir(), `bookedoncall-website-chrome-${process.pid}-${Date.now()}`)
  const stderrChunks = []
  const child = spawn(resolvedChromePath, chromeArgs({ headless, userDataDir: tempUserDataDir }), {
    stdio: ["ignore", "ignore", "pipe"],
  })

  child.stderr?.on("data", (chunk) => {
    stderrChunks.push(String(chunk).slice(0, 1000))
    while (stderrChunks.length > 20) stderrChunks.shift()
  })

  try {
    const port = await waitForDevToolsPort(tempUserDataDir, child, startupTimeoutMs)
    return {
      child,
      chromePath: resolvedChromePath,
      port,
      userDataDir: tempUserDataDir,
      async newPage() {
        const target = await fetchJson(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })
        if (!target.webSocketDebuggerUrl) {
          throw new Error("chrome_cdp_target_missing_websocket")
        }
        return connectCdpWebSocket(target.webSocketDebuggerUrl)
      },
      async close() {
        await stopProcess(child)
        if (!userDataDir) {
          await rm(tempUserDataDir, { recursive: true, force: true }).catch(() => {})
        }
      },
    }
  } catch (error) {
    await stopProcess(child)
    if (!userDataDir) {
      await rm(tempUserDataDir, { recursive: true, force: true }).catch(() => {})
    }
    const detail = stderrChunks.join("\n").trim().slice(0, 1000)
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(detail ? `${message}: ${detail}` : message)
  }
}

function chromeArgs({ headless, userDataDir }) {
  return [
    ...(headless ? ["--headless=new"] : []),
    "--remote-debugging-port=0",
    "--remote-debugging-address=127.0.0.1",
    `--user-data-dir=${userDataDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-extensions",
    "--disable-sync",
    "--disable-features=Translate",
    "--disable-breakpad",
    "--disable-crash-reporter",
    "--mute-audio",
    ...(process.env.CI === "true" ? ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"] : []),
    "about:blank",
  ]
}

export async function connectCdpWebSocket(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl)
  await waitForSocketOpen(socket)

  let nextId = 1
  const pending = new Map()
  const handlers = new Map()

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(webSocketMessageToString(event.data))
    if (message.id && pending.has(message.id)) {
      const entry = pending.get(message.id)
      pending.delete(message.id)
      clearTimeout(entry.timer)
      if (message.error) {
        entry.reject(new Error(message.error.message ?? "chrome_cdp_error"))
      } else {
        entry.resolve(message.result ?? {})
      }
      return
    }

    const eventHandlers = handlers.get(message.method)
    if (eventHandlers) {
      for (const handler of eventHandlers) handler(message.params ?? {})
    }
  })

  socket.addEventListener("close", () => {
    for (const entry of pending.values()) {
      clearTimeout(entry.timer)
      entry.reject(new Error("chrome_cdp_socket_closed"))
    }
    pending.clear()
  })

  function send(method, params = {}, timeoutMs = 10_000) {
    const id = nextId
    nextId += 1
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        pending.delete(id)
        reject(new Error(`chrome_cdp_timeout:${method}`))
      }, timeoutMs)
      pending.set(id, { resolve, reject, timer })
      socket.send(JSON.stringify({ id, method, params }))
    })
  }

  function on(method, handler) {
    const existing = handlers.get(method) ?? new Set()
    existing.add(handler)
    handlers.set(method, existing)
    return () => existing.delete(handler)
  }

  function waitForEvent(method, timeoutMs = 10_000) {
    return new Promise((resolve, reject) => {
      const off = on(method, (params) => {
        clearTimeout(timer)
        off()
        resolve(params)
      })
      const timer = setTimeout(() => {
        off()
        reject(new Error(`chrome_cdp_event_timeout:${method}`))
      }, timeoutMs)
    })
  }

  async function evaluate(expression, timeoutMs = 10_000) {
    const result = await send(
      "Runtime.evaluate",
      {
        expression,
        awaitPromise: true,
        returnByValue: true,
      },
      timeoutMs
    )
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text ?? "chrome_runtime_exception")
    }
    return result.result?.value
  }

  async function close() {
    await send("Page.close").catch(() => {})
    socket.close()
  }

  return { close, evaluate, on, send, waitForEvent }
}

async function waitForDevToolsPort(userDataDir, child, timeoutMs) {
  const activePortPath = path.join(userDataDir, "DevToolsActivePort")
  const startedAt = Date.now()
  while (Date.now() - startedAt < timeoutMs) {
    if (child.exitCode !== null) {
      throw new Error(`chrome_exited_before_cdp:${child.exitCode}`)
    }
    try {
      const value = await readFile(activePortPath, "utf8")
      const [portText] = value.trim().split(/\r?\n/)
      const port = Number(portText)
      if (Number.isInteger(port) && port > 0 && port < 65536) {
        return port
      }
    } catch {
      // Chrome creates DevToolsActivePort when CDP is ready.
    }
    await delay(100)
  }
  throw new Error("chrome_cdp_startup_timeout")
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`chrome_cdp_http_${response.status}`)
  }
  return response.json()
}

function waitForSocketOpen(socket) {
  return new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true })
    socket.addEventListener("error", () => reject(new Error("chrome_cdp_socket_error")), { once: true })
  })
}

function webSocketMessageToString(data) {
  if (typeof data === "string") return data
  if (data instanceof ArrayBuffer) return Buffer.from(data).toString("utf8")
  return Buffer.from(data).toString("utf8")
}

async function stopProcess(child) {
  if (!child || child.exitCode !== null || child.killed) return
  const exited = new Promise((resolve) => child.once("exit", resolve))
  child.kill("SIGTERM")
  const stopped = await Promise.race([exited.then(() => true), delay(3000).then(() => false)])
  if (!stopped && child.exitCode === null) {
    child.kill("SIGKILL")
    await exited.catch(() => {})
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

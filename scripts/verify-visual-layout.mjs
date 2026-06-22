#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { assertBuildRoutes, getFreePort, startNextServer, waitForServer } from "./lib/next-production-verifier.mjs"
import { launchLocalChromeCdp } from "./lib/local-chrome-cdp.mjs"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const defaultScreenshotDir = "artifacts/screenshots/site-visual-layout"

const defaultRoutes = [
  "/",
  "/product",
  "/demo-calls",
  "/examples",
  "/pricing",
  "/resources",
  "/sign-up",
  "/industries",
  "/for/hvac",
  "/for/plumbers",
  "/integrations",
  "/integrations/google-calendar",
  "/integrations/jobber",
  "/privacy",
  "/terms",
  "/call-handling-notice",
  "/sms-terms",
  "/dpa",
]

const viewports = [
  { name: "desktop", width: 1512, height: 982, deviceScaleFactor: 1, mobile: false },
  { name: "iphone", width: 390, height: 844, deviceScaleFactor: 3, mobile: true },
  { name: "android", width: 412, height: 915, deviceScaleFactor: 2.625, mobile: true },
]

function parseArgs(argv) {
  const options = {
    origin: "",
    jsonOut: "",
    screenshotDir: defaultScreenshotDir,
    noScreenshots: false,
    routes: defaultRoutes,
  }

  for (const arg of argv) {
    if (arg === "--") continue
    if (arg === "--no-screenshots") {
      options.noScreenshots = true
      continue
    }
    if (arg.startsWith("--origin=")) {
      options.origin = arg.slice("--origin=".length).replace(/\/+$/, "")
      continue
    }
    if (arg.startsWith("--json-out=")) {
      options.jsonOut = arg.slice("--json-out=".length)
      continue
    }
    if (arg.startsWith("--screenshot-dir=")) {
      options.screenshotDir = arg.slice("--screenshot-dir=".length)
      continue
    }
    if (arg.startsWith("--routes=")) {
      options.routes = arg
        .slice("--routes=".length)
        .split(",")
        .map((route) => route.trim())
        .filter(Boolean)
      continue
    }
    throw new Error(`Unknown option: ${arg}`)
  }

  return options
}

function routeToBuildKey(route) {
  if (route === "/") return "/page"
  return `${route.replace(/\/+$/, "")}/page`
}

function routeToFileName(route) {
  if (route === "/") return "home"
  return route.replace(/^\/+/, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()
}

function assertBuildArtifacts(routes) {
  assertBuildRoutes(repoRoot, routes.map(routeToBuildKey), "verify:visual-layout")
}

async function configurePage(page, viewport) {
  await page.send("Page.enable")
  await page.send("Runtime.enable")
  await page.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor,
    mobile: viewport.mobile,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  })
}

async function navigate(page, url) {
  const loaded = page.waitForEvent("Page.loadEventFired", 20_000).catch(() => null)
  await page.send("Page.navigate", { url })
  await loaded
  await page.evaluate(`
    new Promise((resolve) => {
      const waitForFonts = document.fonts?.ready ?? Promise.resolve()
      waitForFonts.then(() => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    })
  `)
}

async function captureScreenshot(page, outPath) {
  const result = await page.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
    fromSurface: true,
  })
  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, Buffer.from(result.data, "base64"))
}

async function inspectLayout(page, route) {
  const routeLiteral = JSON.stringify(route)
  return page.evaluate(`
    (async () => {
      const route = ${routeLiteral}
      const errors = []
      const measurements = {
        route,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        documentHeight: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
      }
      const roundedRect = (rect) => ({
        top: Math.round(rect.top * 10) / 10,
        right: Math.round(rect.right * 10) / 10,
        bottom: Math.round(rect.bottom * 10) / 10,
        left: Math.round(rect.left * 10) / 10,
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10,
      })
      const normalizeText = (value) => String(value || "").replace(/\\s+/g, " ").trim()
      const visible = (element) => {
        if (!element) return false
        const style = getComputedStyle(element)
        const rect = element.getBoundingClientRect()
        return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0
      }
      const waitFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      const inViewport = (rect) => rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth
      const sampleBelongsTo = (element, x, y) => {
        if (x < 1 || x > window.innerWidth - 1 || y < 1 || y > window.innerHeight - 1) return true
        const stack = document.elementsFromPoint(x, y)
        return stack.some((node) => node === element || element.contains(node) || node.contains(element))
      }
      const isCovered = (element) => {
        const rects = Array.from(element.getClientRects()).filter((rect) => rect.width > 8 && rect.height > 8 && inViewport(rect))
        for (const rect of rects.slice(0, 3)) {
          if (rect.top < 88 || rect.bottom > window.innerHeight - 6) continue
          const leftX = Math.min(Math.max(rect.left + Math.min(12, rect.width / 2), 1), window.innerWidth - 2)
          const centerX = Math.min(Math.max(rect.left + rect.width / 2, 1), window.innerWidth - 2)
          const rightX = Math.min(Math.max(rect.right - Math.min(12, rect.width / 2), 1), window.innerWidth - 2)
          const centerY = Math.min(Math.max(rect.top + rect.height / 2, 1), window.innerHeight - 2)
          const bottomY = Math.min(Math.max(rect.bottom - 3, 1), window.innerHeight - 2)
          if (!sampleBelongsTo(element, centerX, centerY)) return true
          if (!sampleBelongsTo(element, leftX, bottomY) && !sampleBelongsTo(element, rightX, bottomY)) return true
        }
        return false
      }

      window.scrollTo(0, 0)
      await waitFrame()

      const docWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
      const horizontalOverflow = docWidth - window.innerWidth
      measurements.documentWidth = docWidth
      measurements.horizontalOverflow = Math.round(horizontalOverflow * 10) / 10
      if (horizontalOverflow > 1) {
        errors.push("page has horizontal overflow of " + measurements.horizontalOverflow + "px")
      }

      const h1 = document.querySelector("h1")
      if (!h1 || !visible(h1)) {
        errors.push("page is missing a visible h1")
      } else {
        const h1Rect = h1.getBoundingClientRect()
        measurements.h1 = { text: normalizeText(h1.textContent).slice(0, 120), rect: roundedRect(h1Rect) }
        if (h1Rect.top < 0 || h1Rect.top > window.innerHeight * 0.82) {
          errors.push("visible h1 is not in a sensible first-screen position")
        }
      }

      const ctaSelectors = "a[href], button"
      const visibleCtas = Array.from(document.querySelectorAll(ctaSelectors))
        .filter((element) => visible(element))
        .filter((element) => {
          const rect = element.getBoundingClientRect()
          return rect.top >= 0 && rect.top < window.innerHeight * 1.15
        })
        .map((element) => normalizeText(element.textContent).slice(0, 80))
        .filter(Boolean)
      measurements.firstScreenCtaCount = visibleCtas.length
      measurements.firstScreenCtas = visibleCtas.slice(0, 8)
      if (visibleCtas.length === 0) {
        errors.push("first screen has no visible link or button CTA")
      }

      const maxScrollY = Math.max(0, Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight)
      const scrollPositions = Array.from(new Set([0, Math.round(maxScrollY * 0.33), Math.round(maxScrollY * 0.66), maxScrollY].filter((value) => value >= 0)))
      const textSelector = "h1, h2, h3, h4, p, li, a, button, summary, label, span, strong"
      const coveredText = []
      const clippedText = []

      for (const y of scrollPositions) {
        window.scrollTo(0, y)
        await waitFrame()
        const elements = Array.from(document.querySelectorAll(textSelector))
          .filter((element) => visible(element))
          .filter((element) => normalizeText(element.textContent).length >= 12)

        for (const element of elements) {
          const rect = element.getBoundingClientRect()
          if (!inViewport(rect)) continue
          const style = getComputedStyle(element)
          const overflowX = element.scrollWidth - element.clientWidth
          const overflowY = element.scrollHeight - element.clientHeight
          const clipsX = /(hidden|clip|auto|scroll)/.test(style.overflowX)
          const clipsY = /(hidden|clip|auto|scroll)/.test(style.overflowY)
          const text = normalizeText(element.textContent).slice(0, 120)

          if (overflowX > 1 && clipsX) {
            clippedText.push({ y, axis: "x", text, overflowPx: Math.round(overflowX * 10) / 10, rect: roundedRect(rect) })
          }
          if (overflowY > 1 && clipsY) {
            clippedText.push({ y, axis: "y", text, overflowPx: Math.round(overflowY * 10) / 10, rect: roundedRect(rect) })
          }
          if (isCovered(element)) {
            coveredText.push({ y, text, rect: roundedRect(rect) })
          }
          if (coveredText.length + clippedText.length > 12) break
        }
        if (coveredText.length + clippedText.length > 12) break
      }

      window.scrollTo(0, 0)
      await waitFrame()

      measurements.scrollPositionsChecked = scrollPositions
      measurements.coveredText = coveredText.slice(0, 8)
      measurements.clippedText = clippedText.slice(0, 8)
      if (coveredText.length > 0) {
        errors.push("visible text appears covered or overlapped: " + coveredText.slice(0, 3).map((item) => item.text).join(" | "))
      }
      if (clippedText.length > 0) {
        errors.push("visible text is clipped by overflow: " + clippedText.slice(0, 3).map((item) => item.text).join(" | "))
      }

      return { ok: errors.length === 0, errors, measurements }
    })()
  `, 20_000)
}

function writeJson(relativePath, report) {
  const outPath = path.resolve(repoRoot, relativePath)
  const relative = path.relative(repoRoot, outPath)
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`json output must stay inside the website repo: ${relativePath}`)
  }
  return mkdir(path.dirname(outPath), { recursive: true }).then(() => writeFile(outPath, `${JSON.stringify(report, null, 2)}\n`))
}

async function runChecks(baseUrl, options) {
  const chrome = await launchLocalChromeCdp({})
  const results = []

  try {
    for (const route of options.routes) {
      for (const viewport of viewports) {
        const page = await chrome.newPage()
        try {
          await configurePage(page, viewport)
          await navigate(page, `${baseUrl}${route}`)
          const result = await inspectLayout(page, route)
          const screenshotPath = path.join(options.screenshotDir, `${viewport.name}-${routeToFileName(route)}.png`)
          if (!options.noScreenshots) {
            await captureScreenshot(page, path.join(repoRoot, screenshotPath))
          }
          results.push({
            route,
            viewport,
            screenshotPath: options.noScreenshots ? null : screenshotPath,
            ...result,
          })
        } finally {
          await page.close()
        }
      }
    }
  } finally {
    await chrome.close()
  }

  return results
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  let child = null
  let logs = []
  let baseUrl = options.origin

  if (!baseUrl) {
    assertBuildArtifacts(options.routes)
    const port = process.env.BOOKEDONCALL_VERIFY_VISUAL_PORT || (await getFreePort())
    baseUrl = `http://127.0.0.1:${port}`
    const server = startNextServer(repoRoot, port, {
      BOOKEDONCALL_DEMO_VOICE_ENABLED: "false",
      VAPI_WEB_PUBLIC_KEY: "",
      VAPI_DEMO_ASSISTANT_ID: "",
      BOOKEDONCALL_LEAD_NOTIFY_TO: "",
      RESEND_API_KEY: "",
      RESEND_FROM_EMAIL: "",
      RESEND_REPLY_TO_EMAIL: "",
    })
    child = server.child
    logs = server.logs
    await waitForServer(baseUrl, child, logs)
  }

  try {
    const results = await runChecks(baseUrl, options)
    const report = {
      schemaVersion: "bookedoncall_site_visual_layout_evidence_v1",
      generatedAt: new Date().toISOString(),
      proofBoundary: "Local production-mode website visual evidence only. This is not deployed website proof, live voice proof, provider proof, customer-data proof, revenue readiness, or launch readiness.",
      baseUrl,
      routeCount: options.routes.length,
      viewportCount: viewports.length,
      results,
    }
    const errors = results.flatMap((result) => result.errors.map((error) => `${result.viewport.name} ${result.route}: ${error}`))

    if (options.jsonOut) await writeJson(options.jsonOut, report)
    if (errors.length > 0) {
      throw new Error(errors.map((error) => `- ${error}`).join("\n"))
    }

    console.log(`verify:visual-layout passed (${options.routes.length} routes, ${viewports.length} viewports)`)
    if (options.jsonOut) console.log(`json=${options.jsonOut}`)
    if (!options.noScreenshots) console.log(`screenshots=${options.screenshotDir}`)
    console.log(`proof_boundary=${report.proofBoundary}`)
  } finally {
    if (child) child.kill("SIGTERM")
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})

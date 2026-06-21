#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { assertBuildRoutes, getFreePort, startNextServer, waitForServer } from "./lib/next-production-verifier.mjs"
import { launchLocalChromeCdp } from "./lib/local-chrome-cdp.mjs"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const defaultScreenshotDir = "artifacts/screenshots/homepage-hero-visual"

const viewports = [
  { name: "desktop", width: 1512, height: 982, deviceScaleFactor: 1, mobile: false },
  { name: "wide-desktop", width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false },
  { name: "iphone", width: 390, height: 844, deviceScaleFactor: 3, mobile: true },
  { name: "android", width: 412, height: 915, deviceScaleFactor: 2.625, mobile: true },
]

function parseArgs(argv) {
  const options = {
    origin: "",
    jsonOut: "",
    screenshotDir: defaultScreenshotDir,
    noScreenshots: false,
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
    throw new Error(`Unknown option: ${arg}`)
  }

  return options
}

function assertBuildArtifacts() {
  assertBuildRoutes(repoRoot, ["/page"], "verify:homepage-hero")
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

async function inspectHero(page) {
  return page.evaluate(`
    (() => {
      const errors = []
      const measurements = {}
      const visible = (element) => {
        if (!element) return false
        const style = getComputedStyle(element)
        const rect = element.getBoundingClientRect()
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0
      }
      const roundedRect = (rect) => ({
        top: Math.round(rect.top * 10) / 10,
        right: Math.round(rect.right * 10) / 10,
        bottom: Math.round(rect.bottom * 10) / 10,
        left: Math.round(rect.left * 10) / 10,
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10,
      })

      const hero = document.querySelector("[data-home-hero-section]")
      const preview = document.querySelector("[data-home-hero-preview]")
      const summary = document.querySelector("[data-home-hero-summary]")
      const doc = document.documentElement
      const body = document.body
      const viewportWidth = window.innerWidth
      const horizontalOverflow = Math.max(doc.scrollWidth, body.scrollWidth) - viewportWidth

      measurements.viewportWidth = viewportWidth
      measurements.viewportHeight = window.innerHeight
      measurements.documentWidth = Math.max(doc.scrollWidth, body.scrollWidth)
      measurements.horizontalOverflow = Math.round(horizontalOverflow * 10) / 10

      if (horizontalOverflow > 1) {
        errors.push("page has horizontal overflow of " + measurements.horizontalOverflow + "px")
      }
      if (!hero) {
        errors.push("missing home hero section")
        return { ok: false, errors, measurements }
      }

      const heroRect = hero.getBoundingClientRect()
      measurements.hero = roundedRect(heroRect)

      if (viewportWidth >= 1024) {
        if (!preview || !visible(preview)) {
          errors.push("desktop hero call preview is missing or hidden")
        }
        if (!summary || !visible(summary)) {
          errors.push("desktop hero summary is missing or hidden")
        }

        if (summary && visible(summary)) {
          const summaryRect = summary.getBoundingClientRect()
          measurements.summary = roundedRect(summaryRect)
          measurements.summaryClearancePx = Math.round((heroRect.bottom - summaryRect.bottom) * 10) / 10
          measurements.summaryScrollOverflowY = Math.round((summary.scrollHeight - summary.clientHeight) * 10) / 10
          measurements.summaryScrollOverflowX = Math.round((summary.scrollWidth - summary.clientWidth) * 10) / 10

          if (!summary.textContent.includes("No-cool diagnostic booked")) {
            errors.push("summary no longer includes the no-cool booking outcome")
          }
          if (!summary.textContent.includes("same-day owner review flagged")) {
            errors.push("summary no longer includes the same-day owner review flag")
          }
          if (summaryRect.bottom > heroRect.bottom - 12) {
            errors.push("hero summary is too close to or below the hero bottom; clearance=" + measurements.summaryClearancePx + "px")
          }
          if (summary.scrollHeight - summary.clientHeight > 1) {
            errors.push("hero summary content is vertically clipped inside its card")
          }
          if (summary.scrollWidth - summary.clientWidth > 1) {
            errors.push("hero summary content is horizontally clipped inside its card")
          }

          const probeX = Math.min(Math.max(summaryRect.left + 20, 1), viewportWidth - 2)
          const probeY = Math.min(Math.max(summaryRect.bottom - 6, 1), window.innerHeight - 2)
          const bottomHit = document.elementFromPoint(probeX, probeY)
          measurements.summaryBottomHit = bottomHit ? {
            tag: bottomHit.tagName,
            text: bottomHit.textContent.trim().slice(0, 80),
          } : null
          if (bottomHit && !summary.contains(bottomHit) && summaryRect.bottom < window.innerHeight) {
            errors.push("another element visually covers the lower edge of the hero summary")
          }
        }

        if (preview && visible(preview)) {
          const clippedChildren = Array.from(preview.querySelectorAll("p, strong, span, div"))
            .filter((element) => visible(element) && element.textContent.trim().length > 18)
            .map((element) => ({ element, rect: element.getBoundingClientRect() }))
            .filter(({ rect }) => rect.top < heroRect.top - 1 || rect.bottom > heroRect.bottom - 1)
            .map(({ element, rect }) => ({
              text: element.textContent.trim().replace(/\\s+/g, " ").slice(0, 90),
              rect: roundedRect(rect),
            }))

          measurements.previewClippedChildren = clippedChildren
          if (clippedChildren.length > 0) {
            errors.push("hero preview text extends outside the hero section: " + clippedChildren.map((item) => item.text).join(" | "))
          }
        }
      } else if (preview && visible(preview)) {
        errors.push("desktop hero call preview should stay hidden on mobile widths")
      }

      return { ok: errors.length === 0, errors, measurements }
    })()
  `)
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
    for (const viewport of viewports) {
      const page = await chrome.newPage()
      try {
        await configurePage(page, viewport)
        await navigate(page, `${baseUrl}/`)
        const result = await inspectHero(page)
        const screenshotPath = path.join(options.screenshotDir, `home-${viewport.name}.png`)
        if (!options.noScreenshots) {
          await captureScreenshot(page, path.join(repoRoot, screenshotPath))
        }
        results.push({
          viewport,
          screenshotPath: options.noScreenshots ? null : screenshotPath,
          ...result,
        })
      } finally {
        await page.close()
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
    assertBuildArtifacts()
    const port = process.env.BOOKEDONCALL_VERIFY_HERO_PORT || (await getFreePort())
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
      schemaVersion: "bookedoncall_homepage_hero_visual_evidence_v1",
      generatedAt: new Date().toISOString(),
      proofBoundary: "Local production-mode website visual evidence only. This is not deployed website proof, live voice proof, provider proof, customer-data proof, or launch readiness.",
      baseUrl,
      results,
    }
    const errors = results.flatMap((result) => result.errors.map((error) => `${result.viewport.name}: ${error}`))

    if (options.jsonOut) await writeJson(options.jsonOut, report)
    if (errors.length > 0) {
      throw new Error(errors.map((error) => `- ${error}`).join("\n"))
    }

    console.log(`verify:homepage-hero passed (${results.length} viewports)`)
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

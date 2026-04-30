#!/usr/bin/env node

import fs from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const buildAppRoot = path.join(repoRoot, ".next", "server", "app")
const contract = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "public-site-contract.json"), "utf8"))
const siteOrigin = normalizeOrigin(contract.brand.websiteOrigin)

const tradeRouteByLabel = {
  Plumbing: "/for/plumbers",
  HVAC: "/for/hvac",
  Electrical: "/for/electricians",
  Painting: "/for/painters",
  Flooring: "/for/flooring",
  Landscaping: "/for/landscaping",
  "General home services": "/for/general-home-services",
}

const requiredRoutes = [
  "/",
  "/product",
  "/industries",
  "/integrations",
  "/resources",
  "/features",
  "/how-it-works",
  "/pricing",
  "/login",
  "/sign-up",
  "/about",
  "/faq",
  "/examples",
  "/privacy",
  "/terms",
  "/dpa",
  "/contact",
  ...contract.supportedTrades.map((trade) => tradeRouteByLabel[trade]).filter(Boolean),
  ...contract.integrations.map((integration) => `/integrations/${integration.id}`),
]

const bannedHtmlPatterns = [
  /join the waitlist/i,
  /\/api\/checkout/i,
  /automatic appointment booking/i,
  /jobber job(?:s)? (?:are|is) created automatically/i,
  /writes? new appointments? back in real time/i,
  /usage analytics dashboard/i,
  /team member access/i,
]

const errors = []

function addError(message) {
  errors.push(message)
}

function readBuiltText(relativePath) {
  const filePath = path.join(buildAppRoot, relativePath)
  if (!fs.existsSync(filePath)) {
    addError(`Missing built artifact: .next/server/app/${relativePath}. Run npm run build before npm run verify:seo.`)
    return ""
  }
  return fs.readFileSync(filePath, "utf8")
}

function normalizeOrigin(value) {
  return new URL(value).origin
}

function normalizeUrl(value) {
  const url = new URL(value)
  const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/+$/, "")
  return `${url.origin}${pathname}`
}

function routeFromUrl(value) {
  const url = new URL(value)
  const pathname = url.pathname.replace(/\/+$/, "")
  return pathname || "/"
}

function htmlFileForRoute(route) {
  if (route === "/") return "index.html"
  return `${route.replace(/^\/+/, "")}.html`
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

function getAttr(tag, attrName) {
  const match = tag.match(new RegExp(`${attrName}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"))
  return match ? decodeHtml(match[2] ?? match[3] ?? match[4] ?? "") : ""
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) || []
}

function getMetaContent(html, attrName, attrValue) {
  const expected = attrValue.toLowerCase()
  for (const tag of getTags(html, "meta")) {
    if (getAttr(tag, attrName).toLowerCase() === expected) {
      return getAttr(tag, "content")
    }
  }
  return ""
}

function getLinkHref(html, relValue) {
  const expected = relValue.toLowerCase()
  for (const tag of getTags(html, "link")) {
    const rels = getAttr(tag, "rel").toLowerCase().split(/\s+/)
    if (rels.includes(expected)) {
      return getAttr(tag, "href")
    }
  }
  return ""
}

function getTitle(html) {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)
  return match ? decodeHtml(match[1]).trim() : ""
}

function getJsonLdBlocks(html) {
  return Array.from(html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi))
    .map((match) => decodeHtml(match[1]).trim())
    .filter(Boolean)
}

function parseSitemapLocations(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/gi)).map((match) => decodeHtml(match[1]).trim())
}

function assertUnique(values, label) {
  const seen = new Map()
  for (const [route, value] of values) {
    const normalized = value.toLowerCase()
    const firstRoute = seen.get(normalized)
    if (firstRoute) {
      addError(`Duplicate ${label}: ${route} and ${firstRoute} both use "${value}".`)
    } else {
      seen.set(normalized, route)
    }
  }
}

function assertLlmsSourceConsistency() {
  const sourcePath = path.join(repoRoot, "app", "llms.txt", "route.ts")
  const builtPath = path.join(buildAppRoot, "llms.txt", "route.js")
  if (!fs.existsSync(builtPath)) {
    addError("Missing built llms.txt route artifact: .next/server/app/llms.txt/route.js.")
  }
  const source = fs.existsSync(sourcePath) ? fs.readFileSync(sourcePath, "utf8") : ""
  for (const snippet of [
    "publicSiteContract.integrations",
    "integration.status === \"available\"",
    "integration.status === \"coming_soon\"",
    "selfServeCheckoutEnabled ?",
    "siteConfig.appUrl",
    "siteConfig.url}/sign-up",
    "publicSiteContract.supportedTrades",
  ]) {
    if (!source.includes(snippet)) {
      addError(`llms.txt source must stay contract-driven; missing source snippet: ${snippet}`)
    }
  }
}

const sitemapXml = readBuiltText("sitemap.xml.body")
const robotsTxt = readBuiltText("robots.txt.body")

if (robotsTxt) {
  if (!robotsTxt.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) {
    addError("robots.txt must reference the canonical sitemap URL.")
  }
  if (!/^Allow:\s*\/\s*$/im.test(robotsTxt)) {
    addError("robots.txt must allow the public website root.")
  }
  if (/^Disallow:\s*\/\s*$/im.test(robotsTxt)) {
    addError("robots.txt must not disallow the public website root.")
  }
}

const sitemapLocations = parseSitemapLocations(sitemapXml)
const sitemapRoutes = new Set(sitemapLocations.map(routeFromUrl))
for (const route of requiredRoutes) {
  if (!sitemapRoutes.has(route)) {
    addError(`Sitemap is missing required route: ${route}`)
  }
}

const titles = []
const descriptions = []
let jsonLdCount = 0

for (const loc of sitemapLocations) {
  let normalizedLoc = ""
  let route = ""
  try {
    const url = new URL(loc)
    normalizedLoc = normalizeUrl(loc)
    route = routeFromUrl(loc)
    if (url.origin !== siteOrigin) {
      addError(`Sitemap URL is outside ${siteOrigin}: ${loc}`)
      continue
    }
  } catch {
    addError(`Invalid sitemap URL: ${loc}`)
    continue
  }

  const htmlRelativePath = htmlFileForRoute(route)
  const html = readBuiltText(htmlRelativePath)
  if (!html) continue

  for (const pattern of bannedHtmlPatterns) {
    if (pattern.test(html)) {
      addError(`Built route ${route} contains banned or stale public claim: ${pattern}`)
    }
  }

  const title = getTitle(html)
  const description = getMetaContent(html, "name", "description")
  const canonical = getLinkHref(html, "canonical")
  const ogUrl = getMetaContent(html, "property", "og:url")
  const jsonLdBlocks = getJsonLdBlocks(html)
  jsonLdCount += jsonLdBlocks.length

  if (!title) addError(`Built route ${route} is missing a <title>.`)
  if (!description) addError(`Built route ${route} is missing a meta description.`)
  if (!canonical) addError(`Built route ${route} is missing a canonical link.`)
  if (!ogUrl) addError(`Built route ${route} is missing og:url.`)
  if (canonical && normalizeUrl(canonical) !== normalizedLoc) {
    addError(`Built route ${route} canonical mismatch: expected ${normalizedLoc}, got ${canonical}.`)
  }
  if (ogUrl && normalizeUrl(ogUrl) !== normalizedLoc) {
    addError(`Built route ${route} og:url mismatch: expected ${normalizedLoc}, got ${ogUrl}.`)
  }
  if (jsonLdBlocks.length === 0) {
    addError(`Built route ${route} is missing JSON-LD structured data.`)
  }

  for (const [index, block] of jsonLdBlocks.entries()) {
    try {
      JSON.parse(block)
    } catch (error) {
      addError(`Built route ${route} has invalid JSON-LD block ${index + 1}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (title) titles.push([route, title])
  if (description) descriptions.push([route, description])
}

assertUnique(titles, "title")
assertUnique(descriptions, "meta description")
assertLlmsSourceConsistency()

if (errors.length > 0) {
  console.error("verify:seo failed")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(`verify:seo passed (${sitemapLocations.length} sitemap routes crawled, ${jsonLdCount} JSON-LD blocks parsed)`)

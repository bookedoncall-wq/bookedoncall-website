import { absoluteUrl, siteConfig } from "@/config/site"

export const runtime = "nodejs"

const pages = [
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
  "/demo-calls",
  "/examples",
  "/compare/answering-service-vs-receptionist-vs-ai-receptionist",
  "/compare/missed-calls-for-home-service-businesses",
  "/compare/after-hours-call-answering-for-hvac",
  "/compare/ai-receptionist-vs-voicemail",
  "/compare/after-hours-call-answering-for-plumbers",
  "/for/plumbers",
  "/for/hvac",
  "/for/electricians",
  "/for/painters",
  "/for/flooring",
  "/for/landscaping",
  "/for/roofing",
  "/for/general-home-services",
  "/integrations/jobber",
  "/integrations/google-calendar",
  "/integrations/email",
  "/integrations/text-sms",
  "/integrations/quickbooks",
  "/integrations/housecall-pro",
  "/integrations/servicetitan",
  "/privacy",
  "/terms",
  "/call-handling-notice",
  "/sms-terms",
  "/dpa",
  "/contact",
] as const

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function routeChangeFrequency(path: string) {
  if (path === "/" || path === "/pricing" || path === "/faq" || path === "/product" || path === "/demo-calls") {
    return "weekly"
  }
  return "monthly"
}

function routePriority(path: string) {
  if (path === "/") return 1
  if (path === "/pricing") return 0.95
  if (path === "/product") return 0.92
  if (path === "/industries" || path === "/integrations" || path === "/resources") return 0.88
  if (path === "/features" || path === "/how-it-works" || path === "/faq") return 0.85
  return 0.7
}

export function GET() {
  const entries = pages
    .map((path) =>
      [
        "  <url>",
        `    <loc>${xmlEscape(absoluteUrl(path))}</loc>`,
        `    <lastmod>${xmlEscape(siteConfig.lastUpdated)}</lastmod>`,
        `    <changefreq>${routeChangeFrequency(path)}</changefreq>`,
        `    <priority>${routePriority(path)}</priority>`,
        "  </url>",
      ].join("\n")
    )
    .join("\n")

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

import type { MetadataRoute } from "next"
import { absoluteUrl, siteConfig } from "@/config/site"

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
  "/for/general-home-services",
  "/integrations/jobber",
  "/integrations/google-calendar",
  "/integrations/text-sms",
  "/integrations/quickbooks",
  "/integrations/housecall-pro",
  "/integrations/servicetitan",
  "/privacy",
  "/terms",
  "/dpa",
  "/contact",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: absoluteUrl(path),
    lastModified: siteConfig.lastUpdated,
    changeFrequency:
      path === "/" || path === "/pricing" || path === "/faq" || path === "/product"
        ? "weekly"
        : path.startsWith("/for/") || path.startsWith("/integrations/") || path.startsWith("/compare/")
          ? "monthly"
          : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/pricing"
          ? 0.95
          : path === "/product"
            ? 0.92
            : path === "/industries" || path === "/integrations" || path === "/resources"
              ? 0.88
              : path === "/features" || path === "/how-it-works" || path === "/faq"
            ? 0.85
            : 0.7,
  }))
}

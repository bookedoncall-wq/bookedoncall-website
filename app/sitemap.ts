import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/config/site"

const pages = [
  "/",
  "/features",
  "/how-it-works",
  "/pricing",
  "/sign-up",
  "/about",
  "/faq",
  "/for/plumbers",
  "/for/hvac",
  "/for/electricians",
  "/for/painters",
  "/for/flooring",
  "/for/landscaping",
  "/for/general-home-services",
  "/integrations/jobber",
  "/integrations/google-calendar",
  "/privacy",
  "/terms",
  "/dpa",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return pages.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency:
      path === "/" || path === "/pricing" || path === "/faq"
        ? "weekly"
        : path.startsWith("/for/") || path.startsWith("/integrations/")
          ? "monthly"
          : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/pricing"
          ? 0.95
          : path === "/features" || path === "/how-it-works" || path === "/faq"
            ? 0.85
            : 0.7,
  }))
}

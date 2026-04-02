import contract from "@/config/public-site-contract.json"

export type PublicPlanId = "starter" | "pro"

export const publicSiteContract = contract

export const siteConfig = {
  name: contract.brand.name,
  title: `${contract.brand.name} | ${contract.brand.tagline}`,
  description: contract.brand.description,
  url: contract.brand.websiteOrigin,
  appUrl: contract.brand.appOrigin,
  email: contract.contacts.salesEmail,
  supportEmail: contract.contacts.supportEmail,
  privacyEmail: contract.contacts.privacyEmail,
  legalEmail: contract.contacts.legalEmail,
  lastUpdated: contract.legal.lastUpdated,
  governingLaw: contract.legal.governingLaw,
  venue: contract.legal.venue,
} as const

export const plans = contract.plans
export const validatedCapabilities = contract.validatedCapabilities
export const supportedTrades = contract.supportedTrades
export const integrations = contract.integrations

export const primaryNav = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
] as const

export const secondaryNav = [
  { label: "For Plumbers", href: "/for/plumbers" },
  { label: "For HVAC", href: "/for/hvac" },
  { label: "For Electricians", href: "/for/electricians" },
  { label: "Jobber", href: "/integrations/jobber" },
  { label: "Google Calendar", href: "/integrations/google-calendar" },
  { label: "About", href: "/about" },
] as const

export function getPlan(planId?: string | null) {
  const normalized = typeof planId === "string" ? planId.trim().toLowerCase() : ""
  return plans.find((plan) => plan.id === normalized) || null
}

export function buildAppStartHref(planId?: string | null, source = "website") {
  const url = new URL("/start", `${siteConfig.appUrl}/`)
  const plan = getPlan(planId) || plans[0]
  if (plan) {
    url.searchParams.set("plan", plan.id)
  }
  if (source) {
    url.searchParams.set("source", source)
  }
  return url.toString()
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString()
}

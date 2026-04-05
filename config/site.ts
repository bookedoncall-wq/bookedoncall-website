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
export const positioning = contract.positioning
export const sourcedProof = contract.sourcedProof
export const customerLoginPath = "/login" as const
export const leadCapturePath = "/sign-up" as const
export const customerLoginUrl = new URL("/sign-in", `${contract.brand.appOrigin}/`).toString()
export const selfServeCheckoutEnabled = contract.featureFlags.selfServeCheckout === true
export const primaryCtaLabel = positioning.primaryCtaLabel || "Start setup"

export const primaryNav = [
  { label: "Product", href: "/product" },
  { label: "Industries", href: "/industries" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
] as const

export const secondaryNav = [
  { label: "Product", href: "/product" },
  { label: "Industries", href: "/industries" },
  { label: "For Plumbers", href: "/for/plumbers" },
  { label: "For HVAC", href: "/for/hvac" },
  { label: "For Electricians", href: "/for/electricians" },
  { label: "For Painters", href: "/for/painters" },
  { label: "For Flooring", href: "/for/flooring" },
  { label: "For Landscapers", href: "/for/landscaping" },
  { label: "For General Home Services", href: "/for/general-home-services" },
  { label: "Integrations", href: "/integrations" },
  { label: "Jobber", href: "/integrations/jobber" },
  { label: "Google Calendar", href: "/integrations/google-calendar" },
  { label: "Resources", href: "/resources" },
  { label: "Examples", href: "/examples" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
] as const

export function getPlan(planId?: string | null) {
  const normalized = typeof planId === "string" ? planId.trim().toLowerCase() : ""
  return plans.find((plan) => plan.id === normalized) || null
}

export function buildGetStartedHref(planId?: string | null, source = "website") {
  if (!selfServeCheckoutEnabled) {
    return buildLeadFormHref(planId, source)
  }
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

export function buildLeadFormHref(planId?: string | null, source = "website") {
  const url = new URL(leadCapturePath, `${siteConfig.url}/`)
  const plan = getPlan(planId) || plans[0]
  if (plan) {
    url.searchParams.set("plan", plan.id)
  }
  if (source) {
    url.searchParams.set("source", source)
  }
  return `${url.pathname}${url.search}#lead-form`
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString()
}

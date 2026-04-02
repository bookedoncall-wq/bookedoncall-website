import contract from "@/config/public-site-contract.json"

export type PublicPlanId = "starter" | "pro"

export const publicSiteContract = contract

export const siteConfig = {
  name: contract.brand.name,
  title: `${contract.brand.name} | ${contract.brand.tagline}`,
  description: contract.brand.description,
  url: contract.brand.websiteOrigin,
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
  { label: "For Painters", href: "/for/painters" },
  { label: "For Flooring", href: "/for/flooring" },
  { label: "For Landscapers", href: "/for/landscaping" },
  { label: "For General Home Services", href: "/for/general-home-services" },
  { label: "Jobber", href: "/integrations/jobber" },
  { label: "Google Calendar", href: "/integrations/google-calendar" },
  { label: "About", href: "/about" },
] as const

export function getPlan(planId?: string | null) {
  const normalized = typeof planId === "string" ? planId.trim().toLowerCase() : ""
  return plans.find((plan) => plan.id === normalized) || null
}

export function buildGetStartedHref(planId?: string | null, source = "website") {
  const url = new URL("/sign-up", `${siteConfig.url}/`)
  const plan = getPlan(planId) || plans[0]
  if (plan) {
    url.searchParams.set("plan", plan.id)
  }
  if (source) {
    url.searchParams.set("source", source)
  }
  return `${url.pathname}${url.search}`
}

export function buildPlanContactHref(planId?: string | null, source = "website") {
  const plan = getPlan(planId) || plans[0]
  const subject = `${siteConfig.name} ${plan?.name || "Plan"} interest`
  const body = [
    `Hi ${siteConfig.name},`,
    "",
    `I'm interested in the ${plan?.name || "Starter"} plan.`,
    "",
    "Business name:",
    "Trade:",
    "Best phone number:",
    "Anything you should know about our call flow:",
    "",
    `Source: ${source}`,
  ].join("\n")

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString()
}

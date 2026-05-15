import { buildGetStartedHref, positioning, primaryCtaLabel, publicSiteContract, selfServeCheckoutEnabled, siteConfig } from "@/config/site"

export const runtime = "nodejs"

export async function GET() {
  const configurableIntegrations = publicSiteContract.integrations
    .filter((integration) => integration.status === "available")
    .map((integration) => integration.name)
  const roadmapIntegrations = publicSiteContract.integrations
    .filter((integration) => integration.status === "coming_soon" && !["housecall-pro", "servicetitan"].includes(integration.id))
    .map((integration) => integration.name)
  const compatibilityReviewIntegrations = publicSiteContract.integrations
    .filter((integration) => ["housecall-pro", "servicetitan"].includes(integration.id))
    .map((integration) => integration.name)

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `- Website: ${siteConfig.url}`,
    `- Product: ${siteConfig.url}/product`,
    `- Industries: ${siteConfig.url}/industries`,
    `- Integrations: ${siteConfig.url}/integrations`,
    `- Resources: ${siteConfig.url}/resources`,
    `- ${primaryCtaLabel}: ${selfServeCheckoutEnabled ? buildGetStartedHref(undefined, "llms") : `${siteConfig.url}/sign-up`}`,
    `- Existing customer login: ${siteConfig.url}/login`,
    `- Customer app sign-in: ${siteConfig.appUrl}/sign-in`,
    `- Examples: ${siteConfig.url}/examples`,
    `- Description: ${positioning.oneLiner}`,
    `- Setup flow: ${selfServeCheckoutEnabled ? "New customers start on the website and continue into secure checkout on the app. Existing customers use the app for sign-in, onboarding, and dashboard access." : "New customers start on the website first so we can guide the right setup path. Existing customers use the app for sign-in, onboarding, and dashboard access."}`,
    `- Supported trades: ${publicSiteContract.supportedTrades.join(", ")}`,
    `- Configurable integration workflows: ${configurableIntegrations.join(", ")}`,
    `- Compatibility review integrations: ${compatibilityReviewIntegrations.join(", ") || "None listed"}`,
    `- Roadmap integrations: ${roadmapIntegrations.join(", ") || "None listed"}`,
    `- Pricing page: ${siteConfig.url}/pricing`,
    `- FAQ page: ${siteConfig.url}/faq`,
    `- Privacy: ${siteConfig.url}/privacy`,
    `- Terms: ${siteConfig.url}/terms`,
    `- DPA: ${siteConfig.url}/dpa`,
    `- Contact: ${siteConfig.url}/contact`,
  ]

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

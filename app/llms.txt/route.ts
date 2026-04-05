import { buildGetStartedHref, positioning, primaryCtaLabel, publicSiteContract, selfServeCheckoutEnabled, siteConfig } from "@/config/site"

export async function GET() {
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
    `- Integrations: ${publicSiteContract.integrations.map((integration) => integration.name).join(", ")}`,
    `- Pricing page: ${siteConfig.url}/pricing`,
    `- FAQ page: ${siteConfig.url}/faq`,
    `- Privacy: ${siteConfig.url}/privacy`,
    `- Terms: ${siteConfig.url}/terms`,
    `- DPA: ${siteConfig.url}/dpa`,
    `- Contact: ${siteConfig.email}`,
  ]

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

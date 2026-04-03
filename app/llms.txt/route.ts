import { positioning, publicSiteContract, siteConfig } from "@/config/site"

export async function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `- Website: ${siteConfig.url}`,
    `- Product: ${siteConfig.url}/product`,
    `- Industries: ${siteConfig.url}/industries`,
    `- Integrations: ${siteConfig.url}/integrations`,
    `- Resources: ${siteConfig.url}/resources`,
    `- Talk to us: ${siteConfig.url}/sign-up`,
    `- Existing customer login: ${siteConfig.url}/login`,
    `- Customer app sign-in: ${siteConfig.appUrl}/sign-in`,
    `- Read sample calls: ${siteConfig.url}/demo-calls`,
    `- Description: ${positioning.oneLiner}`,
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

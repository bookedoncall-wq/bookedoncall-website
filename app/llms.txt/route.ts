import { publicSiteContract, siteConfig } from "@/config/site"

export async function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `- Website: ${siteConfig.url}`,
    `- Get started: ${siteConfig.url}/sign-up`,
    `- Description: ${siteConfig.description}`,
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

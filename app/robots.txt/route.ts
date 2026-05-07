import { siteConfig } from "@/config/site"

export const runtime = "nodejs"

const allowedAgents = ["*", "GPTBot", "ChatGPT-User", "Google-Extended", "Anthropic", "PerplexityBot", "Applebot-Extended"] as const

export function GET() {
  const lines = [
    ...allowedAgents.flatMap((agent) => [`User-Agent: ${agent}`, "Allow: /", ""]),
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

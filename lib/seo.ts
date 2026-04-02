import type { Metadata } from "next"
import { absoluteUrl, siteConfig } from "@/config/site"

export function buildPageMetadata(input: {
  title: string
  description: string
  path: string
}) {
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: absoluteUrl(input.path),
    },
    openGraph: {
      title: `${input.title} | ${siteConfig.name}`,
      description: input.description,
      url: absoluteUrl(input.path),
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} | ${input.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${siteConfig.name}`,
      description: input.description,
      images: [absoluteUrl("/opengraph-image")],
    },
  } satisfies Metadata
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: [],
  }
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }
}

export function buildServiceSchema(input: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "United States",
  }
}

export function buildFaqSchema(
  entries: ReadonlyArray<{
    question: string
    answer: string
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  }
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

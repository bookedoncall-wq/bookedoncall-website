import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"
import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import { StructuredData } from "@/components/marketing/StructuredData"
import { siteConfig } from "@/config/site"
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/seo"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#fff7ed",
}

const rawGoogleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || ""
const googleTagManagerId = /^GTM-[A-Z0-9]+$/i.test(rawGoogleTagManagerId) ? rawGoogleTagManagerId : ""

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-white text-slate-950 antialiased">
        {googleTagManagerId ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({ event: "gtm.js", "gtm.start": new Date().getTime() });
              (function(w,d,s,l,i){var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","${googleTagManagerId}");
            `}
          </Script>
        ) : null}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <StructuredData data={buildOrganizationSchema()} />
        <StructuredData data={buildWebsiteSchema()} />
        <div className="relative min-h-screen overflow-x-clip bg-[linear-gradient(135deg,_#fff8ee_0%,_#fffdfa_56%,_#f5f7fb_100%)]">
          <Nav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

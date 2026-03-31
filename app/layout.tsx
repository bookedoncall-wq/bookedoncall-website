import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import { siteConfig } from "@/config/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} | Every Call Answered. Every Job Booked.`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "AI receptionist for trades",
    "AI call answering service",
    "virtual receptionist for plumbers",
    "automatic appointment booking",
    "plumber phone answering service",
    "HVAC call answering",
    "electrician booking software",
    "Jobber integration call answering",
    "missed call solution for contractors",
    "24/7 answering service for trades",
    "AI phone answering for small business",
    "trades business phone automation",
    "BookedOnCall",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Every Call Answered. Every Job Booked.`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "BookedOnCall | Every Call Answered. Every Job Booked.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Every Call Answered. Every Job Booked.`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "BookedOnCall",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "AI-powered call answering and appointment booking service for trades businesses like plumbers, electricians, and HVAC technicians. Answers calls, qualifies leads, and books jobs automatically.",
              "url": "https://bookedoncall.com",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "250",
                "highPrice": "350",
                "priceCurrency": "USD",
                "offerCount": "2"
              },
              "creator": {
                "@type": "Person",
                "name": "David Carley",
                "url": "https://www.linkedin.com/in/david-carley/"
              },
              "featureList": [
                "AI voice call answering",
                "Lead qualification",
                "Automatic appointment booking",
                "Jobber integration",
                "Google Calendar integration",
                "SMS confirmations and reminders",
                "Service area verification",
                "Emergency call detection",
                "Call transcripts and summaries",
                "Usage dashboard"
              ]
            })
          }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

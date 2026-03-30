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
    default: `${siteConfig.name} — Every Call Answered. Every Job Booked.`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "AI receptionist",
    "trades answering service",
    "automatic call answering",
    "plumber phone answering",
    "HVAC call answering",
    "electrician booking",
    "Jobber integration",
    "trades business phone",
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
    title: `${siteConfig.name} — Every Call Answered. Every Job Booked.`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "BookedOnCall — Every Call Answered. Every Job Booked.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Every Call Answered. Every Job Booked.`,
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
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

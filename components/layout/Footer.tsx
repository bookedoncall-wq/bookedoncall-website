import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Mail, ExternalLink } from "lucide-react"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center font-bold text-xl text-white mb-2 tracking-tight">
              <span>BookedOn<span className="text-amber-500">Call</span></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1 mb-3 inline-block flex-shrink-0" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-4">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              {siteConfig.email}
            </a>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-sm hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-sm hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">
            &copy; {year} BookedOnCall. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 tracking-wide uppercase">Built for the trades</p>
        </div>
      </div>
    </footer>
  )
}

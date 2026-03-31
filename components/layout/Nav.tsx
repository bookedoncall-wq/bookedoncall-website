"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — single inline flow, no gap */}
          <Link href="/" className="flex items-center font-bold text-xl tracking-tight text-slate-900">
            <span>BookedOn<span className="text-amber-500">Call</span></span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1 mb-3 inline-block flex-shrink-0" />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-lg border-transparent"
              )}
            >
              Join the Waitlist
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-slate-700 hover:text-slate-900 py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "w-full justify-center bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-lg border-transparent"
                )}
                onClick={() => setMobileOpen(false)}
              >
                Join the Waitlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

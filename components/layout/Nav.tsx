"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { buildGetStartedHref, customerLoginPath, positioning, primaryCtaLabel, primaryNav } from "@/config/site"
import { TrackedLink } from "@/components/marketing/TrackedLink"

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <TrackedLink
          href="/"
          eventName="marketing_cta_clicked"
          eventPayload={{ placement: "nav_logo" }}
          className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-950"
        >
          <span>
            BookedOn<span className="text-amber-500">Call</span>
          </span>
          <span className="inline-block h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
        </TrackedLink>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {primaryNav.map((link) => (
            <TrackedLink
              key={link.href}
              href={link.href}
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "nav_link", href: link.href }}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
            >
              {link.label}
            </TrackedLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <TrackedLink
            href={customerLoginPath}
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "nav_customer_login", href: customerLoginPath }}
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            Customer login
          </TrackedLink>
          <TrackedLink
            href="/examples"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "nav_secondary", href: "/examples" }}
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            {positioning.secondaryCtaLabel}
          </TrackedLink>
          <TrackedLink
            href={buildGetStartedHref(undefined, "website-nav")}
            eventName="signup_started"
            eventPayload={{ placement: "nav_primary" }}
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-xl border-transparent bg-slate-950 px-4 text-white hover:bg-slate-800"
            )}
          >
            {primaryCtaLabel}
          </TrackedLink>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto grid max-w-6xl gap-3 px-4 py-4 sm:px-6">
            {primaryNav.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "mobile_nav_link", href: link.href }}
                className="rounded-xl px-2 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950"
              >
                {link.label}
              </TrackedLink>
            ))}
            <TrackedLink
              href={customerLoginPath}
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "mobile_nav_customer_login", href: customerLoginPath }}
              className="rounded-xl px-2 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950"
            >
              Customer login
            </TrackedLink>
            <TrackedLink
              href="/examples"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "mobile_nav_secondary", href: "/examples" }}
              className="rounded-xl px-2 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950"
            >
              {positioning.secondaryCtaLabel}
            </TrackedLink>
            <TrackedLink
              href={buildGetStartedHref(undefined, "website-mobile-nav")}
              eventName="signup_started"
              eventPayload={{ placement: "mobile_nav_primary" }}
              className={cn(
                buttonVariants({ size: "sm" }),
                "mt-2 justify-center rounded-xl border-transparent bg-slate-950 px-4 text-white hover:bg-slate-800"
              )}
            >
              {primaryCtaLabel}
            </TrackedLink>
          </div>
        </div>
      ) : null}
    </header>
  )
}

"use client"

export type MarketingEventName =
  | "marketing_cta_clicked"
  | "pricing_plan_selected"
  | "checkout_started"
  | "checkout_completed"
  | "signup_started"
  | "onboarding_completed"
  | "contact_sales_clicked"

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function trackMarketingEvent(name: MarketingEventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return
  }

  const event = {
    event: name,
    ...payload,
    source: "bookedoncall-website",
    timestamp: new Date().toISOString(),
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
  window.dispatchEvent(new CustomEvent("bookedoncall:marketing-event", { detail: event }))
}

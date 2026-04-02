"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { trackMarketingEvent, type MarketingEventName } from "@/lib/analytics"

type TrackedLinkProps = {
  href: string
  children: ReactNode
  className?: string
  eventName: MarketingEventName
  eventPayload?: Record<string, unknown>
  target?: string
  rel?: string
}

export function TrackedLink({
  href,
  children,
  className,
  eventName,
  eventPayload,
  target,
  rel,
}: TrackedLinkProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={target}
        rel={rel}
        onClick={() => trackMarketingEvent(eventName, eventPayload)}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackMarketingEvent(eventName, eventPayload)}
    >
      {children}
    </Link>
  )
}

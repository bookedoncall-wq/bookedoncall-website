import { CalendarClock, ClipboardList, PhoneCall } from "lucide-react"
import { buildGetStartedHref, positioning, primaryCtaLabel } from "@/config/site"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

type CtaBandProps = {
  title: string
  body: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

const setupExpectationItems = [
  {
    icon: ClipboardList,
    title: "You bring the basics",
    body: "Trade, service area, hours, call types, and the best phone path.",
  },
  {
    icon: CalendarClock,
    title: "Rules get reviewed",
    body: "Booking, pricing, urgency, and owner-review rules are checked before callers rely on them.",
  },
  {
    icon: PhoneCall,
    title: "Callers hear it after review",
    body: "Place a setup review call before missed or overflow calls forward to BookedOnCall.",
  },
] as const

export function CtaBand({
  title,
  body,
  primaryLabel = primaryCtaLabel,
  primaryHref = buildGetStartedHref(undefined, "website-cta-band"),
  secondaryLabel = positioning.secondaryCtaLabel,
  secondaryHref = "/demo-calls",
}: CtaBandProps) {
  return (
    <section className="bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-4xl gap-6 text-center">
        <h2 className="text-3xl font-black text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">{body}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <TrackedLink
            href={primaryHref}
            eventName="signup_started"
            eventPayload={{ placement: "cta_band_primary" }}
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-xl border-transparent bg-amber-500 px-6 text-white hover:bg-amber-400"
            )}
          >
            {primaryLabel}
          </TrackedLink>
          <TrackedLink
            href={secondaryHref}
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "cta_band_secondary", href: secondaryHref }}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-xl border-slate-700 bg-transparent px-6 text-white hover:bg-slate-900"
            )}
          >
            {secondaryLabel}
          </TrackedLink>
        </div>
        <div aria-label="Setup expectations" className="grid gap-3 pt-2 text-left sm:grid-cols-3">
          {setupExpectationItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="grid gap-2 rounded-lg border border-white/10 bg-white/8 p-4">
                <div className="flex items-center gap-2 text-sm font-black text-white">
                  <Icon className="size-4 shrink-0 text-amber-300" />
                  <span>{item.title}</span>
                </div>
                <p className="text-sm leading-6 text-slate-300">{item.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

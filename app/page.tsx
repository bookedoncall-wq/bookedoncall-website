import { ArrowRight, CalendarClock, CheckCircle2, ClipboardList, MailCheck, PhoneCall, ShieldCheck } from "lucide-react"
import { CtaBand } from "@/components/marketing/CtaBand"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { afterCallArtifacts, basicSetupSteps, faqEntries, homepageTrustPoints, productFlowSteps, resourceHighlights, useCaseOrder, useCasePages } from "@/config/marketing"
import {
  buildGetStartedHref,
  getIntegrationActionLabel,
  getIntegrationBadgeLabel,
  integrations,
  plans,
  positioning,
  primaryCtaLabel,
  selfServeCheckoutEnabled,
  sourcedProof,
  supportedTradeLinks,
} from "@/config/site"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { buildPageMetadata, buildServiceSchema, buildSoftwareApplicationSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "AI phone assistant for trades businesses",
  description: positioning.oneLiner,
  path: "/",
})

const handoffOutcomes = [
  "Callback request",
  "Booking request",
  "Urgent flag",
] as const

const handoffDeliveryChannels = [
  "Email summary",
  "Text alert",
  "Jobber or calendar workflow",
] as const

const nextStepRules = [
  "Within your service area",
  "Fits the kind of work you want booked",
  "Matches an available slot on the connected schedule",
] as const

const heroCallFlowMoments = [
  {
    speaker: "Caller",
    line: "Our AC is out and the house is getting hot. I need someone out here as soon as possible."
  },
  {
    speaker: "Assistant",
    line: "I am sorry. Is anyone at risk from the heat right now, and is the system running but blowing warm air?"
  },
  {
    speaker: "Caller",
    line: "It is blowing warm air. No one is in danger, but we have kids here and sooner is better."
  },
  {
    speaker: "Assistant",
    line: "I can book tomorrow 8 to 10 a.m. and flag this for owner review in case they can move you up today."
  }
] as const

const heroOperatorChecks = [
  "Probes a vague problem before choosing the service",
  "Books the next opening without ignoring urgency",
  "Flags possible same-day escalation for the owner",
] as const

const heroSetupProofPoints = [
  "15-minute basic setup target",
  "Setup review call before forwarding",
  "Month-to-month public plans",
] as const

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={buildServiceSchema({
          name: "BookedOnCall",
          description: positioning.oneLiner,
          path: "/",
        })}
      />
      <StructuredData data={buildSoftwareApplicationSchema()} />

      <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute inset-y-8 right-4 hidden w-[42%] max-w-[560px] lg:block xl:right-8" aria-hidden="true">
          <div className="grid h-full content-center gap-4 pl-8">
            <div className="grid gap-4 rounded-lg border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <div className="grid gap-1">
                  <p className="text-lg font-black text-white">Hot house, no-cool call</p>
                </div>
                <PhoneCall className="size-5 text-amber-300" />
              </div>
              <div className="grid gap-3 rounded-lg border border-white/10 bg-slate-950/45 p-3 text-sm leading-6 text-slate-200">
                {heroCallFlowMoments.map((moment, index) => (
                  <div
                    key={`${moment.speaker}-${index}`}
                    className={cn(
                      "max-w-[88%] rounded-2xl border px-4 py-3",
                      moment.speaker === "Assistant"
                        ? "border-white/10 bg-slate-900/90 text-slate-200"
                        : "justify-self-end border-amber-300/30 bg-amber-300/15 text-amber-50"
                    )}
                  >
                    <strong className="block text-xs uppercase tracking-[0.12em] text-slate-400">{moment.speaker}</strong>
                    {moment.line}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur">
              <div className="grid gap-2">
                {heroOperatorChecks.map((check) => (
                  <div key={check} className="flex items-start gap-2 rounded-lg border border-white/10 bg-slate-900/80 p-3 text-sm font-semibold leading-6 text-slate-200">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-2 rounded-lg border border-amber-300/30 bg-amber-300/15 p-4">
                <div className="flex items-center gap-2">
                  <MailCheck className="size-4 text-amber-200" />
                  <p className="text-sm font-black text-white">Shop-ready summary</p>
                </div>
                <p className="text-sm leading-6 text-amber-50">
                  No-cool diagnostic booked for tomorrow, 8 to 10 a.m. AC is blowing warm air, home is heating up, kids are present, no immediate danger reported, and same-day owner review is flagged.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-9 lg:min-h-[610px] lg:grid-cols-[0.54fr_0.46fr] lg:items-center">
          <div className="grid gap-7">
            <p className="w-fit max-w-full rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-center text-sm font-bold leading-6 text-amber-100">
              Trades call coverage that sounds like a trained front desk
            </p>
            <div className="grid gap-5">
              <h1 className="max-w-[600px] text-4xl font-black leading-[0.98] text-white sm:text-6xl">
                A phone assistant that sounds like it works for your shop.
              </h1>
              <p className="max-w-[580px] text-lg leading-8 text-slate-200 sm:text-xl">
                BookedOnCall answers with patience, asks the questions your team needs, books the call when your rules allow it, and leaves your shop with clean notes for follow-up.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <TrackedLink
                href={buildGetStartedHref(undefined, "website-home-hero")}
                eventName="signup_started"
                eventPayload={{ placement: "home_hero_primary" }}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-xl border-transparent bg-amber-500 px-6 text-white hover:bg-amber-400"
                )}
              >
                {primaryCtaLabel}
              </TrackedLink>
              <TrackedLink
                href="/demo-calls"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "home_hero_secondary", href: "/demo-calls" }}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-xl border-slate-600 bg-slate-900/50 px-6 text-white hover:bg-slate-900"
                )}
              >
                {positioning.secondaryCtaLabel}
              </TrackedLink>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroSetupProofPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm font-semibold text-slate-200">
                  <ShieldCheck className="size-4 shrink-0 text-amber-300" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {supportedTradeLinks.map((trade) => (
                <TrackedLink
                  key={trade.href}
                  href={trade.href}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "home_hero_trade_chip", trade: trade.label, href: trade.href }}
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-sm font-semibold text-slate-200 transition-colors hover:border-amber-300 hover:bg-amber-300/10 hover:text-white"
                >
                  {trade.label}
                </TrackedLink>
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-200">Handled like your front desk</span>
              <PhoneCall className="size-5 text-amber-200" />
            </div>
            <div className="grid gap-3 text-sm leading-6 text-slate-200">
              {heroCallFlowMoments.slice(0, 3).map((moment, index) => (
                <p key={`${moment.speaker}-${index}`}>
                  <strong>{moment.speaker}:</strong> &ldquo;{moment.line}&rdquo;
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 text-center text-sm font-semibold text-white sm:grid-cols-2 lg:grid-cols-4">
          <p className="flex items-center justify-center gap-2">
            <PhoneCall className="size-4 text-amber-300" />
            Gives callers a better first response
          </p>
          <p className="flex items-center justify-center gap-2">
            <CalendarClock className="size-4 text-amber-300" />
            Review the call flow before you go live
          </p>
          <p className="flex items-center justify-center gap-2">
            <ShieldCheck className="size-4 text-amber-300" />
            Booking when your setup allows it
          </p>
          <p className="flex items-center justify-center gap-2">
            <ArrowRight className="size-4 text-amber-300" />
            Keep your number flow with scheduling and messaging tools when connected
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">How it works</p>
            <h2 className="text-4xl font-black text-slate-950">Answer, qualify, then move to the right next step.</h2>
            <p className="text-lg leading-8 text-slate-600">
              BookedOnCall isn&apos;t trying to sound clever. It&apos;s trying to give your business a better first response and you a clearer next step.
            </p>
            <TrackedLink
              href="/product"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "home_product", href: "/product" }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 transition hover:border-amber-300 hover:bg-amber-100"
            >
              See the product page
              <ArrowRight className="size-4" />
            </TrackedLink>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {productFlowSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
                  <span>Step {index + 1}</span>
                  <ArrowRight className="size-4" />
                </div>
                <h3 className="mb-3 text-2xl font-black text-slate-950">{step.title}</h3>
                <p className="text-base leading-7 text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="grid gap-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Setup path</p>
              <h2 className="text-4xl font-black">Basic setup should feel like setting up an answering service.</h2>
            </div>
            <p className="text-lg leading-8 text-slate-300">
              Start with a short, practical setup: what you do, where you work, when calls should be handled, how appointment requests should be reviewed, and how you want normal calls handled.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {basicSetupSteps.map((step, index) => (
              <article key={step.title} className="grid min-h-[190px] gap-4 rounded-lg border border-slate-700 bg-slate-900 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-amber-300 bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                    {index + 1}
                  </span>
                  {index === 0 ? <ClipboardList className="size-5 text-amber-300" /> : null}
                  {index === 1 ? <ShieldCheck className="size-5 text-amber-300" /> : null}
                  {index === 2 ? <CalendarClock className="size-5 text-amber-300" /> : null}
                  {index === 3 ? <PhoneCall className="size-5 text-amber-300" /> : null}
                </div>
                <div className="grid gap-2">
                  <h3 className="text-xl font-black">{step.title}</h3>
                  <p className="text-sm leading-6 text-slate-300">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
          <TrackedLink
            href={buildGetStartedHref(undefined, "website-home-setup-path")}
            eventName="signup_started"
            eventPayload={{ placement: "home_setup_path" }}
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-fit justify-center rounded-xl border-transparent bg-amber-500 px-6 text-white hover:bg-amber-400"
            )}
          >
            Start the basic setup path
          </TrackedLink>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">After the call</p>
            <h2 className="mb-4 text-4xl font-black text-slate-950">You get something usable, not just a message.</h2>
            <p className="mb-6 text-lg leading-8 text-slate-600">
              The point isn&apos;t just that a call was answered. The point is that you get enough context to do something useful next.
            </p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Example summary</p>
              <div className="grid gap-2 text-sm leading-7 text-slate-700">
                <p>
                  <strong>Caller:</strong> Caller name captured
                </p>
                <p>
                  <strong>Callback:</strong> Verified callback number
                </p>
                <p>
                  <strong>Address:</strong> Service area checked
                </p>
                <p>
                  <strong>Issue:</strong> AC blowing warm air
                </p>
                <p>
                  <strong>Next step:</strong> Follow up for supported booking or callback
                </p>
              </div>
            </div>
          </article>

          <div className="grid h-full content-start gap-3">
            <div className="grid content-start gap-3 md:grid-cols-3">
              {afterCallArtifacts.map((artifact, index) => (
                <article
                  key={artifact.title}
                  className={`flex h-full min-h-[112px] flex-col rounded-lg border p-4 shadow-sm ${index === 1 ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}
                >
                  <div className="mb-2 flex items-center gap-2.5">
                    {index === 0 ? <ClipboardList className="size-4 text-amber-600" /> : null}
                    {index === 1 ? <CalendarClock className="size-4 text-amber-600" /> : null}
                    {index === 2 ? <ShieldCheck className="size-4 text-amber-600" /> : null}
                    <h3 className="text-base font-black text-slate-950">{artifact.title}</h3>
                  </div>
                  <p className="text-[13px] leading-5 text-slate-700">{artifact.body}</p>
                </article>
              ))}
            </div>

            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">What decides the next step</p>
              <p className="mb-4 text-sm leading-6 text-slate-600">
                BookedOnCall does not force every caller into a booking. It checks a few practical rules first.
              </p>
              <div className="grid gap-2 md:grid-cols-3">
                {nextStepRules.map((rule) => (
                  <div
                    key={rule}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    {rule}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-slate-900 bg-slate-950 p-5 text-white shadow-sm">
              <div className="grid gap-5">
                <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                  <div className="grid gap-2">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">How it gets back to you</p>
                    <p className="max-w-lg text-sm leading-6 text-slate-300">
                      The result can come back as a clear callback request, a booking path, or an urgent follow-up with enough context to act fast.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {handoffDeliveryChannels.map((channel) => (
                      <span
                        key={channel}
                        className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-200"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {handoffOutcomes.map((outcome, index) => (
                    <div
                      key={outcome}
                      className={`rounded-lg border px-4 py-3 ${index === 1 ? "border-amber-300 bg-amber-50 text-slate-950" : "border-slate-700 bg-slate-900 text-white"}`}
                    >
                      <div className="flex items-center gap-2">
                        {index === 0 ? <ClipboardList className="size-4 text-amber-300" /> : null}
                        {index === 1 ? <CalendarClock className={`size-4 ${index === 1 ? "text-amber-700" : "text-amber-300"}`} /> : null}
                        {index === 2 ? <ShieldCheck className="size-4 text-amber-300" /> : null}
                        <span className={`text-sm font-black ${index === 1 ? "text-slate-950" : "text-white"}`}>{outcome}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="grid gap-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Why shops trust it</p>
              <h2 className="text-4xl font-black text-slate-950">Built for field reality, not call-center theory.</h2>
              <p className="text-lg leading-8 text-slate-600">
                BookedOnCall exists because good trades businesses lose real work when the phone rings at the wrong moment. The product is built around that reality.
              </p>
              <TrackedLink
                href="/about"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "home_about", href: "/about" }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 transition hover:border-amber-300 hover:bg-amber-50"
              >
                Read the founder story
                <ArrowRight className="size-4" />
              </TrackedLink>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {homepageTrustPoints.map((item, index) => (
                <article
                  key={item.title}
                  className={cn(
                    "h-full rounded-lg border p-6 shadow-sm",
                    index === 1 ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"
                  )}
                >
                  <h3 className="mb-3 text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="text-base leading-7 text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Outside numbers</p>
            <h2 className="text-4xl font-black text-slate-950">A few outside numbers worth knowing.</h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
              These references add context around voicemail drop-off, phone-lead conversion, and staffing cost as you compare different ways to handle inbound calls.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {sourcedProof.map((item) => (
              <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mb-4 text-sm leading-6 text-slate-700">{item.detail}</p>
                <TrackedLink
                  href={item.sourceUrl}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "home_source", href: item.sourceUrl }}
                  className="text-sm font-bold text-amber-700 underline decoration-amber-300 underline-offset-4"
                >
                  Source: {item.sourceLabel}
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Industries</p>
            <h2 className="text-4xl font-black text-slate-950">Built for the trades that live on inbound calls.</h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
              Plumbing, HVAC, electrical, painting, flooring, landscaping, roofing, and general home-service businesses all have different call patterns. The first-response problem is the same.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {useCaseOrder.map((key) => {
              const useCase = useCasePages[key]
              return (
                <TrackedLink
                  key={useCase.path}
                  href={useCase.path}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "home_use_case", path: useCase.path }}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-left transition-colors hover:border-amber-300 hover:bg-amber-50/40"
                >
                  <div className="grid gap-2">
                    <h3 className="text-xl font-black text-slate-950">{useCase.label}</h3>
                    <p className="text-sm leading-6 text-slate-600">{useCase.cardSummary}</p>
                    <span className="pt-2 text-sm font-bold text-amber-700">See this trade</span>
                  </div>
                </TrackedLink>
              )
            })}
          </div>
          <div className="flex justify-center">
            <TrackedLink
              href="/industries"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "home_industries", href: "/industries" }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              Browse all industries
              <ArrowRight className="size-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Integrations</p>
            <h2 className="text-4xl font-black text-slate-950">Fits the tools you already use.</h2>
            <p className="text-lg leading-8 text-slate-600">
              BookedOnCall is built to fit how your shop already works. That includes Jobber, Google Calendar, email summaries, and customer Text / SMS follow-up after those tools are set up for your business. QuickBooks, Housecall Pro, and ServiceTitan are planned possible future integrations.
            </p>
            </div>
            <TrackedLink
              href="/integrations"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "home_integrations_hub", href: "/integrations" }}
              className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 transition hover:border-amber-300 hover:bg-amber-50 lg:self-end"
            >
              See all integrations
              <ArrowRight className="size-4" />
            </TrackedLink>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {integrations.map((integration) => (
              <TrackedLink
                key={integration.id}
                href={`/integrations/${integration.id}`}
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "home_integrations", integration: integration.id }}
                className={`flex min-h-[220px] flex-col justify-between rounded-lg border p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40 ${integration.status === "coming_soon" ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}
              >
                <div className="grid gap-3">
                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${integration.status === "coming_soon" ? "border border-amber-300 bg-white text-amber-800" : "border border-emerald-200 bg-emerald-50 text-emerald-800"}`}
                  >
                    {getIntegrationBadgeLabel(integration)}
                  </span>
                  <div className="text-2xl font-black text-slate-950">{integration.name}</div>
                  <p className="text-base leading-7 text-slate-600">{integration.description}</p>
                </div>
                <span className="text-sm font-bold text-amber-700">
                  {getIntegrationActionLabel(integration)}
                </span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Resources</p>
            <h2 className="text-4xl font-black text-slate-950">See how it sounds, then compare your options.</h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
              Hear the caller experience first, then compare the practical buying choices: voicemail, answering services, pricing, and setup.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {resourceHighlights.map((resource) => (
              <TrackedLink
                key={resource.href}
                href={resource.href}
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "home_resources", href: resource.href }}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
              >
                <h3 className="mb-3 text-[1.35rem] font-black leading-tight text-slate-950">{resource.title}</h3>
                <p className="text-base leading-7 text-slate-600">{resource.description}</p>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Pricing</p>
            <h2 className="text-4xl font-black text-slate-950">Straightforward monthly pricing.</h2>
            <p className="text-lg leading-8 text-slate-600">
              {selfServeCheckoutEnabled
                ? "Start with the plan that looks closest. Then continue through secure checkout and app setup at your own pace."
                : "Start with the plan that fits your call volume. Then we help set the right call flow before anything goes live."}
            </p>
          </div>
          <div className="grid gap-4">
            {plans.map((plan) => (
              <article key={plan.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-slate-950">{plan.name}</h3>
                  <strong className="text-2xl text-slate-950">${plan.monthlyUsd}/mo</strong>
                </div>
                <p className="mb-4 text-sm leading-7 text-slate-600">{plan.summary}</p>
                <p className="mb-4 text-sm font-semibold text-slate-700">
                  {plan.includedMinutes} included minutes, then ${plan.overageMinuteUsd.toFixed(2)}/minute.
                </p>
                <ul className="mb-5 grid gap-2 text-sm leading-6 text-slate-600">
                  {plan.features.slice(1, 4).map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  href={buildGetStartedHref(plan.id, "website-home-plan")}
                  eventName="pricing_plan_selected"
                  eventPayload={{ placement: "home_plan", planId: plan.id }}
                  className="text-sm font-bold text-amber-700 underline decoration-amber-300 underline-offset-4"
                >
                  {selfServeCheckoutEnabled ? `Start with ${plan.name}` : `Request ${plan.name} setup`}
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">FAQ</p>
            <h2 className="text-4xl font-black text-slate-950">Straight answers to the main buying questions.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqEntries.slice(0, 4).map((entry) => (
              <article key={entry.question} className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-black text-slate-950">{entry.question}</h3>
                <p className="text-sm leading-7 text-slate-600">{entry.answer}</p>
              </article>
            ))}
          </div>
          <div className="flex justify-center">
            <TrackedLink
              href="/faq"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "home_faq", href: "/faq" }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              Read the full FAQ
              <ArrowRight className="size-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to see if BookedOnCall fits your business?"
        body="Read example calls, review the pages that match your trade, and start setup when you're ready."
      />
    </>
  )
}

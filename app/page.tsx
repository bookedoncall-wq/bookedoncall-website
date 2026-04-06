import { ArrowRight, CalendarClock, ClipboardList, PhoneCall, ShieldCheck } from "lucide-react"
import { CtaBand } from "@/components/marketing/CtaBand"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { afterCallArtifacts, faqEntries, homepageTrustPoints, productFlowSteps, resourceHighlights, useCaseOrder, useCasePages } from "@/config/marketing"
import { buildGetStartedHref, integrations, plans, positioning, primaryCtaLabel, selfServeCheckoutEnabled, sourcedProof, supportedTrades } from "@/config/site"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { buildPageMetadata, buildServiceSchema } from "@/lib/seo"

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

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="grid gap-7">
            <p className="w-fit rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-800">
              Built for trades businesses that want a better first response
            </p>
            <div className="grid gap-5">
              <h1 className="max-w-4xl text-5xl font-black leading-[0.96] text-slate-950 sm:text-6xl">
                Answer more calls. Win more of the work your shop should get.
              </h1>
              <p className="max-w-3xl text-xl leading-8 text-slate-600">{positioning.oneLiner}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <TrackedLink
                href={buildGetStartedHref(undefined, "website-home-hero")}
                eventName="signup_started"
                eventPayload={{ placement: "home_hero_primary" }}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-xl border-transparent bg-slate-950 px-6 text-white hover:bg-slate-800"
                )}
              >
                {primaryCtaLabel}
              </TrackedLink>
              <TrackedLink
                href="/examples"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "home_hero_secondary", href: "/examples" }}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-xl border-slate-300 px-6 text-slate-950 hover:bg-white"
                )}
              >
                {positioning.secondaryCtaLabel}
              </TrackedLink>
            </div>
            <div className="flex flex-wrap gap-2">
              {supportedTrades.map((trade) => (
                <span
                  key={trade}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600"
                >
                  {trade}
                </span>
              ))}
            </div>
          </div>

          <aside className="grid gap-4 rounded-[2rem] border border-amber-100 bg-white p-6 shadow-[0_28px_60px_rgba(15,23,42,0.08)]">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Example call</span>
                <PhoneCall className="size-5 text-amber-300" />
              </div>
              <div className="grid gap-3 text-sm leading-6 text-slate-200">
                <p>
                  <strong>Caller:</strong> &ldquo;My AC stopped working. Can someone come out this week?&rdquo;
                </p>
                <p>
                  <strong>Assistant:</strong> &ldquo;I can help with that. What&apos;s the best callback number and service address?&rdquo;
                </p>
                <p>
                  <strong>Caller:</strong> &ldquo;720-555-0142. We&apos;re in Littleton.&rdquo;
                </p>
                <p>
                  <strong>Assistant:</strong> &ldquo;Thanks. Is the system blowing air that isn&apos;t cold, or not turning on at all?&rdquo;
                </p>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <ClipboardList className="size-5 text-amber-500" />
                <strong className="text-slate-950">What you get back</strong>
              </div>
              <ul className="grid gap-2 text-sm leading-6 text-slate-600">
                <li>Caller details and service address</li>
                <li>Job summary with the likely next step</li>
                <li>A supported booking path or a clear callback handoff</li>
              </ul>
            </div>
          </aside>
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
            Private test call before you go live
          </p>
          <p className="flex items-center justify-center gap-2">
            <ShieldCheck className="size-4 text-amber-300" />
            Booking when your setup allows it
          </p>
          <p className="flex items-center justify-center gap-2">
            <ArrowRight className="size-4 text-amber-300" />
            Keep your number flow with Jobber or Google Calendar when connected
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
              <article key={step.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
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

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[2rem] border border-white bg-white p-7 shadow-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">After the call</p>
            <h2 className="mb-4 text-4xl font-black text-slate-950">You get something usable, not just a message.</h2>
            <p className="mb-6 text-lg leading-8 text-slate-600">
              The point isn&apos;t just that a call was answered. The point is that you get enough context to do something useful next.
            </p>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Example summary</p>
              <div className="grid gap-2 text-sm leading-7 text-slate-700">
                <p>
                  <strong>Caller:</strong> Sarah M.
                </p>
                <p>
                  <strong>Callback:</strong> 720-555-0142
                </p>
                <p>
                  <strong>Address:</strong> Littleton
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
                  className={`flex h-full min-h-[112px] flex-col rounded-[1.25rem] border p-4 shadow-sm ${index === 1 ? "border-amber-200 bg-amber-50" : "border-white bg-white"}`}
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

            <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">What decides the next step</p>
              <p className="mb-4 text-sm leading-6 text-slate-600">
                BookedOnCall does not force every caller into a booking. It checks a few practical rules first.
              </p>
              <div className="grid gap-2 md:grid-cols-3">
                {nextStepRules.map((rule) => (
                  <div
                    key={rule}
                    className="rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    {rule}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-slate-900 bg-slate-950 p-5 text-white shadow-sm">
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
                      className={`rounded-[1.1rem] border px-4 py-3 ${index === 1 ? "border-amber-300 bg-amber-50 text-slate-950" : "border-slate-700 bg-slate-900 text-white"}`}
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
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:p-10">
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
                    "h-full rounded-[1.5rem] border p-6 shadow-sm",
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
              These references help show why response time, follow-up speed, and staffing cost matter when you decide how to handle incoming calls.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {sourcedProof.map((item) => (
              <article key={item.id} className="rounded-[1.5rem] border border-white bg-white p-5 shadow-sm">
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
              Plumbing, HVAC, electrical, painting, flooring, landscaping, and general home-service businesses all have different call patterns. The first-response problem is the same.
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
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-left transition-colors hover:border-amber-300 hover:bg-amber-50/40"
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
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.76fr_1.24fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Integrations</p>
            <h2 className="text-4xl font-black text-slate-950">Fits the tools you already use.</h2>
            <p className="text-lg leading-8 text-slate-600">
              BookedOnCall is built to fit your current scheduling workflow. Today that means supported setups with Jobber and Google Calendar.
            </p>
            <TrackedLink
              href="/integrations"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "home_integrations_hub", href: "/integrations" }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 transition hover:border-amber-300 hover:bg-amber-50"
            >
              See all integrations
              <ArrowRight className="size-4" />
            </TrackedLink>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration, index) => (
              <TrackedLink
                key={integration.id}
                href={`/integrations/${integration.id}`}
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "home_integrations", integration: integration.id }}
                className={`flex min-h-[220px] flex-col justify-between rounded-[1.75rem] border p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40 ${index === 0 ? "border-white bg-white" : "border-amber-200 bg-amber-50"}`}
              >
                <div className="grid gap-3">
                  <div className="text-2xl font-black text-slate-950">{integration.name}</div>
                  <p className="text-base leading-7 text-slate-600">{integration.description}</p>
                </div>
                <span className="text-sm font-bold text-amber-700">See integration details</span>
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
              Hear example calls, compare BookedOnCall with voicemail and answering services, and review pricing and integrations when you&apos;re ready.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {resourceHighlights.map((resource, index) => (
              <TrackedLink
                key={resource.href}
                href={resource.href}
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "home_resources", href: resource.href }}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
              >
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Step {index + 1}</p>
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
              <article key={plan.id} className="rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-slate-950">{plan.name}</h3>
                  <strong className="text-2xl text-slate-950">${plan.monthlyUsd}/mo</strong>
                </div>
                <p className="mb-4 text-sm leading-7 text-slate-600">{plan.summary}</p>
                <p className="mb-4 text-sm font-semibold text-slate-700">
                  {plan.includedMinutes} included minutes, then ${plan.overageMinuteUsd.toFixed(2)}/minute.
                </p>
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
              <article key={entry.question} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
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

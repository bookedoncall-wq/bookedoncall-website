import { ArrowRight, CalendarClock, ClipboardList, PhoneCall, ShieldCheck, Wrench } from "lucide-react"
import { CtaBand } from "@/components/marketing/CtaBand"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildAppStartHref, integrations, plans, siteConfig, supportedTrades, validatedCapabilities } from "@/config/site"
import { homepageHighlights, workflowSteps } from "@/config/marketing"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { buildPageMetadata, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "AI call answering for trades businesses",
  description:
    "BookedOnCall answers inbound calls for trades businesses, captures qualified leads, checks configured availability, and routes work into the owner dashboard.",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={buildServiceSchema({
          name: "BookedOnCall marketing site",
          description: siteConfig.description,
          path: "/",
        })}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="grid gap-7">
            <p className="w-fit rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-800">
              Honest AI call answering for home-service operators
            </p>
            <div className="grid gap-5">
              <h1 className="max-w-4xl text-5xl font-black leading-[0.96] text-slate-950 sm:text-6xl">
                Catch more inbound demand without turning your website into a fake product promise.
              </h1>
              <p className="max-w-3xl text-xl leading-8 text-slate-600">
                BookedOnCall answers calls for trades businesses, captures the intake data you actually need, and books or routes follow-up based on the business configuration inside the app.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <TrackedLink
                href={buildAppStartHref(undefined, "website-home-hero")}
                eventName="checkout_started"
                eventPayload={{ placement: "home_hero_primary" }}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-xl border-transparent bg-slate-950 px-6 text-white hover:bg-slate-800"
                )}
              >
                Start in app
              </TrackedLink>
              <TrackedLink
                href="/how-it-works"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "home_hero_secondary", href: "/how-it-works" }}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-xl border-slate-300 px-6 text-slate-950 hover:bg-white"
                )}
              >
                See the workflow
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
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Call flow snapshot</span>
                <PhoneCall className="size-5 text-amber-300" />
              </div>
              <div className="grid gap-3 text-sm leading-6 text-slate-200">
                <p>
                  <strong>Caller:</strong> &ldquo;My AC stopped working and I need someone this week.&rdquo;
                </p>
                <p>
                  <strong>Assistant:</strong> captures the issue, confirms location, and checks the configured scheduling path.
                </p>
                <p>
                  <strong>Outcome:</strong> book a supported slot or log a callback if the request needs manual review.
                </p>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <ClipboardList className="size-5 text-amber-500" />
                <strong className="text-slate-950">What the owner gets</strong>
              </div>
              <ul className="grid gap-2 text-sm leading-6 text-slate-600">
                <li>Structured call summary in the owner dashboard</li>
                <li>Booking result or callback outcome tied to the business workflow</li>
                <li>Integration status surfaced on the app side, not guessed from marketing copy</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 text-center text-sm font-semibold text-white sm:grid-cols-3">
          <p className="flex items-center justify-center gap-2">
            <PhoneCall className="size-4 text-amber-300" />
            Inbound call coverage while crews are on site
          </p>
          <p className="flex items-center justify-center gap-2">
            <CalendarClock className="size-4 text-amber-300" />
            Scheduling only when the business has enabled it
          </p>
          <p className="flex items-center justify-center gap-2">
            <ShieldCheck className="size-4 text-amber-300" />
            One app-side source of truth for billing and onboarding
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
          {homepageHighlights.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">{item.title}</h2>
              <p className="text-base leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">How the product actually works</p>
            <h2 className="text-4xl font-black text-slate-950">A straight line from website promise to app behavior.</h2>
            <p className="text-lg leading-8 text-slate-600">
              The marketing site only describes flows the app can own: answer the call, qualify the request, check configured availability, and hand the result into the owner dashboard.
            </p>
          </div>
          <div className="grid gap-4">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="grid gap-3 rounded-[1.5rem] border border-white bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
                  <span>Step {index + 1}</span>
                  <ArrowRight className="size-4" />
                </div>
                <h3 className="text-2xl font-black text-slate-950">{step.title}</h3>
                <p className="text-base leading-7 text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Validated public capabilities</p>
            <h2 className="text-4xl font-black text-slate-950">What the public site can say without hedging.</h2>
            <p className="text-lg leading-8 text-slate-600">
              These are the app-backed behaviors this site is willing to claim plainly.
            </p>
          </div>
          <div className="grid gap-3">
            {validatedCapabilities.map((capability) => (
              <div key={capability} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Wrench className="mt-1 size-5 shrink-0 text-amber-500" />
                <p className="text-sm leading-7 text-slate-700">{capability}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Supported integrations</p>
            <h2 className="text-4xl font-black text-slate-950">Connected systems remain business-controlled.</h2>
            <p className="text-lg leading-8 text-slate-600">
              Integrations live in the owner dashboard. This site only promises the connected behavior the app can actually verify.
            </p>
            <div className="flex flex-wrap gap-3">
              {integrations.map((integration) => (
                <TrackedLink
                  key={integration.id}
                  href={`/integrations/${integration.id}`}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "home_integrations", integration: integration.id }}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-amber-300 hover:text-slate-950"
                >
                  {integration.name}
                </TrackedLink>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Public pricing</p>
            <h2 className="text-4xl font-black text-slate-950">Simple monthly plans tied to the app, not the landing page.</h2>
            <div className="grid gap-4">
              {plans.map((plan) => (
                <article key={plan.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-black text-slate-950">{plan.name}</h3>
                    <strong className="text-2xl text-slate-950">${plan.monthlyUsd}/mo</strong>
                  </div>
                  <p className="mb-4 text-sm leading-7 text-slate-600">{plan.summary}</p>
                  <p className="mb-4 text-sm font-semibold text-slate-700">
                    {plan.includedMinutes} included minutes, then ${plan.overageMinuteUsd.toFixed(2)}/minute.
                  </p>
                  <TrackedLink
                    href={buildAppStartHref(plan.id, "website-home-plan")}
                    eventName="pricing_plan_selected"
                    eventPayload={{ placement: "home_plan", planId: plan.id }}
                    className="text-sm font-bold text-amber-700 underline decoration-amber-300 underline-offset-4"
                  >
                    Start {plan.name.toLowerCase()} in app
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want the full details before you buy?"
        body="Review features, pricing, integrations, and FAQs first, then start checkout on the app domain when the flow matches how your business actually works."
      />
    </>
  )
}

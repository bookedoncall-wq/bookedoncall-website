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
    "BookedOnCall answers inbound calls for trades businesses, captures job details, checks configured availability, and helps your team book appointments or route callbacks.",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={buildServiceSchema({
          name: "BookedOnCall",
          description: siteConfig.description,
          path: "/",
        })}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="grid gap-7">
            <p className="w-fit rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-800">
              AI call answering for trades businesses
            </p>
            <div className="grid gap-5">
              <h1 className="max-w-4xl text-5xl font-black leading-[0.96] text-slate-950 sm:text-6xl">
                Answer more calls while your team is in the field.
              </h1>
              <p className="max-w-3xl text-xl leading-8 text-slate-600">
                BookedOnCall answers calls for trades businesses, captures the job details you need, and books appointments or routes callbacks based on your setup.
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
                Get started
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
                <strong className="text-slate-950">What you get after the call</strong>
              </div>
              <ul className="grid gap-2 text-sm leading-6 text-slate-600">
                <li>Structured call summary in your dashboard</li>
                <li>Booking result or callback outcome tied to your workflow</li>
                <li>Clear visibility into follow-up and connected integrations</li>
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
            One place for setup, billing, and follow-up
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">How it works</p>
            <h2 className="text-4xl font-black text-slate-950">From first ring to booked job or callback.</h2>
            <p className="text-lg leading-8 text-slate-600">
              BookedOnCall answers the call, qualifies the request, checks availability when scheduling is enabled, and either books a supported slot or captures a clean callback for your team.
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">What BookedOnCall handles</p>
            <h2 className="text-4xl font-black text-slate-950">Built for the calls trades businesses get every day.</h2>
            <p className="text-lg leading-8 text-slate-600">
              These are the core jobs BookedOnCall is built to handle.
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
              BookedOnCall supports Jobber and Google Calendar for businesses that choose those scheduling paths.
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Pricing</p>
            <h2 className="text-4xl font-black text-slate-950">Simple monthly pricing.</h2>
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
                    Choose {plan.name}
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want the full details before you buy?"
        body="Review features, pricing, integrations, and FAQs, then get started when you're ready to set up your call flow."
      />
    </>
  )
}

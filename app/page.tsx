import { ArrowRight, CalendarClock, ClipboardList, PhoneCall, ShieldCheck, Wrench } from "lucide-react"
import { ComingSoonProof } from "@/components/marketing/ComingSoonProof"
import { CtaBand } from "@/components/marketing/CtaBand"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildGetStartedHref, integrations, plans, siteConfig, supportedTrades, validatedCapabilities } from "@/config/site"
import { homepageHighlights, homepageTrustPoints, useCaseOrder, useCasePages, workflowSteps } from "@/config/marketing"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { buildPageMetadata, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "AI call answering for trades businesses",
  description:
    "BookedOnCall answers missed calls for trades businesses, captures the customer details your team needs, and helps book jobs or capture callbacks.",
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
                Miss fewer calls. Book more work.
              </h1>
              <p className="max-w-3xl text-xl leading-8 text-slate-600">
                When the phone rings while your team is on a job, BookedOnCall answers, gets the details, and helps move the customer toward a booking or a callback.
              </p>
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
                See plans
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
                See how it works
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
                  <strong>Assistant:</strong> gets the problem, callback details, and address, then checks the next available path.
                </p>
                <p>
                  <strong>Outcome:</strong> book the job when it fits your setup, or send a clean callback to your team.
                </p>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <ClipboardList className="size-5 text-amber-500" />
                <strong className="text-slate-950">After the call</strong>
              </div>
              <ul className="grid gap-2 text-sm leading-6 text-slate-600">
                <li>A clear summary your team can review fast</li>
                <li>A booked appointment or callback request</li>
                <li>Customer details and next steps in one place</li>
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
            Appointment booking when your rules and calendar allow it
          </p>
          <p className="flex items-center justify-center gap-2">
            <ShieldCheck className="size-4 text-amber-300" />
            Clean callback handoff when a person needs to step in
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
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Why people trust it</p>
            <h2 className="text-4xl font-black text-slate-950">Built for real trades businesses, not call-center theory.</h2>
            <p className="text-lg leading-8 text-slate-600">
              BookedOnCall exists because smaller trades teams lose real work when the phone rings at the wrong moment. The product is built around that reality.
            </p>
            <TrackedLink
              href="/about"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "home_about", href: "/about" }}
              className="w-fit text-sm font-bold text-amber-700 underline decoration-amber-300 underline-offset-4"
            >
              Read the founder story
            </TrackedLink>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {homepageTrustPoints.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-white bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-black text-slate-950">{item.title}</h3>
                <p className="text-base leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">How it works</p>
            <h2 className="text-4xl font-black text-slate-950">From first ring to booked job or clean callback.</h2>
            <p className="text-lg leading-8 text-slate-600">
              BookedOnCall answers the call, gets the basics, checks availability when it should, and hands off anything that still needs your team.
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
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">By trade</p>
            <h2 className="text-4xl font-black text-slate-950">Built for the kinds of businesses that live on the phone.</h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
              Plumbing, HVAC, electrical, painting, flooring, landscaping, and general home-service teams all have different calls coming in. The goal is the same: answer them faster and lose fewer jobs.
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
                    <span className="pt-2 text-sm font-bold text-amber-700">Read more</span>
                  </div>
                </TrackedLink>
              )
            })}
          </div>
        </div>
      </section>

      <ComingSoonProof
        title="More proof is on the way."
        description="We do not have public demos, customer proof, or trade-by-trade case studies ready yet, but the site now has a place for them as soon as they are ready to publish."
      />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">What BookedOnCall handles</p>
            <h2 className="text-4xl font-black text-slate-950">Built for the calls trades businesses get every day.</h2>
            <p className="text-lg leading-8 text-slate-600">
              These are the calls BookedOnCall is built to handle well.
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
            <h2 className="text-4xl font-black text-slate-950">Works with the tools your team already uses.</h2>
            <p className="text-lg leading-8 text-slate-600">
              Connect Jobber or Google Calendar so BookedOnCall fits the way your business already schedules work.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {integrations.map((integration) => (
                <TrackedLink
                  key={integration.id}
                  href={`/integrations/${integration.id}`}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "home_integrations", integration: integration.id }}
                  className="flex min-h-[168px] flex-col justify-between rounded-[1.5rem] border border-slate-200 bg-white p-5 text-left transition-colors hover:border-amber-300 hover:bg-amber-50/40"
                >
                  <div className="grid gap-2">
                    <div className="text-base font-black text-slate-950">{integration.name}</div>
                    <p className="text-sm leading-6 text-slate-600">{integration.description}</p>
                  </div>
                  <span className="text-sm font-bold text-amber-700">See integration details</span>
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
                    href={buildGetStartedHref(plan.id, "website-home-plan")}
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
        title="Want to see if it fits your business?"
        body="Review the plans, see how it works, and reach out when you want to talk through your call flow."
      />
    </>
  )
}

import { Suspense } from "react"
import { CalendarClock, CheckCircle2, PhoneCall, ShieldCheck } from "lucide-react"
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm"
import { PageIntro } from "@/components/marketing/PageIntro"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { basicSetupSteps, setupChecklistItems } from "@/config/marketing"
import { buildGetStartedHref, customerLoginPath, plans, selfServeCheckoutEnabled, siteConfig } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

export const metadata = buildPageMetadata({
  title: "Request setup",
  description:
    "Tell us about your shop, choose the plan you are considering, and we will follow up with the right BookedOnCall setup path.",
  path: "/sign-up",
})

const setupConfidenceItems = [
  {
    icon: CheckCircle2,
    title: "Simple starting point",
    body: "Pick the closest trade, plan, and call path. Advanced wording can wait until after the first review.",
  },
  {
    icon: CalendarClock,
    title: "Appointments when you want them",
    body: "Connect Google Calendar or Jobber, or start with review-first callbacks while scheduling rules are finalized.",
  },
  {
    icon: PhoneCall,
    title: "Keep your number flow",
    body: "Use missed-call or overflow forwarding so you can still answer when you are available.",
  },
  {
    icon: ShieldCheck,
    title: "Review before callers hear it",
    body: "Place a setup review call before callers are sent to BookedOnCall.",
  },
] as const

export default function SignUpPage() {
  return (
    <>
      <PageIntro
        eyebrow="Request setup"
        title="Start with the basic setup path."
        description="Share the essentials about your shop, choose the plan you are considering, and review the call flow before callers are sent to BookedOnCall. Existing customers should use customer login."
      />

      <section className="border-b border-slate-100 bg-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2 text-center text-sm text-slate-600">
          <span>Already a customer?</span>
          <TrackedLink
            href={customerLoginPath}
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "signup_existing_customer", href: customerLoginPath }}
            className="font-bold text-amber-700 underline decoration-amber-300 underline-offset-4"
          >
            Log in
          </TrackedLink>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-4">
          {setupConfidenceItems.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-amber-600" />
                  <h2 className="text-base font-black text-slate-950">{item.title}</h2>
                </div>
                <p className="text-sm leading-6 text-slate-600">{item.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            {selfServeCheckoutEnabled ? (
              <article className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-black text-slate-950">Start in the customer app</h2>
                <p className="text-base leading-7 text-slate-600">
                  New customers can start setup in the secure app. Existing customers should use customer login.
                </p>
                <TrackedLink
                  href={buildGetStartedHref(undefined, "website-sign-up-page")}
                  eventName="signup_started"
                  eventPayload={{ placement: "signup_self_serve_card" }}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "justify-center rounded-xl border-transparent bg-slate-950 px-6 text-white hover:bg-slate-800"
                  )}
                >
                  Start setup
                </TrackedLink>
              </article>
            ) : (
              <Suspense
                fallback={
                  <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-base leading-7 text-slate-600">Loading form...</p>
                  </div>
                }
              >
                <LeadCaptureForm />
              </Suspense>
            )}
          </div>

          <aside className="grid gap-4">
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">Have these ready</h2>
              <p className="text-base leading-7 text-slate-600">
                Basic setup is designed to stay focused. Advanced wording and edge cases can wait until after your first setup review call.
              </p>
              <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-600">
                {setupChecklistItems.map((item) => (
                  <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">What happens next</h2>
              <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                {basicSetupSteps.map((step) => (
                  <li key={step.title}>
                    <strong className="text-slate-950">{step.title}:</strong> {step.body}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">Want to hear it first?</h2>
              <p className="text-base leading-7 text-slate-600">
                Use the live web voice demo when it is available, or review example calls before setup so you know what callers hear and what your team gets back.
              </p>
              <div className="mt-5 grid gap-3">
                <TrackedLink
                  href="/demo-calls"
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "signup_demo", href: "/demo-calls" }}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-amber-300 hover:bg-amber-50/40"
                >
                  Try demo calls
                </TrackedLink>
                <TrackedLink
                  href="/product"
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "signup_product", href: "/product" }}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-amber-300 hover:bg-amber-50/40"
                >
                  See how the product works
                </TrackedLink>
              </div>
            </article>
          </aside>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.id} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-2">
                <h2 className="text-3xl font-black text-slate-950">{plan.name}</h2>
                <p className="text-base leading-7 text-slate-600">{plan.summary}</p>
              </div>
              <p className="text-sm font-semibold text-slate-700">
                ${plan.monthlyUsd}/month with {plan.includedMinutes} included minutes. Additional minutes are ${plan.overageMinuteUsd.toFixed(2)} each.
              </p>
              <TrackedLink
                href={buildGetStartedHref(plan.id, "website-start-page")}
                eventName="pricing_plan_selected"
                eventPayload={{ placement: "start_page_card", planId: plan.id }}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "justify-center rounded-xl border-transparent bg-slate-950 px-6 text-white hover:bg-slate-800"
                )}
              >
                Request {plan.name} setup
              </TrackedLink>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Prefer email?</h2>
          <p className="text-base leading-7 text-slate-600">
            If you would rather reach out directly, you can still contact us at {siteConfig.email}.
          </p>
        </div>
      </section>
    </>
  )
}

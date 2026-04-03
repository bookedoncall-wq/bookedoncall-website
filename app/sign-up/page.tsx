import { Suspense } from "react"
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm"
import { PageIntro } from "@/components/marketing/PageIntro"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildLeadFormHref, plans, siteConfig } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

export const metadata = buildPageMetadata({
  title: "Talk to us",
  description:
    "Send your details, hear how BookedOnCall works, and talk through the setup that fits your business.",
  path: "/sign-up",
})

export default function SignUpPage() {
  return (
    <>
      <PageIntro
        eyebrow="Talk to us"
        title="Tell us how your business handles calls today."
        description="Start with your details. We will help you decide whether Starter or Pro fits, how scheduling should work, and when BookedOnCall should book versus hand the call back as a clean callback."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            <Suspense
              fallback={
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-base leading-7 text-slate-600">Loading form...</p>
                </div>
              }
            >
              <LeadCaptureForm />
            </Suspense>
          </div>

          <aside className="grid gap-4">
            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">Before you decide</h2>
              <p className="text-base leading-7 text-slate-600">
                The fastest way to know whether BookedOnCall fits is reading sample calls and talking through how you want new jobs handled.
              </p>
              <div className="mt-5 grid gap-3">
                <TrackedLink
                  href="/demo-calls"
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "signup_demo", href: "/demo-calls" }}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-amber-300 hover:bg-amber-50/40"
                >
                  Read sample calls
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

            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">What we usually cover</h2>
              <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                <li>Which trade and call types matter most for your business</li>
                <li>Whether BookedOnCall should book jobs or route clean callbacks</li>
                <li>How Jobber or Google Calendar should fit into the call flow</li>
                <li>Whether Starter or Pro is the better fit for your business</li>
              </ul>
            </article>
          </aside>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.id} className="grid gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-2">
                <h2 className="text-3xl font-black text-slate-950">{plan.name}</h2>
                <p className="text-base leading-7 text-slate-600">{plan.summary}</p>
              </div>
              <p className="text-sm font-semibold text-slate-700">
                ${plan.monthlyUsd}/month with {plan.includedMinutes} included minutes. Additional minutes are ${plan.overageMinuteUsd.toFixed(2)} each.
              </p>
              <TrackedLink
                href={buildLeadFormHref(plan.id, "website-start-page")}
                eventName="pricing_plan_selected"
                eventPayload={{ placement: "start_page_card", planId: plan.id }}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "justify-center rounded-xl border-transparent bg-slate-950 px-6 text-white hover:bg-slate-800"
                )}
              >
                Talk to us about {plan.name}
              </TrackedLink>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Prefer email?</h2>
          <p className="text-base leading-7 text-slate-600">
            If you would rather reach out directly, you can still contact us at {siteConfig.email}.
          </p>
        </div>
      </section>
    </>
  )
}

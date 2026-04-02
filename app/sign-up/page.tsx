import { Suspense } from "react"
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm"
import { PageIntro } from "@/components/marketing/PageIntro"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildLeadFormHref, plans, siteConfig } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

export const metadata = buildPageMetadata({
  title: "Choose your plan",
  description:
    "Choose a BookedOnCall plan and send your details. Pro adds a more branded caller experience.",
  path: "/sign-up",
})

export default function SignUpPage() {
  return (
    <>
      <PageIntro
        eyebrow="Get started"
        title="Tell us about your business."
        description="Pick the plan that looks closest, then reach out. We will help you decide what fits, how scheduling should work, and how you want calls handled."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.id} className="grid gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-2">
                <h2 className="text-3xl font-black text-slate-950">{plan.name}</h2>
                <p className="text-base leading-7 text-slate-600">{plan.summary}</p>
              </div>
              <p className="text-sm font-semibold text-slate-700">
                ${plan.monthlyUsd}/month with {plan.includedMinutes} included minutes.
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
                Choose {plan.name}
              </TrackedLink>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
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

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Prefer email?</h2>
          <p className="text-base leading-7 text-slate-600">
            If you would rather reach out directly, you can still contact us at {siteConfig.email}.
          </p>
        </div>
      </section>
    </>
  )
}

import { Suspense } from "react"
import { redirect } from "next/navigation"
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm"
import { PageIntro } from "@/components/marketing/PageIntro"
import { TrackedLink } from "@/components/marketing/TrackedLink"
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

type SearchParams = Record<string, string | string[] | undefined>

function getFirstSearchParam(searchParams: SearchParams, key: string) {
  const value = searchParams[key]
  return Array.isArray(value) ? value[0] : value
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams
  if (selfServeCheckoutEnabled) {
    redirect(
      buildGetStartedHref(
        getFirstSearchParam(resolvedSearchParams, "plan"),
        getFirstSearchParam(resolvedSearchParams, "source") || "website-sign-up-page"
      )
    )
  }

  return (
    <>
      <PageIntro
        eyebrow="Request setup"
        title="Tell us about your shop and we’ll guide the right setup."
        description="Choose the plan you are considering, share your business details, and we will follow up with the right BookedOnCall path. Existing customers should use customer login."
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
              <h2 className="mb-3 text-2xl font-black text-slate-950">Before we provision your workspace</h2>
              <p className="text-base leading-7 text-slate-600">
                The fastest way to know whether BookedOnCall fits is to review the examples and tell us how you want new jobs handled before we send you into onboarding.
              </p>
              <div className="mt-5 grid gap-3">
                <TrackedLink
                  href="/examples"
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "signup_demo", href: "/examples" }}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-amber-300 hover:bg-amber-50/40"
                >
                  See example calls
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
              <h2 className="mb-3 text-2xl font-black text-slate-950">What happens next</h2>
              <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                <li>We confirm which trade and call types matter most for your business.</li>
                <li>We align on whether BookedOnCall should book jobs or route clean callbacks.</li>
                <li>We send the right app onboarding path once your workspace is ready.</li>
                <li>You run a private test call before any live number points at BookedOnCall.</li>
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

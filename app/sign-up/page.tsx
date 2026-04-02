import { PageIntro } from "@/components/marketing/PageIntro"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildAppStartHref, plans, siteConfig } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

export const metadata = buildPageMetadata({
  title: "Start your account",
  description:
    "Start BookedOnCall on the app domain, then create or sign in to your owner account during onboarding.",
  path: "/sign-up",
})

export default function SignUpPage() {
  return (
    <>
      <PageIntro
        eyebrow="Start in app"
        title="The app owns checkout and onboarding now."
        description="This page exists to point you at the canonical start flow. The marketing site no longer runs a separate checkout or alternate lead-capture path."
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
                href={buildAppStartHref(plan.id, "website-start-page")}
                eventName="pricing_plan_selected"
                eventPayload={{ placement: "start_page_card", planId: plan.id }}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "justify-center rounded-xl border-transparent bg-slate-950 px-6 text-white hover:bg-slate-800"
                )}
              >
                Start {plan.name.toLowerCase()} in app
              </TrackedLink>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Already have an owner account?</h2>
          <p className="text-base leading-7 text-slate-600">
            You can sign in directly on the app domain and continue from there.
          </p>
          <TrackedLink
            href={`${siteConfig.appUrl}/sign-in`}
            eventName="signup_started"
            eventPayload={{ placement: "start_page_signin" }}
            className="w-fit text-sm font-bold text-amber-700 underline decoration-amber-300 underline-offset-4"
          >
            Open app sign-in
          </TrackedLink>
        </div>
      </section>
    </>
  )
}

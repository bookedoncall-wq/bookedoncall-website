import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { faqEntries } from "@/config/marketing"
import { buildLeadFormHref, plans } from "@/config/site"
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata } from "@/lib/seo"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

export const metadata = buildPageMetadata({
  title: "Pricing",
  description:
    "BookedOnCall pricing for Starter and Pro plans, included minutes, and extra branding controls on Pro.",
  path: "/pricing",
})

export default function PricingPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <StructuredData data={buildFaqSchema(faqEntries)} />
      <PageIntro
        eyebrow="Pricing"
        title="Straightforward monthly pricing."
        description="Starter keeps things simple. Pro adds a more branded caller experience for teams that want more control over how the assistant sounds and introduces itself."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <article
              key={plan.id}
              className={cn(
                "grid gap-5 rounded-[1.75rem] border bg-white p-7 shadow-sm",
                index === 1 ? "border-amber-300 shadow-[0_20px_40px_rgba(245,158,11,0.12)]" : "border-slate-200"
              )}
            >
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-3xl font-black text-slate-950">{plan.name}</h2>
                  {index === 1 ? (
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p className="text-base leading-7 text-slate-600">{plan.summary}</p>
              </div>

              <div className="flex items-end gap-2">
                <strong className="text-5xl font-black text-slate-950">${plan.monthlyUsd}</strong>
                <span className="pb-2 text-slate-500">/ month</span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {plan.includedMinutes} included minutes, then ${plan.overageMinuteUsd.toFixed(2)}/minute.
              </div>

              <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <TrackedLink
                href={buildLeadFormHref(plan.id, "website-pricing")}
                eventName="pricing_plan_selected"
                eventPayload={{ placement: "pricing_card", planId: plan.id }}
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
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Who Starter fits best</h2>
            <div className="grid gap-4 text-sm leading-7 text-slate-600">
              <div>
                <p>Starter is built for shops that want missed-call coverage, clear callbacks, and a simple setup without a lot of extra decisions.</p>
              </div>
              <div>
                <p>It is a strong fit for owner-operators, family-run businesses, and growing teams that want to stop losing leads to voicemail.</p>
              </div>
            </div>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Why teams choose Pro</h2>
            <div className="grid gap-4 text-sm leading-7 text-slate-600">
              <div>
                <p>Pro is for teams that want a more branded caller experience, more included minutes, and more control over how the assistant sounds.</p>
              </div>
              <div>
                <p>You can choose the voice callers hear, give the assistant a custom name, and shape the greeting and behavior so it feels more like your business.</p>
              </div>
            </div>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-3xl font-black text-slate-950">How setup works</h2>
            <ul className="grid gap-3 text-sm leading-7 text-slate-600">
              <li>Choose the plan that fits your business.</li>
              <li>Tell us how you want BookedOnCall to handle your calls.</li>
              <li>Connect your calendar if you want BookedOnCall to offer appointment times.</li>
              <li>Extra minutes are billed at the published per-minute rate for your plan.</li>
            </ul>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Why people trust it</h2>
            <div className="grid gap-4 text-sm leading-7 text-slate-600">
              <p>BookedOnCall was built around a simple problem: too many good trades businesses lose work because nobody can answer the phone while the crew is on a job.</p>
              <p>That is why the product is focused on the basics that matter most: answering more calls, capturing clean details, and helping your team move faster on real work.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <article className="rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Questions people usually ask before buying</h2>
            <div className="grid gap-4">
              {faqEntries.map((entry) => (
                <div key={entry.question}>
                  <h3 className="text-lg font-black text-slate-950">{entry.question}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{entry.answer}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CtaBand
        title="Ready to get started?"
        body="Choose the plan that looks right and we will help you get BookedOnCall set up for your business."
      />
    </>
  )
}

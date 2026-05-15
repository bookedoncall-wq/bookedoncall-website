import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrationPages } from "@/config/marketing"
import { buildLeadFormHref } from "@/config/site"
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo"

const content = integrationPages.servicetitan
const reviewHref = buildLeadFormHref(undefined, "servicetitan-integration-review")

const reviewSteps = [
  {
    title: "Start with workflow fit",
    body: "Tell us how your office uses ServiceTitan today: job types, CSR rules, booking handoffs, capacity limits, and what needs review before a caller gets a time."
  },
  {
    title: "Map CSR rules first",
    body: "Most ServiceTitan shops start with CSR-reviewed booking intake or callback handoff so dispatch-sensitive work stays under office control."
  },
  {
    title: "Keep credentials out of the form",
    body: "The public review request is for workflow context only. Do not paste tenant IDs, client secrets, app keys, booking-provider tags, or credentials."
  }
] as const

export const metadata = buildPageMetadata({
  title: "ServiceTitan compatibility review",
  description: content.summary,
  path: "/integrations/servicetitan",
})

export default function ServiceTitanPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "ServiceTitan compatibility review", path: "/integrations/servicetitan" }])} />
      <PageIntro eyebrow="Compatibility review" title={content.title} description={content.summary} />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
              Compatibility review*
            </div>
            <h2 className="mb-4 text-3xl font-black text-slate-950">What we review with you</h2>
            <div className="grid gap-3">
              {content.bullets.map((bullet) => (
                <div key={bullet} className="rounded-2xl border border-slate-200 bg-white p-4 text-base leading-8 text-slate-700">
                  {bullet}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {content.outcomeCards.map((card, index) => (
              <article
                key={card}
                className={`rounded-[1.75rem] border p-6 shadow-sm ${index === 1 ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}
              >
                <h2 className="mb-3 text-xl font-black text-slate-950">Review {index + 1}</h2>
                <p className="text-sm leading-7 text-slate-700">{card}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">How to move it forward</p>
            <h2 className="text-3xl font-black text-slate-950">Map ServiceTitan around your current office flow.</h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600">
              This review helps decide whether BookedOnCall should hand calls back to a CSR, support office-reviewed booking intake, or keep the first setup focused on clean callback capture.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {reviewSteps.map((step) => (
              <article key={step.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-black text-slate-950">{step.title}</h2>
                <p className="text-sm leading-7 text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
          <TrackedLink
            href={reviewHref}
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "servicetitan_assisted_review", href: reviewHref }}
            className="inline-flex w-fit rounded-xl border border-amber-300 bg-amber-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-400"
          >
            Request ServiceTitan review
          </TrackedLink>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <TrackedLink
              href="/integrations"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "servicetitan_integrations", href: "/integrations" }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">See supported integrations</h2>
              <p className="text-base leading-7 text-slate-600">Review the configurable workflows that are available for setup today.</p>
            </TrackedLink>
            <TrackedLink
              href="/product"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "servicetitan_product", href: "/product" }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">See the current product flow</h2>
              <p className="text-base leading-7 text-slate-600">See what BookedOnCall does today from first ring to booking path or callback handoff.</p>
            </TrackedLink>
            <TrackedLink
              href="/examples"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "servicetitan_examples", href: "/examples" }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">Read sample calls</h2>
              <p className="text-base leading-7 text-slate-600">Hear how the current assistant flow captures details, routes callbacks, and supports booking paths.</p>
            </TrackedLink>
          </div>
        </div>
      </section>
      <CtaBand
        title="Need ServiceTitan in the workflow?"
        body="Start with a compatibility review. BookedOnCall will map your ServiceTitan workflow and recommend the safest first handoff before any credentials are discussed."
        primaryLabel="Request ServiceTitan review"
        primaryHref={reviewHref}
        secondaryLabel="See supported integrations"
        secondaryHref="/integrations"
      />
    </>
  )
}

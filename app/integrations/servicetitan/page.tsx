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
    title: "Confirm the access path",
    body: "ServiceTitan needs tenant-admin participation, partner access, or a customer-private path before BookedOnCall can prove any integration behavior."
  },
  {
    title: "Map CSR rules first",
    body: "The safest first workflow is CSR-reviewed booking intake or callback handoff. Job types, business units, campaigns, capacity, and emergency rules must be mapped before booking."
  },
  {
    title: "Prove before enabling",
    body: "No ServiceTitan secrets are collected through the public form. Provider-backed test evidence and customer workflow approval are required before any tenant is enabled."
  }
] as const

export const metadata = buildPageMetadata({
  title: "ServiceTitan integration review",
  description: content.summary,
  path: "/integrations/servicetitan",
})

export default function ServiceTitanPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "ServiceTitan integration review", path: "/integrations/servicetitan" }])} />
      <PageIntro eyebrow="Assisted integration review" title={content.title} description={content.summary} />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
              Tenant-admin gated*
            </div>
            <h2 className="mb-4 text-3xl font-black text-slate-950">What must be proven first</h2>
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
                <h2 className="mb-3 text-xl font-black text-slate-950">Gate {index + 1}</h2>
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
            <h2 className="text-3xl font-black text-slate-950">Bring ServiceTitan into a guided review.</h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600">
              This is the launch-safe path for ServiceTitan shops. It collects the customer admin, workflow, and mapping context before any tenant secret, app key, or provider write path is discussed.
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
              <p className="text-base leading-7 text-slate-600">Review what is available today while ServiceTitan stays in the partner-gated bucket.</p>
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
              <p className="text-base leading-7 text-slate-600">Hear how the current assistant flow works before layering future provider work on top.</p>
            </TrackedLink>
          </div>
        </div>
      </section>
      <CtaBand
        title="Need ServiceTitan in the workflow?"
        body="Start with an assisted integration review. BookedOnCall will keep live booking claims off until tenant access, provider-backed test evidence, and the customer workflow are proven."
        primaryLabel="Request ServiceTitan review"
        primaryHref={reviewHref}
        secondaryLabel="See supported integrations"
        secondaryHref="/integrations"
      />
    </>
  )
}

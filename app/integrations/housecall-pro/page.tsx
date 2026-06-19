import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrationPages } from "@/config/marketing"
import { buildLeadFormHref } from "@/config/site"
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo"

const content = integrationPages["housecall-pro"]
const interestHref = buildLeadFormHref(undefined, "housecall-pro-roadmap-interest")

const roadmapSteps = [
  {
    title: "Capture clean caller details",
    body: "The possible future goal is to help shops using Housecall Pro receive cleaner call notes and customer context without promising a live connection today."
  },
  {
    title: "Support office-reviewed handoff",
    body: "A first release would likely stay narrow: callback handoff, office-reviewed scheduling support, and clear intake before anything gets added to another system."
  },
  {
    title: "Prioritize demand safely",
    body: "Tell us you use Housecall Pro and what workflow matters most. Do not paste API keys, webhook secrets, or Housecall Pro credentials."
  }
] as const

export const metadata = buildPageMetadata({
  title: "Housecall Pro roadmap",
  description: content.summary,
  path: "/integrations/housecall-pro",
})

export default function HousecallProPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Housecall Pro roadmap", path: "/integrations/housecall-pro" }])} />
      <PageIntro eyebrow="Roadmap" title={content.title} description={content.summary} />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
              Planned
            </div>
            <h2 className="mb-4 text-3xl font-black text-slate-950">A possible future integration</h2>
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
                <h2 className="mb-3 text-xl font-black text-slate-950">Roadmap note {index + 1}</h2>
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
            <h2 className="text-3xl font-black text-slate-950">Tell us where Housecall Pro should fit.</h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600">
              Housecall Pro is on the roadmap as a possible future integration. It is not available in BookedOnCall today, and roadmap timing may change as customer demand and implementation work evolve.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {roadmapSteps.map((step) => (
              <article key={step.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-black text-slate-950">{step.title}</h2>
                <p className="text-sm leading-7 text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
          <TrackedLink
            href={interestHref}
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "housecall_pro_roadmap_interest", href: interestHref }}
            className="inline-flex w-fit rounded-xl border border-amber-300 bg-amber-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-400"
          >
            Share Housecall Pro interest
          </TrackedLink>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <TrackedLink
              href="/integrations"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "housecall_pro_integrations", href: "/integrations" }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">See supported integrations</h2>
              <p className="text-base leading-7 text-slate-600">Review the configurable workflows that are available for setup today.</p>
            </TrackedLink>
            <TrackedLink
              href="/product"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "housecall_pro_product", href: "/product" }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">See the current product flow</h2>
              <p className="text-base leading-7 text-slate-600">See what BookedOnCall does today from first ring to booking path or callback handoff.</p>
            </TrackedLink>
            <TrackedLink
              href="/examples"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "housecall_pro_examples", href: "/examples" }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">Read sample calls</h2>
              <p className="text-base leading-7 text-slate-600">Hear how the current assistant flow captures details, routes callbacks, and supports booking paths.</p>
            </TrackedLink>
          </div>
        </div>
      </section>
      <CtaBand
        title="Want Housecall Pro on the roadmap?"
        body="Tell us you use Housecall Pro and what workflow matters most. This is a roadmap interest signal, not a live integration request, and you should not paste provider credentials."
        primaryLabel="Share Housecall Pro interest"
        primaryHref={interestHref}
        secondaryLabel="See supported integrations"
        secondaryHref="/integrations"
      />
    </>
  )
}

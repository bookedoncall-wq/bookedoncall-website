import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { useCaseOrder, useCasePages } from "@/config/marketing"
import { supportedTrades } from "@/config/site"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Industries",
  description:
    "See how BookedOnCall fits plumbing, HVAC, electrical, painting, flooring, landscaping, and general home-service businesses.",
  path: "/industries",
})

export default function IndustriesPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "BookedOnCall industries",
          description:
            "Industry pages for plumbing, HVAC, electrical, painting, flooring, landscaping, and general home-service businesses.",
          path: "/industries",
        })}
      />
      <PageIntro
        eyebrow="Industries"
        title="Built for the trades that live on inbound calls."
        description="BookedOnCall is built for home-service businesses that miss calls while the crew is already out working. Start with the trade that looks most like your business."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {useCaseOrder.map((key) => {
            const page = useCasePages[key]
            return (
              <TrackedLink
                key={page.path}
                href={page.path}
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "industries_grid", href: page.path }}
                className="rounded-[1.75rem] border border-white bg-white p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
              >
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">{page.label}</p>
                <h2 className="mb-3 text-2xl font-black text-slate-950">{page.title}</h2>
                <p className="text-base leading-7 text-slate-600">{page.cardSummary}</p>
                <span className="mt-5 inline-flex text-sm font-bold text-amber-700">See this trade</span>
              </TrackedLink>
            )
          })}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Shared patterns</p>
            <h2 className="text-4xl font-black text-slate-950">Different trades, similar call pressure.</h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
              The details change by trade, but the core problem is the same: the phone rings while the work is already happening.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-3 text-2xl font-black text-slate-950">Urgent jobs need a first response</h3>
              <p className="text-base leading-7 text-slate-600">
                Plumbing, HVAC, and electrical calls often come with real urgency. A dead-end voicemail is a weak first impression when the customer wants help now.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <h3 className="mb-3 text-2xl font-black text-slate-950">Estimate and install leads go cold fast</h3>
              <p className="text-base leading-7 text-slate-700">
                Painting, flooring, landscaping, and general home-service inquiries often go to whichever shop sounds most responsive first.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-3 text-2xl font-black text-slate-950">The next step should be clean</h3>
              <p className="text-base leading-7 text-slate-600">
                Some jobs should move toward a booking. Others should come back for review. Either way, the team needs clear details and a clean handoff.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <TrackedLink
            href="/product"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "industries_product", href: "/product" }}
            className="rounded-[1.75rem] border border-white bg-white p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">See the product flow</h2>
            <p className="text-base leading-7 text-slate-600">See how BookedOnCall answers, qualifies, and either books or hands the job back cleanly.</p>
          </TrackedLink>
          <TrackedLink
            href="/integrations"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "industries_integrations", href: "/integrations" }}
            className="rounded-[1.75rem] border border-white bg-white p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">See supported integrations</h2>
            <p className="text-base leading-7 text-slate-600">Learn how Jobber and Google Calendar fit into the call flow when you want scheduling support.</p>
          </TrackedLink>
          <TrackedLink
            href="/demo-calls"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "industries_demo", href: "/demo-calls" }}
            className="rounded-[1.75rem] border border-white bg-white p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">Read sample calls</h2>
            <p className="text-base leading-7 text-slate-600">Hear how the assistant can sound before you decide whether it fits your business.</p>
          </TrackedLink>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap gap-2">
          {supportedTrades.map((trade) => (
            <span key={trade} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600">
              {trade}
            </span>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want to see which setup fits your trade?"
        body="Start with your trade page, hear a sample call, or talk to us about how your business handles missed calls today."
      />
    </>
  )
}

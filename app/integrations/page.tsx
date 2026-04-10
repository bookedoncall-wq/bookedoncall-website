import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { RoadmapFootnote } from "@/components/marketing/RoadmapFootnote"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrationPages } from "@/config/marketing"
import { liveIntegrations, roadmapIntegrations } from "@/config/site"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Integrations",
  description:
    "See how BookedOnCall works with Jobber, Google Calendar, and Text / SMS today, plus the QuickBooks roadmap note.",
  path: "/integrations",
})

export default function IntegrationsPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Integrations", path: "/integrations" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "BookedOnCall integrations",
          description:
            "BookedOnCall integrations for Jobber, Google Calendar, Text / SMS, and the QuickBooks roadmap.",
          path: "/integrations",
        })}
      />
      <PageIntro
        eyebrow="Integrations"
        title="Fits the tools you already use."
        description="BookedOnCall is built to fit your existing workflow, not force a brand-new back office. Today that means supported workflows with Jobber, Google Calendar, and Text / SMS. QuickBooks is the next targeted integration on the roadmap."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Available now</p>
            <div className="grid gap-6 lg:grid-cols-3">
              {liveIntegrations.map((integration) => {
                const card = integrationPages[integration.id as keyof typeof integrationPages]
                return (
            <TrackedLink
              key={integration.id}
              href={`/integrations/${integration.id}`}
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "integrations_hub_card", href: `/integrations/${integration.id}` }}
              className="rounded-[1.75rem] border border-white bg-white p-7 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/30"
            >
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">{integration.name}</p>
              <h2 className="mb-3 text-3xl font-black text-slate-950">{card.title}</h2>
              <p className="mb-5 text-base leading-7 text-slate-600">{card.summary}</p>
              <div className="grid gap-3">
                {card.outcomeCards.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
              <span className="mt-5 inline-flex text-sm font-bold text-amber-700">See integration details</span>
            </TrackedLink>
                )
              })}
            </div>
          </div>

          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Roadmap</p>
            <div className="grid gap-6 lg:grid-cols-2">
              {roadmapIntegrations.map((integration) => {
                const card = integrationPages[integration.id as keyof typeof integrationPages]
                return (
            <TrackedLink
              key={integration.id}
              href={`/integrations/${integration.id}`}
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "integrations_hub_card", href: `/integrations/${integration.id}` }}
              className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-7 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/60"
            >
              <div className="mb-4 inline-flex rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
                Coming soon*
              </div>
              <h2 className="mb-3 text-3xl font-black text-slate-950">{card.title}</h2>
              <p className="mb-5 text-base leading-7 text-slate-700">{card.summary}</p>
              <div className="grid gap-3">
                {card.outcomeCards.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
              <span className="mt-5 inline-flex text-sm font-bold text-amber-700">See roadmap note</span>
            </TrackedLink>
                )
              })}
            </div>
            <RoadmapFootnote className="rounded-[1.5rem] border border-amber-200 bg-white px-5 py-4 text-amber-900" />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-black text-slate-950">Availability checks</h2>
            <p className="text-base leading-7 text-slate-600">
              A connected scheduler lets BookedOnCall check the next step before it offers a supported appointment time.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-black text-slate-950">Supported booking, not forced booking</h2>
            <p className="text-base leading-7 text-slate-700">
              Integrations help on bookable jobs. They don&apos;t force edge cases into a slot when a person should decide.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-black text-slate-950">Clean callback fallback</h2>
            <p className="text-base leading-7 text-slate-600">
              Even with integrations connected, the product still needs to hand back manual-review jobs with good context.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        title="Want to see how BookedOnCall fits your scheduling setup?"
        body="Review the live integrations, see what is planned next, read example calls, and start setup when you want them in the flow."
      />
    </>
  )
}

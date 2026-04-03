import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrationPages } from "@/config/marketing"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const integrationCards = [
  {
    id: "jobber",
    href: "/integrations/jobber",
    eyebrow: "Jobber",
    title: integrationPages.jobber.title,
    summary: integrationPages.jobber.summary,
    outcomes: integrationPages.jobber.outcomeCards,
  },
  {
    id: "google-calendar",
    href: "/integrations/google-calendar",
    eyebrow: "Google Calendar",
    title: integrationPages["google-calendar"].title,
    summary: integrationPages["google-calendar"].summary,
    outcomes: integrationPages["google-calendar"].outcomeCards,
  },
] as const

export const metadata = buildPageMetadata({
  title: "Integrations",
  description:
    "See how BookedOnCall works with Jobber and Google Calendar for supported scheduling and cleaner callback handoff.",
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
            "BookedOnCall integrations for Jobber and Google Calendar.",
          path: "/integrations",
        })}
      />
      <PageIntro
        eyebrow="Integrations"
        title="Fits the tools you already use."
        description="BookedOnCall is built to fit your existing scheduling process, not force a brand-new back office. Today that means supported workflows with Jobber and Google Calendar."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          {integrationCards.map((card) => (
            <TrackedLink
              key={card.id}
              href={card.href}
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "integrations_hub_card", href: card.href }}
              className="rounded-[1.75rem] border border-white bg-white p-7 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/30"
            >
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">{card.eyebrow}</p>
              <h2 className="mb-3 text-3xl font-black text-slate-950">{card.title}</h2>
              <p className="mb-5 text-base leading-7 text-slate-600">{card.summary}</p>
              <div className="grid gap-3">
                {card.outcomes.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
              <span className="mt-5 inline-flex text-sm font-bold text-amber-700">See integration details</span>
            </TrackedLink>
          ))}
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
              Integrations help on bookable jobs. They do not force edge cases into a slot when a person should decide.
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
        body="Look at the integration pages, hear a sample call, and then talk to us about how your team wants jobs routed."
      />
    </>
  )
}

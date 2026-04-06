import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrationPages } from "@/config/marketing"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const content = integrationPages["google-calendar"]

export const metadata = buildPageMetadata({
  title: "Google Calendar integration",
  description: content.summary,
  path: "/integrations/google-calendar",
})

export default function GoogleCalendarPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Google Calendar integration", path: "/integrations/google-calendar" }])} />
      <StructuredData data={buildServiceSchema({ name: content.title, description: content.summary, path: "/integrations/google-calendar" })} />
      <PageIntro eyebrow="Integration" title={content.title} description={content.summary} />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">What changes when the calendar is connected</h2>
            <div className="grid gap-3">
              {content.bullets.map((bullet) => (
                <div key={bullet} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-8 text-slate-700">
                  {bullet}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {content.outcomeCards.map((card, index) => (
              <article
                key={card}
                className={`rounded-[1.75rem] border p-6 shadow-sm ${index === 1 ? "border-amber-200 bg-amber-50" : "border-white bg-white"}`}
              >
                <h2 className="mb-3 text-xl font-black text-slate-950">Outcome {index + 1}</h2>
                <p className="text-sm leading-7 text-slate-700">{card}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          <TrackedLink
            href="/product"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "calendar_product", href: "/product" }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">See the product flow</h2>
            <p className="text-base leading-7 text-slate-600">See how BookedOnCall checks the next step before offering a supported appointment time.</p>
          </TrackedLink>
          <TrackedLink
            href="/examples"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "calendar_demo", href: "/examples" }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">Read sample calls</h2>
            <p className="text-base leading-7 text-slate-600">Read how the assistant can gather the details before it checks availability or hands the call back.</p>
          </TrackedLink>
          <TrackedLink
            href="/pricing"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "calendar_pricing", href: "/pricing" }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">See pricing</h2>
            <p className="text-base leading-7 text-slate-600">Review Starter and Pro, then talk through how calendar-backed booking should work for your business.</p>
          </TrackedLink>
        </div>
      </section>
      <CtaBand title="Need calendar-backed availability?" body="Choose a plan and connect Google Calendar so callers can be offered supported appointment times." />
    </>
  )
}

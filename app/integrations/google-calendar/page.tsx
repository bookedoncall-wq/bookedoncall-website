import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
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
        <div className="mx-auto grid max-w-4xl gap-4">
          {content.bullets.map((bullet) => (
            <article key={bullet} className="rounded-[1.5rem] border border-white bg-white p-6 shadow-sm text-base leading-8 text-slate-600">
              {bullet}
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Need calendar-backed availability?" body="Choose a plan and connect Google Calendar so callers can be offered supported appointment times." />
    </>
  )
}

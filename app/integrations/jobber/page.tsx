import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { integrationPages } from "@/config/marketing"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const content = integrationPages.jobber

export const metadata = buildPageMetadata({
  title: "Jobber integration",
  description: content.summary,
  path: "/integrations/jobber",
})

export default function JobberPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Jobber integration", path: "/integrations/jobber" }])} />
      <StructuredData data={buildServiceSchema({ name: content.title, description: content.summary, path: "/integrations/jobber" })} />
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
      <CtaBand title="Need Jobber in the loop?" body="Connect it from the owner dashboard after onboarding instead of relying on a landing page promise alone." />
    </>
  )
}

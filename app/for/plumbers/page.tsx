import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { useCasePages } from "@/config/marketing"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const content = useCasePages.plumbers

export const metadata = buildPageMetadata({
  title: "For plumbing businesses",
  description: content.summary,
  path: "/for/plumbers",
})

export default function PlumbersPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "For plumbers", path: "/for/plumbers" }])} />
      <StructuredData data={buildServiceSchema({ name: content.title, description: content.summary, path: "/for/plumbers" })} />
      <PageIntro eyebrow="Use case" title={content.title} description={content.summary} />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-4">
          {content.bullets.map((bullet) => (
            <article key={bullet} className="rounded-[1.5rem] border border-white bg-white p-6 shadow-sm text-base leading-8 text-slate-600">
              {bullet}
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="If you run plumbing calls all day, start in the app." body="That is where pricing, onboarding, dashboard visibility, and business-specific workflow settings now stay aligned." />
    </>
  )
}

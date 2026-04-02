import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { useCasePages } from "@/config/marketing"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const content = useCasePages.hvac

export const metadata = buildPageMetadata({
  title: "For HVAC companies",
  description: content.summary,
  path: "/for/hvac",
})

export default function HvacPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "For HVAC", path: "/for/hvac" }])} />
      <StructuredData data={buildServiceSchema({ name: content.title, description: content.summary, path: "/for/hvac" })} />
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
      <CtaBand title="Need better HVAC call coverage?" body="Choose a plan and make sure heating and cooling calls get answered the first time." />
    </>
  )
}

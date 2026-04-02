import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/seo"

type UseCaseContent = {
  title: string
  summary: string
  commonCalls: readonly string[]
  reasons: readonly string[]
  trustCopy: string
  ctaTitle: string
  ctaBody: string
}

type UseCasePageProps = {
  crumbLabel: string
  path: string
  content: UseCaseContent
}

export function UseCasePage({ crumbLabel, path, content }: UseCasePageProps) {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: crumbLabel, path }])} />
      <StructuredData data={buildServiceSchema({ name: content.title, description: content.summary, path })} />
      <PageIntro eyebrow="Use case" title={content.title} description={content.summary} />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Common calls in this trade</h2>
            <div className="grid gap-3">
              {content.commonCalls.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-8 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Why teams use BookedOnCall</h2>
            <div className="grid gap-3">
              {content.reasons.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-8 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Built for the way this work actually gets done</h2>
            <p className="max-w-4xl text-base leading-8 text-slate-700">{content.trustCopy}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
              <TrackedLink
                href="/about"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "use_case_about", path }}
                className="text-amber-700 underline decoration-amber-300 underline-offset-4"
              >
                Read the founder story
              </TrackedLink>
              <TrackedLink
                href="/pricing"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "use_case_pricing", path }}
                className="text-slate-900 underline decoration-slate-300 underline-offset-4"
              >
                See pricing
              </TrackedLink>
            </div>
          </article>
        </div>
      </section>

      <CtaBand title={content.ctaTitle} body={content.ctaBody} />
    </>
  )
}

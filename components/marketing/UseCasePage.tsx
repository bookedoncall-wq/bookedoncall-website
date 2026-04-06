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
            <h2 className="mb-4 text-3xl font-black text-slate-950">Why shops in this trade care</h2>
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

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            <article className="rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">Catch the first response</h2>
              <p className="text-base leading-7 text-slate-600">
              The goal is to keep a real caller from dropping into voicemail while you&apos;re already in the field.
              </p>
            </article>
          <article className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-black text-slate-950">Get usable job details</h2>
            <p className="text-base leading-7 text-slate-700">
              Name, callback number, address, and a clear description of the job give you a better next step than a rushed message.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-black text-slate-950">Book when it fits, follow up when it doesn&apos;t</h2>
            <p className="text-base leading-7 text-slate-600">
              Supported jobs can move toward a booking. Edge cases and approval-only work still come back with clear details for follow-up.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <TrackedLink
            href="/product"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "use_case_product", path }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">See the product flow</h2>
            <p className="text-base leading-7 text-slate-600">
              See how a call moves from first ring to a booking path or a clear next step.
            </p>
          </TrackedLink>
          <TrackedLink
            href="/examples"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "use_case_demo", path }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">Read sample calls</h2>
            <p className="text-base leading-7 text-slate-600">
              See how the assistant handles real-world service calls before you decide anything.
            </p>
          </TrackedLink>
          <TrackedLink
            href="/pricing"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "use_case_pricing_card", path }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">See pricing</h2>
            <p className="text-base leading-7 text-slate-600">
              Compare Starter and Pro and see which setup fits your shop.
            </p>
          </TrackedLink>
        </div>
      </section>

      <CtaBand title={content.ctaTitle} body={content.ctaBody} />
    </>
  )
}

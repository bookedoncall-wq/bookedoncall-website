import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/seo"

type GuideSection = {
  title: string
  body: string
}

type GuideProofItem = {
  title: string
  detail: string
  sourceLabel: string
  sourceUrl: string
}

type GuideLink = {
  label: string
  href: string
}

type GuidePageProps = {
  path: string
  eyebrow: string
  title: string
  description: string
  serviceName: string
  serviceDescription: string
  sections: readonly GuideSection[]
  quickPoints?: readonly string[]
  proofItems?: readonly GuideProofItem[]
  nextLinks?: readonly GuideLink[]
  ctaTitle: string
  ctaBody: string
}

export function GuidePage({
  path,
  eyebrow,
  title,
  description,
  serviceName,
  serviceDescription,
  sections,
  quickPoints,
  proofItems,
  nextLinks,
  ctaTitle,
  ctaBody,
}: GuidePageProps) {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: title, path }])} />
      <StructuredData data={buildServiceSchema({ name: serviceName, description: serviceDescription, path })} />
      <PageIntro eyebrow={eyebrow} title={title} description={description} />

      {quickPoints?.length ? (
        <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {quickPoints.map((point) => (
              <article key={point} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-sm leading-7 text-slate-700">{point}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
              <h2 className="mb-4 text-3xl font-black text-slate-950">{section.title}</h2>
              <p className="text-base leading-8 text-slate-700">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      {proofItems?.length ? (
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8">
            <div className="grid gap-4 text-center">
              <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Outside numbers</p>
              <h2 className="text-4xl font-black text-slate-950">A few outside numbers worth knowing.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {proofItems.map((item) => (
                <article key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <h3 className="mb-3 text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mb-4 text-sm leading-7 text-slate-700">{item.detail}</p>
                  <TrackedLink
                    href={item.sourceUrl}
                    eventName="marketing_cta_clicked"
                    eventPayload={{ placement: "guide_source", href: item.sourceUrl }}
                    className="text-sm font-bold text-amber-700 underline decoration-amber-300 underline-offset-4"
                  >
                    Source: {item.sourceLabel}
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {nextLinks?.length ? (
        <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8">
            <div className="grid gap-4 text-center">
              <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Next steps</p>
              <h2 className="text-4xl font-black text-slate-950">Where to look next.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {nextLinks.map((link) => (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "guide_next", href: link.href }}
                  className="rounded-[1.5rem] border border-white bg-white p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
                >
                  <p className="text-lg font-black text-slate-950">{link.label}</p>
                </TrackedLink>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand title={ctaTitle} body={ctaBody} />
    </>
  )
}

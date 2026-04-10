import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrationPages } from "@/config/marketing"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const content = integrationPages.quickbooks

export const metadata = buildPageMetadata({
  title: "QuickBooks roadmap",
  description: content.summary,
  path: "/integrations/quickbooks",
})

export default function QuickBooksPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "QuickBooks roadmap", path: "/integrations/quickbooks" }])} />
      <StructuredData data={buildServiceSchema({ name: content.title, description: content.summary, path: "/integrations/quickbooks" })} />
      <PageIntro eyebrow="Roadmap" title={content.title} description={content.summary} />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
              Coming soon*
            </div>
            <h2 className="mb-4 text-3xl font-black text-slate-950">What we are targeting first</h2>
            <div className="grid gap-3">
              {content.bullets.map((bullet) => (
                <div key={bullet} className="rounded-2xl border border-slate-200 bg-white p-4 text-base leading-8 text-slate-700">
                  {bullet}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {content.outcomeCards.map((card, index) => (
              <article
                key={card}
                className={`rounded-[1.75rem] border p-6 shadow-sm ${index === 1 ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}
              >
                <h2 className="mb-3 text-xl font-black text-slate-950">Note {index + 1}</h2>
                <p className="text-sm leading-7 text-slate-700">{card}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <TrackedLink
              href="/integrations"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "quickbooks_integrations", href: "/integrations" }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">See live integrations</h2>
              <p className="text-base leading-7 text-slate-600">Review the integrations you can use today while QuickBooks stays in the roadmap bucket.</p>
            </TrackedLink>
            <TrackedLink
              href="/product"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "quickbooks_product", href: "/product" }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">See the current product flow</h2>
              <p className="text-base leading-7 text-slate-600">See what BookedOnCall does today from first ring to booking path or callback handoff.</p>
            </TrackedLink>
            <TrackedLink
              href="/examples"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "quickbooks_examples", href: "/examples" }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">Read sample calls</h2>
              <p className="text-base leading-7 text-slate-600">Hear how the current assistant flow works before layering future customer-context work on top.</p>
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  )
}

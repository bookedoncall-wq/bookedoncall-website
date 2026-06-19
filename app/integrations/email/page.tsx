import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrationPages } from "@/config/marketing"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const content = integrationPages.email

export const metadata = buildPageMetadata({
  title: "Email summaries integration",
  description: content.summary,
  path: "/integrations/email",
})

export default function EmailIntegrationPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Email summaries integration", path: "/integrations/email" }])} />
      <StructuredData data={buildServiceSchema({ name: content.title, description: content.summary, path: "/integrations/email" })} />
      <PageIntro eyebrow="Integration" title={content.title} description={content.summary} />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">What changes when email summaries are turned on</h2>
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
                className={`rounded-[1.75rem] border p-6 shadow-sm ${index === 1 ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}
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
            eventPayload={{ placement: "email_product", href: "/product" }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">See the product flow</h2>
            <p className="text-base leading-7 text-slate-600">See how calls turn into summaries, booking paths, callbacks, and owner-review next steps.</p>
          </TrackedLink>
          <TrackedLink
            href="/demo-calls"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "email_demo", href: "/demo-calls" }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">Try demo calls</h2>
            <p className="text-base leading-7 text-slate-600">Try the live web voice demo, then review example calls before deciding how summaries should reach your inbox.</p>
          </TrackedLink>
          <TrackedLink
            href="/pricing"
            eventName="marketing_cta_clicked"
            eventPayload={{ placement: "email_pricing", href: "/pricing" }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
          >
            <h2 className="mb-3 text-2xl font-black text-slate-950">See pricing</h2>
            <p className="text-base leading-7 text-slate-600">Review Starter and Pro, then decide which call summaries and alerts your shop needs first.</p>
          </TrackedLink>
        </div>
      </section>

      <CtaBand
        title="Need clean call summaries in your inbox?"
        body="Use email summaries as a simple first handoff while BookedOnCall helps you capture jobs, callbacks, and owner-review next steps."
      />
    </>
  )
}

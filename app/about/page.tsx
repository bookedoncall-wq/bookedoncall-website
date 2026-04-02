import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "BookedOnCall is a trades-focused AI call answering product with the app, billing, and onboarding flow aligned around operational truth instead of vague marketing promises.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "About BookedOnCall",
          description:
            "BookedOnCall is built to help trades businesses answer calls, capture structured intake, and run onboarding and billing through the app surface that owns the product data.",
          path: "/about",
        })}
      />
      <PageIntro
        eyebrow="About"
        title="BookedOnCall is a product story first and a marketing story second."
        description="The point of this site is not to sound bigger than the product. The point is to give operators a truthful picture of what the app can own today and where human review still matters."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Why it exists</h2>
            <p className="text-base leading-8 text-slate-600">
              Trades businesses lose work when calls hit voicemail while the team is on site. BookedOnCall exists to answer those calls, capture the structured details the office actually needs, and connect the outcome back to an operator-facing app instead of a disconnected landing page funnel.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">What changed</h2>
            <p className="text-base leading-8 text-slate-600">
              The product now treats the app domain as the canonical surface for checkout, onboarding, and subscription attachment. That removes the split-brain state where the marketing site could claim or bill for behaviors the app did not yet own cleanly.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Operating principle</h2>
            <p className="text-base leading-8 text-slate-600">
              Public claims must trace back to product truth. If a workflow depends on configuration, connected integrations, or human review, this site says that directly instead of hiding it behind conversion copy.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        title="If the product truth matters to you, start on the app side."
        body="That is where BookedOnCall now owns checkout, onboarding, business setup, and the dashboard that operators actually use."
      />
    </>
  )
}

import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { resourceHighlights } from "@/config/marketing"
import { sourcedProof } from "@/config/site"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const extraResources = [
  {
    title: "FAQ",
    href: "/faq",
    description: "Answers about setup, booking, supported languages, integrations, and pricing.",
  },
  {
    title: "Product overview",
    href: "/product",
    description: "The clearest walkthrough of what BookedOnCall does from first ring to next step.",
  },
  {
    title: "Integrations",
    href: "/integrations",
    description: "See how Jobber, Google Calendar, and Text / SMS fit into the call flow, plus what is planned next.",
  },
] as const

export const metadata = buildPageMetadata({
  title: "Resources",
  description:
    "Example calls, comparisons, pricing, integrations, and FAQs for trades businesses evaluating BookedOnCall.",
  path: "/resources",
})

export default function ResourcesPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "BookedOnCall resources",
          description:
            "Guides, comparisons, sample calls, and FAQs for trades businesses evaluating BookedOnCall.",
          path: "/resources",
        })}
      />
      <PageIntro
        eyebrow="Resources"
        title="Examples, comparisons, pricing, and integrations."
        description="Hear how BookedOnCall sounds, compare it with voicemail and answering services, and review pricing and integrations."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {resourceHighlights.map((resource, index) => (
            <TrackedLink
              key={resource.href}
              href={resource.href}
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "resources_primary", href: resource.href }}
              className="rounded-[1.75rem] border border-white bg-white p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Step {index + 1}</p>
              <h2 className="mb-3 text-2xl font-black text-slate-950">{resource.title}</h2>
              <p className="text-base leading-7 text-slate-600">{resource.description}</p>
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {extraResources.map((resource) => (
            <TrackedLink
              key={resource.href}
              href={resource.href}
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "resources_secondary", href: resource.href }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              <h2 className="mb-3 text-2xl font-black text-slate-950">{resource.title}</h2>
              <p className="text-base leading-7 text-slate-600">{resource.description}</p>
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Outside numbers</p>
            <h2 className="text-4xl font-black text-slate-950">A few outside numbers worth knowing.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {sourcedProof.map((item) => (
              <article key={item.id} className="rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-black text-slate-950">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-700">{item.detail}</p>
                <TrackedLink
                  href={item.sourceUrl}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "resources_source", href: item.sourceUrl }}
                  className="mt-4 inline-flex text-sm font-bold text-amber-700 underline decoration-amber-300 underline-offset-4"
                >
                  Source: {item.sourceLabel}
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to see how BookedOnCall fits your shop?"
        body="Hear example calls, compare your options, and move into pricing or setup when you&apos;re ready."
      />
    </>
  )
}

import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrations, validatedCapabilities } from "@/config/site"
import { buildPageMetadata, buildBreadcrumbSchema, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Features",
  description:
    "BookedOnCall answers inbound calls, captures structured lead data, checks configured availability, and records outcomes in the owner dashboard for trades businesses.",
  path: "/features",
})

const capabilityGroups = [
  {
    title: "Call handling",
    items: [
      "Answer inbound calls with a configured AI assistant.",
      "Capture caller name, callback number, and job details.",
      "Route edge cases into callback or human-follow-up flows."
    ]
  },
  {
    title: "Scheduling",
    items: [
      "Check the configured scheduling provider when a business has enabled it.",
      "Book supported requests into the selected workflow.",
      "Fall back to callback capture instead of bluffing unsupported bookings."
    ]
  },
  {
    title: "Owner operations",
    items: [
      "Write summaries and runtime data into the owner dashboard.",
      "Expose integration state, billing, and business settings inside the app.",
      "Keep onboarding and plan attachment on the app domain."
    ]
  }
] as const

export default function FeaturesPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Features", path: "/features" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "BookedOnCall features",
          description:
            "BookedOnCall helps trades businesses answer calls, collect intake, and route work into configured scheduling or callback workflows.",
          path: "/features",
        })}
      />
      <PageIntro
        eyebrow="Product capabilities"
        title="A tighter feature list is better than a louder one."
        description="This page focuses on the behaviors the app can actually own today: inbound call handling, structured qualification, connected scheduling when enabled, and owner-side operational visibility."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {capabilityGroups.map((group) => (
            <article key={group.title} className="rounded-[1.5rem] border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-black text-slate-950">{group.title}</h2>
              <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Plain-language truth</p>
            <h2 className="text-4xl font-black text-slate-950">What the public site is comfortable claiming.</h2>
          </div>
          <div className="grid gap-3">
            {validatedCapabilities.map((capability) => (
              <div key={capability} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                {capability}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">What depends on configuration</h2>
            <ul className="grid gap-3 text-sm leading-7 text-slate-600">
              <li>Automatic booking requires an enabled scheduling path and a connected provider.</li>
              <li>Jobber and Google Calendar behavior depends on a business-level connected account.</li>
              <li>SMS and email follow-up depend on the business messaging configuration.</li>
              <li>Emergency escalation rules depend on how the business has configured those workflows.</li>
            </ul>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Where to go deeper</h2>
            <div className="grid gap-3 text-sm leading-7">
              <TrackedLink
                href="/how-it-works"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "features_deeper", href: "/how-it-works" }}
                className="rounded-2xl border border-slate-200 px-4 py-3 font-bold text-slate-900 transition-colors hover:border-amber-300"
              >
                Review the call-to-dashboard workflow
              </TrackedLink>
              {integrations.map((integration) => (
                <TrackedLink
                  key={integration.id}
                  href={`/integrations/${integration.id}`}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "features_integration", integration: integration.id }}
                  className="rounded-2xl border border-slate-200 px-4 py-3 font-bold text-slate-900 transition-colors hover:border-amber-300"
                >
                  Read the {integration.name} integration page
                </TrackedLink>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CtaBand
        title="Prefer to validate the workflow in context?"
        body="Start in the app, complete checkout, and finish onboarding on the same product surface that owns business provisioning, billing, and dashboard access."
      />
    </>
  )
}

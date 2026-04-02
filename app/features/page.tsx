import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrations, validatedCapabilities } from "@/config/site"
import { buildPageMetadata, buildBreadcrumbSchema, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Features",
  description:
    "BookedOnCall answers inbound calls, captures structured lead data, checks configured availability, and sends the result where your team can act on it.",
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
    title: "Business setup and follow-up",
    items: [
      "Send call summaries and outcomes to your dashboard.",
      "Show integration status, billing, and business settings in one place.",
      "Use Pro to choose the assistant voice, assistant name, and branded greeting.",
      "Guide you through checkout, account setup, and onboarding in one flow."
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
        title="What BookedOnCall can do today."
        description="BookedOnCall focuses on clear, useful jobs: answer calls, collect structured intake, check scheduling when enabled, and route the result where your team can act on it."
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Core capabilities</p>
            <h2 className="text-4xl font-black text-slate-950">What BookedOnCall handles.</h2>
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
                See how a call moves through the workflow
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
        title="Ready to set up your call flow?"
        body="Choose your plan and finish setup in one guided flow."
      />
    </>
  )
}

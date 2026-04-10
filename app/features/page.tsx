import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { integrations, validatedCapabilities } from "@/config/site"
import { buildPageMetadata, buildBreadcrumbSchema, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Features",
  description:
    "BookedOnCall helps trades businesses answer missed calls, collect customer details, book supported work, and hand off the rest cleanly.",
  path: "/features",
})

const capabilityGroups = [
  {
    title: "Answer the call",
    items: [
      "Answer missed calls with an AI assistant for your business.",
      "Capture caller name, callback number, address, and job details.",
      "Handle after-hours calls without sending customers to voicemail."
    ]
  },
  {
    title: "Book what can be booked",
    items: [
      "Check availability when your calendar or scheduling tool is connected.",
      "Offer appointments for the jobs you want BookedOnCall to handle.",
      "Keep scheduling simple instead of making callers wait for a basic booking."
    ]
  },
  {
    title: "Hand off what needs a person",
    items: [
      "Send callbacks and manual-review jobs back to you cleanly.",
      "Keep summaries, customer details, and next steps in one place.",
      "Use Pro to choose the assistant voice, assistant name, and branded greeting.",
      "Get set up without changing the tools you already rely on."
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
            "BookedOnCall helps trades businesses answer calls, collect intake, and either book supported work or hand the call back cleanly.",
          path: "/features",
        })}
      />
      <PageIntro
        eyebrow="Features"
        title="What you get with BookedOnCall."
        description="BookedOnCall is built for the real calls trades businesses get every day: new jobs, scheduling requests, callbacks, and after-hours intake."
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
            <h2 className="text-4xl font-black text-slate-950">What BookedOnCall can handle today.</h2>
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
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">How it compares</p>
            <h2 className="text-4xl font-black text-slate-950">BookedOnCall vs the alternatives.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-black text-slate-950">vs Voicemail</h3>
              <p className="text-sm leading-7 text-slate-600">Voicemail captures a fraction of the details you need and many callers hang up before leaving a message. BookedOnCall asks the right questions and collects structured job details.</p>
            </article>
            <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-black text-slate-950">vs Hiring a receptionist</h3>
              <p className="text-sm leading-7 text-slate-600">Hiring a receptionist adds wage and staffing overhead. BookedOnCall starts at $250/month and stays available around the clock.</p>
            </article>
            <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-black text-slate-950">vs Generic AI tools</h3>
              <p className="text-sm leading-7 text-slate-600">Most AI answering tools are built for any industry. BookedOnCall is built for trades: plumbing, HVAC, electrical, painting, flooring, landscaping, and general home services.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">When BookedOnCall books the job</h2>
            <ul className="grid gap-3 text-sm leading-7 text-slate-600">
              <li>Scheduling is turned on for the kinds of jobs you want BookedOnCall to handle.</li>
              <li>Jobber or Google Calendar is connected.</li>
              <li>The request fits the rules you want booked automatically.</li>
              <li>The caller gives the details needed to move forward.</li>
            </ul>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">When you take over</h2>
            <ul className="mb-6 grid gap-3 text-sm leading-7 text-slate-600">
              <li>Out-of-area requests, approval-only jobs, and edge cases can be sent back as callbacks.</li>
              <li>You still get the customer details and a clean summary of the call.</li>
              <li>Nothing has to be forced into a booking just to keep the caller moving.</li>
            </ul>
            <div className="grid gap-3 text-sm leading-7">
              <TrackedLink
                href="/how-it-works"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "features_deeper", href: "/how-it-works" }}
                className="rounded-2xl border border-slate-200 px-4 py-3 font-bold text-slate-900 transition-colors hover:border-amber-300"
              >
                See how a call moves from first ring to next step
              </TrackedLink>
              {integrations.map((integration) => (
                <TrackedLink
                  key={integration.id}
                  href={`/integrations/${integration.id}`}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "features_integration", integration: integration.id }}
                  className="rounded-2xl border border-slate-200 px-4 py-3 font-bold text-slate-900 transition-colors hover:border-amber-300"
                >
                  {integration.status === "coming_soon"
                    ? `See the ${integration.name} roadmap page`
                    : `Read the ${integration.name} integration page`}
                </TrackedLink>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CtaBand
        title="Ready to answer more calls?"
        body="See the plans and talk through how you want BookedOnCall to handle new calls."
      />
    </>
  )
}

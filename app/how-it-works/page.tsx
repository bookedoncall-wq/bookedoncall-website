import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { workflowSteps } from "@/config/marketing"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "How It Works",
  description:
    "BookedOnCall answers calls, qualifies the request, checks configured availability, and either books supported work or captures callbacks.",
  path: "/how-it-works",
})

export default function HowItWorksPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "How BookedOnCall works",
          description:
            "BookedOnCall routes inbound trades calls into structured qualification, configured scheduling checks, and follow-up your team can act on.",
          path: "/how-it-works",
        })}
      />
      <PageIntro
        eyebrow="Workflow"
        title="From missed call coverage to booked work."
        description="BookedOnCall answers the call, qualifies the request, checks your scheduling rules, and either books the job or captures the callback details your team needs."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6">
          {workflowSteps.map((step, index) => (
            <article key={step.title} className="rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Step {index + 1}</div>
              <h2 className="mb-3 text-3xl font-black text-slate-950">{step.title}</h2>
              <p className="text-base leading-8 text-slate-600">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-3xl font-black text-slate-950">When a request can be booked</h2>
            <p className="text-base leading-8 text-slate-600">
              The business must have enabled scheduling, connected a supported provider, and configured the service in a way the assistant can safely handle. Those settings determine whether the system books the request or routes it as a callback.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-3xl font-black text-slate-950">When a request stays human-led</h2>
            <p className="text-base leading-8 text-slate-600">
              Complex jobs, out-of-area work, unsupported services, or flows that need manual confirmation can fall back to structured callback capture instead of forcing a booking.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        title="Ready to set up your call flow?"
        body="Choose a plan, create your account, and finish setup in one place."
      />
    </>
  )
}

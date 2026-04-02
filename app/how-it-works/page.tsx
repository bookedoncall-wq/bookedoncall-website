import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { workflowSteps } from "@/config/marketing"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "How It Works",
  description:
    "BookedOnCall answers the call, gets the basics, offers supported bookings, and hands off anything that still needs your team.",
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
            "BookedOnCall answers the call, gets the details, and moves the customer toward a booking or callback.",
          path: "/how-it-works",
        })}
      />
      <PageIntro
        eyebrow="How it works"
        title="What happens when a customer calls."
        description="BookedOnCall answers the call, gets the basics, checks availability when it should, and hands off anything that still needs your team."
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
            <h2 className="mb-4 text-3xl font-black text-slate-950">When BookedOnCall books the job</h2>
            <p className="text-base leading-8 text-slate-600">
              If scheduling is connected and the request fits the rules you want automated, BookedOnCall can offer an appointment on the call.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-3xl font-black text-slate-950">When your team takes over</h2>
            <p className="text-base leading-8 text-slate-600">
              Out-of-area requests, approval-only jobs, and anything you want reviewed still get handed back cleanly with the customer details attached.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        title="Want to talk through your call flow?"
        body="See the plans and we will help you set BookedOnCall up for the way your team handles calls."
      />
    </>
  )
}

import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const comparisonRows = [
  {
    topic: "First response",
    voicemail: "The caller hears a greeting and decides whether it is worth leaving a message.",
    bookedOnCall: "The caller gets an immediate response and can keep moving through the call instead of dropping off.",
  },
  {
    topic: "Lead details",
    voicemail: "You only get what the caller decides to leave, if they leave anything at all.",
    bookedOnCall: "You can capture name, phone, address, job details, and urgency more consistently.",
  },
  {
    topic: "After-hours coverage",
    voicemail: "Calls usually stack up until the next day.",
    bookedOnCall: "After-hours callers still get a response and you still get the details.",
  },
  {
    topic: "Next step",
    voicemail: "Your office has to start from scratch when calling back.",
    bookedOnCall: "You start with a cleaner summary and can move faster on booking or follow-up.",
  },
] as const

export const metadata = buildPageMetadata({
  title: "AI receptionist vs voicemail",
  description:
    "A practical comparison of AI call answering versus voicemail for trades businesses that miss calls while the crew is on jobs.",
  path: "/compare/ai-receptionist-vs-voicemail",
})

export default function AiReceptionistVsVoicemailPage() {
  return (
    <>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI receptionist vs voicemail", path: "/compare/ai-receptionist-vs-voicemail" },
        ])}
      />
      <StructuredData
        data={buildServiceSchema({
          name: "AI receptionist vs voicemail for trades businesses",
          description:
            "A practical comparison of AI call answering versus voicemail for trades businesses.",
          path: "/compare/ai-receptionist-vs-voicemail",
        })}
      />
      <PageIntro
        eyebrow="Comparison"
        title="AI receptionist vs voicemail."
        description="If you miss calls because everyone is out working, voicemail is usually the fallback. For a lot of trades businesses, it is also where good jobs disappear."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6">
          {comparisonRows.map((row) => (
            <article key={row.topic} className="grid gap-4 rounded-[1.75rem] border border-white bg-white p-7 shadow-sm lg:grid-cols-[0.28fr_0.36fr_0.36fr]">
              <div>
                <h2 className="text-2xl font-black text-slate-950">{row.topic}</h2>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Voicemail</p>
                <p className="text-sm leading-7 text-slate-700">{row.voicemail}</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">BookedOnCall</p>
                <p className="text-sm leading-7 text-slate-700">{row.bookedOnCall}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Who this matters most for</h2>
            <p className="text-base leading-8 text-slate-700">
              This matters most for owner-operators, smaller crews, and growing trades businesses that do not have a full-time receptionist but still want to sound responsive and professional when a new customer calls.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        title="Want something better than voicemail?"
        body="See the plans and tell us how you handle calls today."
      />
    </>
  )
}

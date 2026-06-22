import { CalendarClock, FileText, Mic } from "lucide-react"
import { CtaBand } from "@/components/marketing/CtaBand"
import { VapiDemoCallPreview } from "@/components/marketing/VapiDemoCallPreview"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const demoStates = [
  {
    icon: FileText,
    title: "Read example transcripts",
    body: "See how common plumbing, HVAC, and electrical calls move from first question to a clean next step.",
    status: "Ready to review",
  },
  {
    icon: CalendarClock,
    title: "Review your call setup",
    body: "Before callers are sent to BookedOnCall, place a review call and adjust the flow until it sounds right.",
    status: "Setup review",
  },
  {
    icon: Mic,
    title: "Try the live voice demo",
    body: "Start the live web demo, choose a sample shop, and watch the transcript as you talk.",
    status: "Voice demo",
  },
] as const

export const metadata = buildPageMetadata({
  title: "Demo calls",
  description:
    "Try BookedOnCall demo call paths with a live web voice demo, example transcripts, and setup call review.",
  path: "/demo-calls",
})

export default function DemoCallsPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Demo calls", path: "/demo-calls" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "BookedOnCall demo calls",
          description:
            "Demo call paths showing a live web voice demo, example transcripts, and setup call review.",
          path: "/demo-calls",
        })}
      />
      <PageIntro
        eyebrow="Demo calls"
        title="Try the call flow before a customer hears it."
        description="Start the live voice demo, review example transcripts, and place a setup review call before callers are sent to BookedOnCall."
      />

      <VapiDemoCallPreview />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {demoStates.map((state) => {
            const Icon = state.icon
            return (
              <article key={state.title} className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <Icon className="size-5 text-amber-600" />
                  <span className="rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                    {state.status}
                  </span>
                </div>
                <div className="grid gap-2">
                  <h2 className="text-2xl font-black text-slate-950">{state.title}</h2>
                  <p className="text-sm leading-7 text-slate-600">{state.body}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 rounded-lg border border-slate-200 bg-white p-7 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Buyer checkpoint</p>
            <h2 className="text-3xl font-black text-slate-950">What the demo should prove to you</h2>
          </div>
          <ul className="grid gap-3 text-sm leading-7 text-slate-600">
            <li>Callers get a steady, professional first response instead of voicemail.</li>
            <li>Your shop gets the caller name, callback number, address, issue, urgency, and next step.</li>
            <li>Booking requests stay inside the rules you reviewed during setup.</li>
            <li>Risky, out-of-area, or unclear calls come back for owner review instead of being forced.</li>
          </ul>
        </div>
      </section>

      <CtaBand
        title="Ready to review your call setup?"
        body="Start setup, review the plan that fits, and hear how BookedOnCall handles your call flow before callers hear it."
      />
    </>
  )
}

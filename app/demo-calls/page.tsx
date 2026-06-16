import { CalendarClock, FileText, Mic, ShieldCheck } from "lucide-react"
import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildGetStartedHref } from "@/config/site"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const demoStates = [
  {
    icon: FileText,
    title: "Read example transcripts",
    body: "See how common plumbing, HVAC, and electrical calls move from first question to a clean next step.",
    status: "Ready today",
  },
  {
    icon: CalendarClock,
    title: "Run a private test call",
    body: "Before your live number points at BookedOnCall, you can hear the call flow and review the handoff.",
    status: "Setup step",
  },
  {
    icon: Mic,
    title: "Try a browser voice demo",
    body: "The public browser demo will stay in a sandbox, show a transcript, and avoid real calendar or appointment changes.",
    status: "Guarded demo",
  },
] as const

const transcriptLines = [
  {
    speaker: "Caller",
    line: "Our furnace quit overnight. Do you have anyone who can come out today?",
  },
  {
    speaker: "BookedOnCall",
    line: "I can get the details over to the team. What is the best callback number and service address?",
  },
  {
    speaker: "Caller",
    line: "The best number is 303-555-0129. We are in Lakewood.",
  },
  {
    speaker: "BookedOnCall",
    line: "Thanks. Is the furnace not turning on at all, or is it running without heating?",
  },
  {
    speaker: "Caller",
    line: "It starts, then shuts off after a minute.",
  },
  {
    speaker: "BookedOnCall",
    line: "Got it. I have the symptoms, location, and callback number so this can move to the right next step.",
  },
] as const

export const metadata = buildPageMetadata({
  title: "Demo calls",
  description:
    "See BookedOnCall demo call paths with example transcripts, private test-call setup, and sandbox browser voice demo rules.",
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
            "Demo call paths showing example transcripts, private test-call setup, and sandbox browser voice demo rules.",
          path: "/demo-calls",
        })}
      />
      <PageIntro
        eyebrow="Demo calls"
        title="Try the call flow without risking a real customer call."
        description="Start with example transcripts, move to a private test call during setup, and keep browser voice demos sandboxed away from real calendars and appointments."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="size-5 text-amber-600" />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Safe demo path</p>
            </div>
            <h2 className="mb-4 text-3xl font-black text-slate-950">A demo should build trust before a live number is involved.</h2>
            <p className="text-base leading-8 text-slate-600">
              BookedOnCall is meant to answer consistently, gather clean details, and move a caller toward a booking request or clear callback. The demo path shows that behavior without changing a real schedule or creating a real appointment.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/examples"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "demo_calls_examples", href: "/examples" }}
                className={cn(buttonVariants({ size: "lg" }), "justify-center rounded-xl border-transparent bg-slate-950 px-6 text-white hover:bg-slate-800")}
              >
                See example calls
              </TrackedLink>
              <TrackedLink
                href={buildGetStartedHref(undefined, "website-demo-calls")}
                eventName="signup_started"
                eventPayload={{ placement: "demo_calls_start_setup" }}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "justify-center rounded-xl border-slate-300 px-6 text-slate-950 hover:bg-white")}
              >
                Start setup
              </TrackedLink>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-7 shadow-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Example transcript</p>
            <div className="grid gap-3 text-sm leading-7 text-slate-200">
              {transcriptLines.map((line, index) => (
                <p key={`${line.speaker}-${index}`}>
                  <strong className="text-white">{line.speaker}:</strong> {line.line}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {demoStates.map((state) => {
            const Icon = state.icon
            return (
              <article key={state.title} className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
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
        <div className="mx-auto grid max-w-5xl gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:items-center">
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
        title="Ready to run your private test call?"
        body="Start setup, review the plan that fits, and hear how BookedOnCall handles your call flow before live forwarding."
      />
    </>
  )
}

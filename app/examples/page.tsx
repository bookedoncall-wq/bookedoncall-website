import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  MailCheck,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
} from "lucide-react"
import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

type TranscriptTurn = {
  speaker: "Caller" | "BookedOnCall"
  line: string
}

type SummaryRow = {
  label: string
  value: string
}

const launchAssumptions = [
  "Business profile, services, service area, hours, and owner alert rules are set.",
  "Google Calendar or Jobber is connected when scheduling is turned on.",
  "Email summaries and optional Text / SMS follow-up are set up.",
  "Owner-approved booking is the default unless the owner turns on direct booking.",
] as const

const exampleCalls = [
  {
    title: "HVAC no-cool call with a bookable service",
    trade: "HVAC",
    situation:
      "The shop has no-cool diagnostic calls marked as bookable, the address is in service area, and the connected calendar has openings.",
    outcome: "Booking request pending owner confirmation",
    outcomeDetail:
      "The caller picks an available window. BookedOnCall treats it as a booking request until the owner confirms it.",
    icon: CalendarCheck,
    transcript: [
      {
        speaker: "Caller",
        line: "Our AC is running but blowing warm air. Do you have anything open this week?",
      },
      {
        speaker: "BookedOnCall",
        line: "I can help get that to the HVAC team. What is your name, callback number, and service address?",
      },
      {
        speaker: "Caller",
        line: "This is Jamie. Use the number I called from. The house is in Littleton.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Jamie. Is the system turning on and blowing air, just not cooling?",
      },
      {
        speaker: "Caller",
        line: "Yes, it is blowing air, but it is not cold.",
      },
      {
        speaker: "BookedOnCall",
        line: "That sounds like a no-cool diagnostic. Your area is covered. I can offer a couple of available windows and mark your choice for owner confirmation.",
      },
      {
        speaker: "Caller",
        line: "Tomorrow morning works if you have it.",
      },
      {
        speaker: "BookedOnCall",
        line: "I have a morning window available. I will send that as a booking request. The shop will confirm it before it is final.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: no-cool diagnostic is bookable for this setup.",
      "Service area: address is covered before any appointment path is offered.",
      "Schedule: connected calendar has an available morning window.",
      "Policy: owner confirmation is required before final booking.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Booking request pending owner confirmation" },
      { label: "Priority", value: "Normal service call; no emergency language detected" },
      { label: "Customer", value: "Jamie; callback number captured from caller ID authorization" },
      { label: "Job", value: "AC running but blowing warm air; no-cool diagnostic requested" },
      { label: "Location", value: "In service area after address check" },
      { label: "Scheduling", value: "Morning window selected; owner can confirm or decline" },
      { label: "Follow-up", value: "Email summary sent; optional customer text says the request is pending confirmation" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Jamie. Your appointment request is being reviewed by the shop. You will get confirmation before the visit is final.",
  },
  {
    title: "Plumbing leak call with urgent escalation",
    trade: "Plumbing",
    situation:
      "The caller describes active water leaking. The shop wants urgent calls escalated instead of silently placing them into a normal booking queue.",
    outcome: "Urgent owner alert and callback handoff",
    outcomeDetail:
      "BookedOnCall gathers the needed details, flags the urgency, and avoids quoting or promising a visit time that the owner has not approved.",
    icon: AlertTriangle,
    transcript: [
      {
        speaker: "Caller",
        line: "My water heater is leaking and there is water on the floor. Can someone come today?",
      },
      {
        speaker: "BookedOnCall",
        line: "I can get this over quickly. What is your name, callback number, and the service address?",
      },
      {
        speaker: "Caller",
        line: "It is Morgan. I am calling from the best number. The house is in Denver.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Morgan. Is water still actively leaking or has it stopped?",
      },
      {
        speaker: "Caller",
        line: "It is still leaking into the utility room.",
      },
      {
        speaker: "BookedOnCall",
        line: "I am marking this urgent and sending the details to the owner for fast follow-up. I do not want to promise a time before the shop reviews it.",
      },
      {
        speaker: "Caller",
        line: "Okay, please have them call me.",
      },
      {
        speaker: "BookedOnCall",
        line: "I have the leak, location, and callback details. The shop will have the context when they reach out.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: water-heater leak is recognized as a plumbing call.",
      "Urgency: active leak triggers escalation instead of a routine booking path.",
      "Pricing: no quote is given unless the owner has turned on approved ranges.",
      "Outcome: callback handoff is clear to the caller and owner.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Urgent callback needed" },
      { label: "Priority", value: "High; active leak with water on floor" },
      { label: "Customer", value: "Morgan; callback number captured from caller ID authorization" },
      { label: "Job", value: "Water heater leaking into utility room" },
      { label: "Location", value: "Address captured for service-area review" },
      { label: "Scheduling", value: "No time promised; owner should call back before committing" },
      { label: "Follow-up", value: "Owner alert plus email summary; optional customer text confirms callback request" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Morgan. The shop has your urgent leak details and will follow up. No appointment time has been confirmed yet.",
  },
  {
    title: "Electrical safety call that needs owner review",
    trade: "Electrical",
    situation:
      "The caller has flickering lights and repeated breaker trips. The shop wants these routed for review instead of automatically booking from a generic availability slot.",
    outcome: "Manual-review callback with safety context",
    outcomeDetail:
      "BookedOnCall captures the symptoms and explains the handoff without pretending the call is safe to auto-book.",
    icon: ShieldCheck,
    transcript: [
      {
        speaker: "Caller",
        line: "Lights are flickering in two rooms and a breaker tripped twice this week.",
      },
      {
        speaker: "BookedOnCall",
        line: "I can get the details to the electrical team. What is your name, callback number, and service address?",
      },
      {
        speaker: "Caller",
        line: "This is Avery. The best number is the one I called from. We are in Fort Collins.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Avery. Is anything sparking, smoking, hot to the touch, or causing an immediate safety concern right now?",
      },
      {
        speaker: "Caller",
        line: "No smoke or sparks, but the breaker issue worries me.",
      },
      {
        speaker: "BookedOnCall",
        line: "I have that noted. Because this involves breaker behavior, I am sending it for owner review instead of confirming a visit automatically.",
      },
      {
        speaker: "Caller",
        line: "That makes sense.",
      },
      {
        speaker: "BookedOnCall",
        line: "The shop will receive the symptoms, address, and callback details so they can decide the right next step.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: electrical issue is captured with breaker details.",
      "Risk: safety-sensitive symptoms prevent automatic booking.",
      "Service area: location is captured for owner review.",
      "Outcome: caller understands why this is a callback, not a confirmed appointment.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Manual-review callback" },
      { label: "Priority", value: "Review; no smoke or sparks reported, repeated breaker trips noted" },
      { label: "Customer", value: "Avery; callback number captured from caller ID authorization" },
      { label: "Job", value: "Flickering lights in two rooms; breaker tripped twice this week" },
      { label: "Location", value: "Service-area review needed before scheduling" },
      { label: "Scheduling", value: "No appointment promised; owner should decide" },
      { label: "Follow-up", value: "Email summary sent; optional text confirms the shop will review and call back" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Avery. The shop has the details and will review the electrical concern before confirming the next step.",
  },
] as const

const nextSteps = [
  {
    title: "Try demo calls",
    body: "Try the live web voice demo, then review your own call setup before callers are sent to BookedOnCall.",
    href: "/demo-calls",
  },
  {
    title: "Check pricing",
    body: "See the difference between Starter and Pro, included minutes, and how setup works.",
    href: "/pricing",
  },
  {
    title: "Review integrations",
    body: "See how Jobber, Google Calendar, email summaries, and Text / SMS can fit the call flow, plus planned integrations for QuickBooks, Housecall Pro, and ServiceTitan.",
    href: "/integrations",
  },
] as const

export const metadata = buildPageMetadata({
  title: "Example calls",
  description:
    "Structured example call flows showing BookedOnCall intake, booking requests, urgent escalation, owner summaries, and customer follow-up.",
  path: "/examples",
})

export default function ExamplesPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Example calls", path: "/examples" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "Structured BookedOnCall example calls",
          description:
            "Example call flows for trades businesses showing intake, owner-approved booking requests, callbacks, and summaries.",
          path: "/examples",
        })}
      />
      <PageIntro
        eyebrow="Examples"
        title="See what a handled call should look like."
        description="These examples show the customer-ready flow after setup: what the caller hears, what BookedOnCall checks, what the owner gets back, and what the customer is told."
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">After basic setup</p>
            <h2 className="text-3xl font-black text-slate-950">The examples show a shop after basic setup is complete.</h2>
            <p className="text-base leading-8 text-slate-600">
              They are not generic scripts. They show the intended customer-ready structure when the owner has reviewed services, service area, hours, scheduling, and follow-up rules.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {launchAssumptions.map((assumption) => (
              <div key={assumption} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                <ClipboardList className="mt-1 size-4 shrink-0 text-amber-600" />
                <span>{assumption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10">
          {exampleCalls.map((call) => {
            const Icon = call.icon
            return (
              <article key={call.title} className="grid gap-7 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="grid gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
                        {call.trade}
                      </span>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                        {call.outcome}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-950">{call.title}</h2>
                    <p className="max-w-3xl text-base leading-8 text-slate-600">{call.situation}</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Icon className="size-5 text-amber-600" />
                    <span className="text-sm font-bold text-slate-900">{call.outcomeDetail}</span>
                  </div>
                </div>

                <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="size-4 text-amber-600" />
                      <h3 className="text-xl font-black text-slate-950">Conversation</h3>
                    </div>
                    <div className="grid gap-3">
                      {call.transcript.map((turn, index) => (
                        <p
                          key={`${call.title}-${turn.speaker}-${index}`}
                          className={`max-w-[94%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                            turn.speaker === "BookedOnCall"
                              ? "border border-slate-200 bg-slate-50 text-slate-700"
                              : "justify-self-end bg-amber-100 text-amber-950"
                          }`}
                        >
                          <strong className="block text-xs uppercase tracking-[0.12em] text-slate-500">{turn.speaker}</strong>
                          {turn.line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-amber-600" />
                        <h3 className="text-xl font-black text-slate-950">What BookedOnCall checks</h3>
                      </div>
                      <ul className="grid gap-2 text-sm leading-7 text-slate-700">
                        {call.checks.map((item) => (
                          <li key={item} className="border-l-2 border-amber-200 pl-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-3">
                      <div className="flex items-center gap-2">
                        <MailCheck className="size-4 text-amber-600" />
                        <h3 className="text-xl font-black text-slate-950">Owner summary</h3>
                      </div>
                      <dl className="grid gap-3 text-sm leading-7">
                        {call.ownerSummary.map((row) => (
                          <div key={row.label} className="grid gap-1 border-t border-slate-200 pt-3">
                            <dt className="font-bold text-slate-950">{row.label}</dt>
                            <dd className="text-slate-600">{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-start">
                  <MessageSquareText className="mt-1 size-5 shrink-0 text-amber-600" />
                  <div>
                    <h3 className="text-base font-black text-slate-950">Customer follow-up text or email</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{call.customerFollowUp}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Why this structure matters</p>
            <h2 className="mb-4 text-3xl font-black text-slate-950">The assistant should never fake certainty.</h2>
            <p className="text-base leading-8 text-slate-600">
              A good call does not just sound polite. It knows when to request owner confirmation, when to escalate urgency, when to avoid quoting, and when to hand the job back with clean details.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Buyer path</p>
            <div className="grid gap-3">
              {nextSteps.map((step) => (
                <TrackedLink
                  key={step.title}
                  href={step.href}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "examples_next_step", href: step.href }}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-amber-300 hover:bg-amber-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid gap-1">
                      <h3 className="text-lg font-black text-slate-950">{step.title}</h3>
                      <p className="text-sm leading-6 text-slate-600">{step.body}</p>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-amber-700" />
                  </div>
                </TrackedLink>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CtaBand
        title="Ready to turn example calls into your setup?"
        body="Start with the plan that fits, review the call flow, and go live only when it sounds right."
      />
    </>
  )
}

import { ArrowRight, ClipboardList, PhoneCall, Wrench } from "lucide-react"
import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const exampleCalls = [
  {
    title: "Plumbing leak call",
    callerProblem: "A homeowner calls because a water heater is leaking while your team is already out on jobs.",
    assistantChecks: [
      "Best callback number",
      "Service address",
      "Whether water is actively pooling",
    ],
    shopGetsBack: [
      "Caller name and phone number",
      "Address and urgency",
      "A clear reason to treat it as urgent",
    ],
    transcript: [
      "Caller: My water heater is leaking and I need someone to take a look today if possible.",
      "Assistant: Absolutely, let me get your details. What’s the best number to reach you, and where’s the job?",
      "Caller: 303-555-0188. The address is 412 West Cedar in Denver.",
      "Assistant: Got it. Is the leak steady, or is water pooling up right now?",
      "Caller: There is water pooling in the utility room.",
      "Assistant: Okay. That sounds urgent. I’m noting that now so someone can follow up quickly."
    ]
  },
  {
    title: "HVAC no-cool call",
    callerProblem: "A customer calls because the AC stopped cooling during a hot week and wants the next step fast.",
    assistantChecks: [
      "Callback number and address",
      "Whether the system turns on",
      "Whether it is blowing warm air",
    ],
    shopGetsBack: [
      "Customer details and symptom summary",
      "Enough context to schedule or call back prepared",
      "A clean handoff instead of voicemail guesswork",
    ],
    transcript: [
      "Caller: Our AC stopped working and the house is getting hot fast.",
      "Assistant: Let me help get this moving. What’s a good callback number and your address?",
      "Caller: 720-555-0142. We’re in Littleton.",
      "Assistant: Thanks. Is the system blowing air that’s not cold, or is it not turning on at all?",
      "Caller: It’s blowing, but it isn’t cold.",
      "Assistant: Got it. I have the problem, your number, and the location. Someone can follow up with the next step."
    ]
  },
  {
    title: "Electrical flicker call",
    callerProblem: "A homeowner calls about flickering lights and a breaker that has tripped twice this week.",
    assistantChecks: [
      "Callback number and location",
      "Whether breakers or outlets are involved",
      "Whether the issue sounds urgent or still safe to review",
    ],
    shopGetsBack: [
      "Problem summary with the breaker concern included",
      "Location and callback details",
      "A safer review path before anyone promises a visit",
    ],
    transcript: [
      "Caller: We’ve had flickering lights in two rooms and want someone to check it out.",
      "Assistant: Sure thing. What’s the best number to reach you, and where are you located?",
      "Caller: 970-555-0105. We’re in Fort Collins.",
      "Assistant: Thanks. Is it just the lights, or are outlets or breakers acting up too?",
      "Caller: Mostly lights, but one breaker has tripped twice this week.",
      "Assistant: Thanks. I’ve got the details, including the breaker issue."
    ]
  }
] as const

const nextSteps = [
  {
    title: "Compare the alternatives",
    body: "See where BookedOnCall fits against voicemail, answering services, and other fallback options.",
    href: "/compare/ai-receptionist-vs-voicemail",
  },
  {
    title: "Check pricing",
    body: "See the difference between Starter and Pro, included minutes, and how setup works.",
    href: "/pricing",
  },
  {
    title: "Review integrations",
    body: "See how Jobber and Google Calendar fit in once you want real booking paths.",
    href: "/integrations",
  }
] as const

export const metadata = buildPageMetadata({
  title: "Example calls",
  description:
    "Example call flows showing how BookedOnCall handles common plumbing, HVAC, and electrical scenarios.",
  path: "/examples"
})

export default function ExamplesPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Example calls", path: "/examples" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "Sample BookedOnCall call transcripts",
          description:
            "Example call transcripts for plumbing, HVAC, and electrical service businesses.",
          path: "/examples"
        })}
      />
      <PageIntro
        eyebrow="Examples"
        title="See how a real first response should feel."
        description="Each example shows the caller problem, the questions BookedOnCall asks, and the handoff your shop gets back."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6">
          {exampleCalls.map((call) => (
            <article key={call.title} className="grid gap-6 rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
              <div className="grid gap-3">
                <h2 className="text-3xl font-black text-slate-950">{call.title}</h2>
                <p className="text-base leading-7 text-slate-600">{call.callerProblem}</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <PhoneCall className="size-4 text-amber-600" />
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Caller problem</p>
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{call.callerProblem}</p>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Wrench className="size-4 text-amber-600" />
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Assistant asks</p>
                  </div>
                  <ul className="grid gap-2 text-sm leading-7 text-slate-700">
                    {call.assistantChecks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <ClipboardList className="size-4 text-amber-600" />
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Shop gets back</p>
                  </div>
                  <ul className="grid gap-2 text-sm leading-7 text-slate-700">
                    {call.shopGetsBack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Example conversation</p>
                <div className="grid gap-3 text-sm leading-7 text-slate-200">
                  {call.transcript.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Lower-risk setup</p>
            <h2 className="mb-4 text-3xl font-black text-slate-950">Private test first. Live only when it sounds right.</h2>
            <p className="text-base leading-8 text-slate-600">
              BookedOnCall starts with a private test call so you can hear the flow, review the handoff, and decide what should happen before your live number points at it.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Buyer path</p>
            <div className="grid gap-3">
              {nextSteps.map((step) => (
                <TrackedLink
                  key={step.title}
                  href={step.href}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "examples_next_step", href: step.href }}
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 transition hover:border-amber-300 hover:bg-amber-50"
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
        body="Start with the plan that fits, run a private test call, and go live only when the flow sounds right."
      />
    </>
  )
}

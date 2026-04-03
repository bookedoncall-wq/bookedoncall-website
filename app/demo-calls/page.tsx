import { ComingSoonProof } from "@/components/marketing/ComingSoonProof"
import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const demoCalls = [
  {
    title: "Sample plumbing call",
    scenario: "A homeowner calls about a leaking water heater while you're already out on jobs.",
    transcript: [
      "Caller: My water heater is leaking and I need someone to take a look today if possible.",
      "Assistant: Absolutely, let me get your details. What’s the best number to reach you, and where’s the job?",
      "Caller: 303-555-0188. The address is 412 West Cedar in Denver.",
      "Assistant: Got it. Is the leak steady, or is water pooling up right now?",
      "Caller: There is water pooling in the utility room.",
      "Assistant: Okay. That sounds urgent. I’m noting that now so someone can follow up quickly.",
    ],
    outcome: "You get the caller details, address, urgency, and callback number without relying on voicemail.",
  },
  {
    title: "Sample HVAC call",
    scenario: "A customer calls because their AC stopped cooling during a hot week.",
    transcript: [
      "Caller: Our AC stopped working and the house is getting hot fast.",
      "Assistant: Let me help get this moving. What’s a good callback number and your address?",
      "Caller: 720-555-0142. We’re in Littleton.",
      "Assistant: Thanks. Is the system blowing air that’s not cold, or is it not turning on at all?",
      "Caller: It’s blowing, but it isn’t cold.",
      "Assistant: Got it. I have the problem, your number, and the location. Someone can follow up with the next step.",
    ],
    outcome: "You get symptom details up front so you can book it or call back with the right context.",
  },
  {
    title: "Sample electrical call",
    scenario: "A homeowner calls about flickering lights and wants someone out this week.",
    transcript: [
      "Caller: We’ve had flickering lights in two rooms and want someone to check it out.",
      "Assistant: Sure thing. What’s the best number to reach you, and where are you located?",
      "Caller: 970-555-0105. We’re in Fort Collins.",
      "Assistant: Thanks. Is it just the lights, or are outlets or breakers acting up too?",
      "Caller: Mostly lights, but one breaker has tripped twice this week.",
      "Assistant: Thanks. I’ve got the details, including the breaker issue.",
    ],
    outcome: "You get the details and the breaker concern without forcing a risky instant booking.",
  },
] as const

export const metadata = buildPageMetadata({
  title: "Sample call transcripts",
  description:
    "Illustrative sample call transcripts showing how BookedOnCall can sound on plumbing, HVAC, and electrical calls.",
  path: "/demo-calls",
})

export default function DemoCallsPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Sample call transcripts", path: "/demo-calls" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "Sample BookedOnCall call transcripts",
          description:
            "Illustrative sample call transcripts for plumbing, HVAC, and electrical service businesses.",
          path: "/demo-calls",
        })}
      />
      <PageIntro
        eyebrow="Sample calls"
        title="Illustrative call transcripts."
        description="These are sample call flows, not customer recordings. They show the kind of questions BookedOnCall can ask and the kind of details you can get back."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6">
          {demoCalls.map((call) => (
            <article key={call.title} className="rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
              <div className="mb-5 grid gap-2">
                <h2 className="text-3xl font-black text-slate-950">{call.title}</h2>
                <p className="text-base leading-7 text-slate-600">{call.scenario}</p>
              </div>
              <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {call.transcript.map((line) => (
                  <p key={line} className="text-sm leading-7 text-slate-700">
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                <strong className="text-slate-950">Why it matters:</strong> {call.outcome}
              </p>
            </article>
          ))}
        </div>
      </section>

      <ComingSoonProof
        eyebrow="More proof"
        title="More demos and proof will live here."
        description="The transcript examples are live now. Audio demos, customer proof, and trade-by-trade case studies will be added here as they're ready to publish."
      />

      <CtaBand
        title="Want to hear how this could fit your business?"
        body="See the plans and send your details. We can talk through the kinds of calls you get every week."
      />
    </>
  )
}

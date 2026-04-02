import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const demoCalls = [
  {
    title: "Sample plumbing call",
    scenario: "A homeowner calls about a leaking water heater while your team is already on jobs.",
    transcript: [
      "Caller: My water heater is leaking and I need someone to take a look today if possible.",
      "Assistant: I can help with that. What is the best phone number and service address for this job?",
      "Caller: 303-555-0188. The address is 412 West Cedar in Denver.",
      "Assistant: Thanks. Can you tell me if the leak is steady or if water is pooling right now?",
      "Caller: There is water pooling in the utility room.",
      "Assistant: Got it. I’m marking this as urgent and sending the details through so your team can follow up quickly.",
    ],
    outcome: "The team gets the caller details, address, urgency, and callback number without relying on voicemail.",
  },
  {
    title: "Sample HVAC call",
    scenario: "A customer calls because their AC stopped cooling during a hot week.",
    transcript: [
      "Caller: Our AC stopped working and the house is getting hot fast.",
      "Assistant: I can help get this started. What is the best phone number and address for the service call?",
      "Caller: 720-555-0142. We’re in Littleton.",
      "Assistant: Thank you. Is the system blowing air with no cooling, or is it not turning on at all?",
      "Caller: It’s blowing, but it isn’t cold.",
      "Assistant: Understood. I’ll pass that along with your information so your team can follow up or offer the next available appointment.",
    ],
    outcome: "Your team gets symptom details up front and can decide whether to book or return the call with the right context.",
  },
  {
    title: "Sample electrical call",
    scenario: "A homeowner calls about flickering lights and wants someone out this week.",
    transcript: [
      "Caller: We’ve had flickering lights in two rooms and want someone to check it out.",
      "Assistant: I can help with that. What’s the best callback number and service address?",
      "Caller: 970-555-0105. We’re in Fort Collins.",
      "Assistant: Thanks. Is this affecting only lights, or are outlets and breakers involved too?",
      "Caller: Mostly lights, but one breaker has tripped twice this week.",
      "Assistant: Got it. I’ll send that over so your team can review the details and follow up with the right next step.",
    ],
    outcome: "The caller keeps moving, and your team gets the job details without forcing a risky instant booking.",
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
        eyebrow="Sample call demos"
        title="Illustrative call transcripts."
        description="These are sample call flows, not customer recordings. They show the kind of questions BookedOnCall can ask and the kind of details your team can get back."
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

      <CtaBand
        title="Want to hear how this could fit your business?"
        body="See the plans and send your details. We can talk through the kinds of calls your team gets every week."
      />
    </>
  )
}

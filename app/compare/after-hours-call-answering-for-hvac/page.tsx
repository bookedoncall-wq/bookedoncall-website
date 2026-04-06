import { GuidePage } from "@/components/marketing/GuidePage"
import { sourcedProof } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "After-hours call answering for HVAC",
  description:
    "Why after-hours call answering matters for HVAC companies and how BookedOnCall can help capture urgent heating and cooling leads.",
  path: "/compare/after-hours-call-answering-for-hvac",
})

export default function AfterHoursCallAnsweringForHvacPage() {
  return (
    <GuidePage
      path="/compare/after-hours-call-answering-for-hvac"
      eyebrow="Guide"
      title="After-hours call answering for HVAC."
      description="No-heat and no-cool calls don't wait for office hours. If the phone goes unanswered at the wrong moment, that customer may be on the next call within minutes."
      serviceName="After-hours call answering for HVAC"
      serviceDescription="Why after-hours call answering matters for HVAC businesses and how BookedOnCall can help."
      quickPoints={[
        "Weather spikes make after-hours HVAC responsiveness matter more, not less.",
        "A caller with no heat or no cooling wants a real first response, not a generic mailbox.",
        "The faster you get clean notes, the faster the real next step happens.",
      ]}
      sections={[
        {
          title: "After-hours HVAC calls are usually high-pressure",
          body:
            "No-heat and no-cool calls often come in during the hottest or coldest stretches of the year, which is exactly when you're already buried. That makes the first response more important, not less.",
        },
        {
          title: "The biggest loss isn't just the missed ring",
          body:
            "The real loss is the weak next step. If the caller hears voicemail, leaves a partial message, or hangs up, your office has to start from scratch the next morning and may still lose the job to a faster competitor.",
        },
        {
          title: "What a better setup looks like",
          body:
            "The caller gets a response, the assistant captures the number, address, and symptoms, and you get a clearer handoff. If the request fits your setup, BookedOnCall can move toward the next supported step. If not, it still comes back with clear details for follow-up.",
        },
        {
          title: "How BookedOnCall helps",
          body:
            "BookedOnCall helps HVAC businesses stay responsive after hours without pretending every call should be handled the same way. It captures the basics, keeps the caller moving, and gives you usable context for what happens next.",
        },
      ]}
      proofItems={sourcedProof.filter((item) => item.id !== "bls-receptionist-wage")}
      nextLinks={[
        { label: "See the HVAC page", href: "/for/hvac" },
        { label: "Read sample calls", href: "/examples" },
        { label: "See pricing", href: "/pricing" },
      ]}
      ctaTitle="Need better after-hours HVAC coverage?"
      ctaBody="Read example calls, review the HVAC path, and start setup when you're ready."
    />
  )
}

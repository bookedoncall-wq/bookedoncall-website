import { GuidePage } from "@/components/marketing/GuidePage"
import { sourcedProof } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "After-hours call answering for plumbers",
  description:
    "Why after-hours call answering matters for plumbing businesses and how BookedOnCall can help capture urgent plumbing leads.",
  path: "/compare/after-hours-call-answering-for-plumbers",
})

export default function AfterHoursCallAnsweringForPlumbersPage() {
  return (
    <GuidePage
      path="/compare/after-hours-call-answering-for-plumbers"
      eyebrow="Guide"
      title="After-hours call answering for plumbers."
      description="Plumbing leads don't wait for office hours. If your phone goes unanswered at the wrong moment, that customer may never come back."
      serviceName="After-hours call answering for plumbers"
      serviceDescription="Why after-hours call answering matters for plumbing businesses and how BookedOnCall can help."
      quickPoints={[
        "Urgent plumbing callers usually want reassurance before they want a quote.",
        "After-hours voicemails often turn into next-morning callbacks with thin details.",
        "A stronger first response gives you context before the job goes cold.",
      ]}
      sections={[
        {
          title: "What happens after hours",
          body:
            "Plumbing calls often come in at the worst times: after dinner, late at night, early in the morning, or while you're already buried in jobs. When that call hits voicemail, there's a good chance the customer just calls the next shop.",
        },
        {
          title: "Why plumbers care about first response",
          body:
            "A plumbing lead is often urgent. The caller isn't just comparing prices. They want to know whether someone is going to respond and whether they can trust your shop to show up.",
        },
        {
          title: "What a better setup looks like",
          body:
            "Urgent callers get a response instead of a dead-end voicemail. You get the customer name, number, address, and problem details. Jobs that still need a person come back with clear details for follow-up instead of scattered messages.",
        },
        {
          title: "How BookedOnCall helps",
          body:
            "BookedOnCall gives plumbing businesses a better after-hours first response. It can collect the customer details, capture the problem, and help you follow up faster instead of starting from a rushed voicemail.",
        },
      ]}
      proofItems={sourcedProof.filter((item) => item.id !== "bls-receptionist-wage")}
      nextLinks={[
        { label: "See the plumbing page", href: "/for/plumbers" },
        { label: "Read sample calls", href: "/demo-calls" },
        { label: "See pricing", href: "/pricing" },
      ]}
      ctaTitle="Need better after-hours coverage for plumbing calls?"
      ctaBody="Read example calls, review the plumbing path, and start setup when you're ready."
    />
  )
}

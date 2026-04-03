import { GuidePage } from "@/components/marketing/GuidePage"
import { sourcedProof } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Answering service vs receptionist vs AI receptionist",
  description:
    "A practical comparison of answering services, receptionists, and AI receptionists for trades businesses.",
  path: "/compare/answering-service-vs-receptionist-vs-ai-receptionist",
})

export default function AnsweringServiceVsReceptionistVsAiReceptionistPage() {
  return (
    <GuidePage
      path="/compare/answering-service-vs-receptionist-vs-ai-receptionist"
      eyebrow="Comparison"
      title="Answering service vs receptionist vs AI receptionist."
      description="Most small shops end up choosing between three ways to cover missed calls: hire a receptionist, use an answering service, or use an AI receptionist. The right choice depends on what kind of coverage you need and how much of the workflow you want handled on the first call."
      serviceName="Answering service vs receptionist vs AI receptionist"
      serviceDescription="A practical comparison of answering services, receptionists, and AI receptionists for trades businesses."
      quickPoints={[
        "A receptionist gives broad office coverage, but adds wage and staffing overhead.",
        "An answering service gives coverage, but may still hand you thin notes and generic scripts.",
        "An AI receptionist works best when you want a consistent first response, structured intake, and supported booking or callback handoff.",
      ]}
      sections={[
        {
          title: "What each option is really buying you",
          body:
            "A receptionist buys broad office coverage during staffed hours. An answering service buys outsourced call coverage. An AI receptionist buys a consistent first response that can gather the basics, move supported jobs forward, and hand the rest back cleanly.",
        },
        {
          title: "Where a receptionist is strongest",
          body:
            "A receptionist can do more than answer the phone. They can handle broader office coordination, relationship continuity, and edge cases across the day. That is valuable, but it is a much bigger operating decision than simply solving missed calls.",
        },
        {
          title: "Where answering services often fall short",
          body:
            "Answering services can keep the line covered, but they often rely on generic scripts and may still leave your team with thin notes, partial context, and a second conversation that has to start over.",
        },
        {
          title: "Where BookedOnCall fits",
          body:
            "BookedOnCall fits the middle ground for businesses that want a stronger first response than voicemail or a generic answering service, but are not trying to build a full front desk first. It is built around the trades call flow: capture the job, keep the customer moving, and route the right next step.",
        },
      ]}
      proofItems={sourcedProof.filter((item) => item.id !== "google-missed-calls")}
      nextLinks={[
        { label: "See pricing", href: "/pricing" },
        { label: "Hear a sample call", href: "/demo-calls" },
        { label: "See the product", href: "/product" },
      ]}
      ctaTitle="Want to compare the options against your actual call flow?"
      ctaBody="Talk to us about how your business handles missed calls today and whether BookedOnCall fits that gap."
    />
  )
}

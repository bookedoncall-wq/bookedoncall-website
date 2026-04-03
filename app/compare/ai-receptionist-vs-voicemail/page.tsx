import { GuidePage } from "@/components/marketing/GuidePage"
import { sourcedProof } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "AI receptionist vs voicemail",
  description:
    "A practical comparison of AI call answering versus voicemail for trades businesses that miss calls while they're already on jobs.",
  path: "/compare/ai-receptionist-vs-voicemail",
})

export default function AiReceptionistVsVoicemailPage() {
  return (
    <GuidePage
      path="/compare/ai-receptionist-vs-voicemail"
      eyebrow="Comparison"
      title="AI receptionist vs voicemail."
      description="If you miss calls because everyone is out working, voicemail is usually the fallback. For a lot of trades businesses, it's also where good jobs disappear."
      serviceName="AI receptionist vs voicemail for trades businesses"
      serviceDescription="A practical comparison of AI call answering versus voicemail for trades businesses."
      quickPoints={[
        "Voicemail puts the whole burden on the caller to leave a useful message.",
        "A stronger first response captures better details before the lead goes cold.",
        "After-hours calls and urgent jobs are where the difference shows up fastest.",
      ]}
      sections={[
        {
          title: "Voicemail is a weak first response",
          body:
            "Voicemail may be familiar, but it usually gives you less context and less consistency. Some callers leave detailed messages. Some leave almost nothing. Some hang up and move on to the next shop before your team even gets a chance to call back.",
        },
        {
          title: "The real difference is what happens next",
          body:
            "A better first response does more than pick up the call. It gathers the basics, keeps the caller moving, and gives your team enough detail to decide whether the job should be booked or called back with context.",
        },
        {
          title: "Why this matters most for trades businesses",
          body:
            "This matters most for owner-operators, smaller crews, and growing shops that don't have a full-time receptionist but still want to sound responsive and professional when a new customer calls.",
        },
        {
          title: "Where BookedOnCall fits",
          body:
            "BookedOnCall isn't trying to be a generic contact-center tool. It's built for the home-service call flow: answer the missed call, capture the job details, and either move toward a supported booking or hand the call back as a clean callback.",
        },
      ]}
      proofItems={sourcedProof.filter((item) => item.id !== "bls-receptionist-wage")}
      nextLinks={[
        { label: "Hear a sample call", href: "/demo-calls" },
        { label: "See the product", href: "/product" },
        { label: "See pricing", href: "/pricing" },
      ]}
      ctaTitle="Want something better than voicemail?"
      ctaBody="Hear a sample call, then talk to us about how your business handles missed calls today."
    />
  )
}

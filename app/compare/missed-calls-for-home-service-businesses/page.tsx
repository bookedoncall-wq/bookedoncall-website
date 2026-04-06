import { GuidePage } from "@/components/marketing/GuidePage"
import { sourcedProof } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Missed calls for home-service businesses",
  description:
    "Why missed calls matter for home-service businesses, what a better setup looks like, and how BookedOnCall helps.",
  path: "/compare/missed-calls-for-home-service-businesses",
})

export default function MissedCallsForHomeServiceBusinessesPage() {
  return (
    <GuidePage
      path="/compare/missed-calls-for-home-service-businesses"
      eyebrow="Guide"
      title="Missed calls for home-service businesses."
      description="In home services, the missed call is usually not the real problem. The real problem is what happens next: thin details, slow follow-up, and a lead that goes cold before you get back to it."
      serviceName="Missed calls for home-service businesses"
      serviceDescription="Why missed calls matter for home-service businesses and how BookedOnCall can help."
      quickPoints={[
        "The first response sets the tone before you ever call back.",
        "Urgent jobs, estimate requests, and after-hours calls all break differently when nobody answers.",
        "A stronger setup gives the business usable details instead of a weak voicemail fallback.",
      ]}
      sections={[
        {
          title: "Why missed calls hurt more in the trades",
          body:
            "A lot of good trades businesses are small enough that everyone is in the field but busy enough that new work still arrives by phone. That means the phone often rings at the exact moment nobody can answer it well.",
        },
        {
          title: "The first loss is speed, but the second loss is context",
          body:
            "Even when you call back quickly, a missed call usually creates more cleanup. Someone has to interpret a voicemail, call again to collect the basics, and rebuild context that could have been captured on the first conversation.",
        },
        {
          title: "What a better setup looks like",
          body:
            "The customer gets a response, the basics are captured, and you get enough detail to decide the next step. Some jobs should move toward a booking. Others should come back for review. Either way, the caller shouldn't hit a dead end.",
        },
        {
          title: "How BookedOnCall helps",
          body:
            "BookedOnCall is built for that missed-call problem specifically. It answers when you can't, captures the job details, and either moves the work toward a supported booking or sends it back with clear details for follow-up.",
        },
      ]}
      proofItems={sourcedProof}
      nextLinks={[
        { label: "See the product", href: "/product" },
        { label: "Browse industries", href: "/industries" },
        { label: "Read sample calls", href: "/demo-calls" },
      ]}
      ctaTitle="Want a better setup than missed calls and voicemail?"
      ctaBody="Read example calls, compare the fit, and start setup when you're ready."
    />
  )
}

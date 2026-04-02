import { PageIntro } from "@/components/marketing/PageIntro"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "BookedOnCall privacy information for bookedoncall.com, customer setup, and service operations.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy explains how BookedOnCall handles information collected through bookedoncall.com, customer setup, and operation of the service."
      />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 rounded-[1.75rem] border border-white bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Last updated: {siteConfig.lastUpdated}</p>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">What this site covers</h2>
            <p className="text-base leading-8 text-slate-700">
            This policy covers bookedoncall.com, customer inquiries, setup, and use of the BookedOnCall service, including connected integrations and call records.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">What information we collect</h2>
            <p className="text-base leading-8 text-slate-700">
            We may receive contact details you provide directly, website usage data, and business information shared during setup and ongoing use of BookedOnCall.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Third-party services</h2>
            <p className="text-base leading-8 text-slate-700">
            BookedOnCall may use third-party providers for payments, authentication, communications, and connected scheduling. Jobber and Google Calendar only apply when your business has connected those services.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Data deletion and service closure</h2>
            <p className="text-base leading-8 text-slate-700">
            Requests related to service closure, business data handling, or deletion should be sent to {siteConfig.privacyEmail}.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Contact</h2>
            <p className="text-base leading-8 text-slate-700">Privacy questions can be sent to {siteConfig.privacyEmail}.</p>
          </section>
        </div>
      </section>
    </>
  )
}

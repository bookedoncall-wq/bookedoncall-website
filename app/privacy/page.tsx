import { PageIntro } from "@/components/marketing/PageIntro"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "BookedOnCall privacy information for the public marketing site and the app-owned onboarding flow.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        description="This public site describes the current BookedOnCall launch posture accurately. The app owns checkout, onboarding, and business provisioning, and connected integrations are configured at the business level."
      />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 rounded-[1.75rem] border border-white bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Last updated: {siteConfig.lastUpdated}</p>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">What this site covers</h2>
            <p className="text-base leading-8 text-slate-700">
            This policy covers the public marketing site, app-owned onboarding handoff, and the contact paths exposed on bookedoncall.com. Business-level runtime data, call logs, integrations, and owner dashboard activity are handled on the app side.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">What information we collect</h2>
            <p className="text-base leading-8 text-slate-700">
            We may receive contact details you provide directly, event data about CTA and onboarding flow usage, and business/account information created on the app side during checkout and onboarding.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Third-party services</h2>
            <p className="text-base leading-8 text-slate-700">
            BookedOnCall may use third-party providers for payments, authentication, communications, and connected scheduling. Jobber and Google Calendar behavior only applies when a business has explicitly connected those services in the owner dashboard.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Data deletion and account closure</h2>
            <p className="text-base leading-8 text-slate-700">
            Requests related to account closure, business data handling, or deletion should be sent to {siteConfig.privacyEmail}. This public site does not offer a separate dashboard-only deletion control outside the app-owned account flow.
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

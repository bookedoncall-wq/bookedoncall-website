import { PageIntro } from "@/components/marketing/PageIntro"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "BookedOnCall terms covering website access, subscriptions, account setup, and use of the service.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Terms of Service"
        description="These terms govern use of bookedoncall.com, subscriptions, account setup, and use of the BookedOnCall service."
      />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 rounded-[1.75rem] border border-white bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Last updated: {siteConfig.lastUpdated}</p>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Service overview</h2>
            <p className="text-base leading-8 text-slate-700">
            BookedOnCall provides AI-assisted inbound call handling, structured intake capture, scheduling, and follow-up workflows for trades businesses. Scheduling, messaging, and integration behavior depend on your configuration and connected accounts.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Subscriptions and billing</h2>
            <p className="text-base leading-8 text-slate-700">
            Pricing is displayed on bookedoncall.com. Checkout, account creation, and subscription management occur through your BookedOnCall account. Overage billing is based on the plan attached to your business.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Connected systems</h2>
            <p className="text-base leading-8 text-slate-700">
            Third-party integrations such as Jobber and Google Calendar are optional and business-controlled. Availability of a connected service does not change these terms or create a guarantee that every workflow will write through automatically.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Operational responsibility</h2>
            <p className="text-base leading-8 text-slate-700">
            Customers remain responsible for reviewing their business configuration, service catalog, availability rules, pricing, and escalation behavior in their dashboard.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Contact</h2>
            <p className="text-base leading-8 text-slate-700">Questions about these terms can be sent to {siteConfig.legalEmail}.</p>
          </section>
        </div>
      </section>
    </>
  )
}

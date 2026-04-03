import { PageIntro } from "@/components/marketing/PageIntro"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Data Processing Addendum",
  description:
    "BookedOnCall data processing addendum for customer setup and service operations.",
  path: "/dpa",
})

export default function DpaPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Data Processing Addendum"
        description="This summary DPA describes how BookedOnCall processes customer data to provide call answering, connected integrations, and account support."
      />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 rounded-[1.75rem] border border-white bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Last updated: {siteConfig.lastUpdated}</p>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Roles</h2>
            <p className="text-base leading-8 text-slate-700">
              Customers act as controllers for the business and customer data they provide through BookedOnCall. BookedOnCall processes that data only as needed to deliver the service.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Scope</h2>
            <p className="text-base leading-8 text-slate-700">
              Processing may include contact details, call summaries, business setup details, connected integration identifiers, and service records needed to run the product.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Subprocessors and connected services</h2>
            <p className="text-base leading-8 text-slate-700">
              Payment, authentication, communications, and connected scheduling providers may process data as needed for the service. Jobber and Google Calendar processing only applies when a customer has connected those integrations.
            </p>
          </section>
          <section className="grid gap-3">
            <h2 className="text-2xl font-black text-slate-950">Contact</h2>
            <p className="text-base leading-8 text-slate-700">DPA requests can be sent to {siteConfig.legalEmail}.</p>
          </section>
        </div>
      </section>
    </>
  )
}

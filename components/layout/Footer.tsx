import { buildLeadFormHref, secondaryNav, siteConfig } from "@/config/site"
import { TrackedLink } from "@/components/marketing/TrackedLink"

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Product", href: "/product" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Industries",
    links: secondaryNav.filter((item) => item.href.startsWith("/for/")),
  },
  {
    title: "Integrations",
    links: [
      { label: "Integrations", href: "/integrations" },
      ...secondaryNav.filter((item) => item.href.startsWith("/integrations/")),
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "Sample Calls", href: "/demo-calls" },
      { label: "AI vs Voicemail", href: "/compare/ai-receptionist-vs-voicemail" },
      { label: "Missed Calls Guide", href: "/compare/missed-calls-for-home-service-businesses" },
      { label: "FAQ", href: "/faq" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "DPA", href: "/dpa" },
      { label: "Contact", href: `mailto:${siteConfig.email}` },
    ],
  },
] as const

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] lg:items-start">
          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-lg font-black tracking-tight text-white">
              <span>
                BookedOn<span className="text-amber-400">Call</span>
              </span>
              <span className="inline-block h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-400">{siteConfig.description}</p>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href={buildLeadFormHref(undefined, "website-footer")}
                eventName="signup_started"
                eventPayload={{ placement: "footer_primary" }}
                className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-100"
              >
                Talk to us
              </TrackedLink>
              <TrackedLink
                href="/demo-calls"
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "footer_secondary", href: "/demo-calls" }}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-slate-500 hover:bg-slate-900"
              >
                Read sample calls
              </TrackedLink>
            </div>
          </div>

          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title} className="grid content-start gap-3">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{column.title}</h2>
                <div className="grid gap-2">
                  {column.links.map((link) => (
                    <TrackedLink
                      key={link.href}
                      href={link.href}
                      eventName={link.href.startsWith("mailto:") ? "contact_sales_clicked" : "marketing_cta_clicked"}
                      eventPayload={{ placement: "footer_link", href: link.href }}
                      className="text-sm leading-6 text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </TrackedLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. AI call answering for trades businesses.</p>
          <p>Questions? {siteConfig.email}</p>
        </div>
      </div>
    </footer>
  )
}

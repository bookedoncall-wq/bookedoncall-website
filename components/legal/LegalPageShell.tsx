import type { ReactNode } from "react"
import Link from "next/link"
import { PageIntro } from "@/components/marketing/PageIntro"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "DPA", href: "/dpa" },
  { label: "Contact", href: "/contact" },
] as const

type LegalSummaryItem = {
  title: string
  body: string
}

type LegalPageShellProps = {
  currentPath: string
  title: string
  description: string
  summaryItems: LegalSummaryItem[]
  children: ReactNode
}

export function LegalPageShell({ currentPath, title, description, summaryItems, children }: LegalPageShellProps) {
  return (
    <>
      <PageIntro eyebrow="Legal" title={title} description={description} />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <div className="grid gap-5 rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
              <div className="grid gap-1">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Legal</p>
                <p className="text-sm leading-7 text-slate-600">
                  Short summaries appear first for readability. The full document below controls if there is any conflict.
                </p>
              </div>
              <nav className="grid gap-2" aria-label="Legal pages">
                {legalLinks.map((link) => {
                  const active = link.href === currentPath
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex min-h-12 w-full items-center rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                        active
                          ? "border-amber-300 bg-amber-50 text-amber-900"
                          : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950",
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                Questions about legal terms, privacy, or data processing can be sent to{" "}
                <a href={`mailto:${siteConfig.legalEmail}`} className="font-semibold text-slate-900 underline underline-offset-4">
                  {siteConfig.legalEmail}
                </a>
                .
              </div>
            </div>
          </aside>

          <div className="grid gap-8">
            <div className="grid gap-6 rounded-[1.75rem] border border-white bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Last updated: {siteConfig.lastUpdated}</p>
                <p className="text-sm leading-7 text-slate-600">Summary only for convenience. The full text below governs.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {summaryItems.map((item) => (
                  <div key={item.title} className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h2 className="text-base font-black text-slate-950">{item.title}</h2>
                    <p className="text-sm leading-7 text-slate-700">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-10 rounded-[1.75rem] border border-white bg-white p-8 shadow-sm sm:p-10">{children}</div>
          </div>
        </div>
      </section>
    </>
  )
}

type LegalSectionProps = {
  title: string
  children: ReactNode
  id?: string
}

export function LegalSection({ title, children, id }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 grid gap-4">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="grid gap-4 text-base leading-8 text-slate-700">{children}</div>
    </section>
  )
}

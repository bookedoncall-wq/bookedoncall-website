import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { faqEntries } from "@/config/marketing"
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about BookedOnCall pricing, integrations, onboarding, bookings, callbacks, and follow-up.",
  path: "/faq",
})

export default function FaqPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])} />
      <StructuredData data={buildFaqSchema(faqEntries)} />
      <PageIntro
        eyebrow="FAQ"
        title="Questions worth answering before you pay."
        description="These answers explain how BookedOnCall works for pricing, setup, scheduling, and follow-up."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-4">
          {faqEntries.map((entry) => (
            <article key={entry.question} className="rounded-[1.5rem] border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">{entry.question}</h2>
              <p className="text-base leading-8 text-slate-600">{entry.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

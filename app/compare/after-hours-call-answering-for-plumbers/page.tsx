import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const sections = [
  {
    title: "What happens after hours",
    body:
      "Plumbing calls often come in at the worst times: after dinner, late at night, early in the morning, or while the whole crew is already buried in jobs. When that call hits voicemail, there is a good chance the customer just calls the next shop.",
  },
  {
    title: "Why plumbers care about first response",
    body:
      "A plumbing lead is often urgent. The caller is not just comparing prices. They want to know whether someone is going to respond and whether they can trust your shop to show up.",
  },
  {
    title: "Where BookedOnCall fits",
    body:
      "BookedOnCall gives plumbing businesses a better after-hours first response. It can collect the customer details, capture the problem, and help your team follow up faster instead of starting from a rushed voicemail.",
  },
] as const

export const metadata = buildPageMetadata({
  title: "After-hours call answering for plumbers",
  description:
    "Why after-hours call answering matters for plumbing businesses and how BookedOnCall can help capture urgent plumbing leads.",
  path: "/compare/after-hours-call-answering-for-plumbers",
})

export default function AfterHoursCallAnsweringForPlumbersPage() {
  return (
    <>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "After-hours call answering for plumbers", path: "/compare/after-hours-call-answering-for-plumbers" },
        ])}
      />
      <StructuredData
        data={buildServiceSchema({
          name: "After-hours call answering for plumbers",
          description:
            "Why after-hours call answering matters for plumbing businesses and how BookedOnCall can help.",
          path: "/compare/after-hours-call-answering-for-plumbers",
        })}
      />
      <PageIntro
        eyebrow="Guide"
        title="After-hours call answering for plumbers."
        description="Plumbing leads do not wait for office hours. If your phone goes unanswered at the wrong moment, that customer may never come back."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
              <h2 className="mb-4 text-3xl font-black text-slate-950">{section.title}</h2>
              <p className="text-base leading-8 text-slate-700">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
            <h2 className="mb-4 text-3xl font-black text-slate-950">What a better setup looks like</h2>
            <ul className="grid gap-3 text-sm leading-7 text-slate-700">
              <li>Urgent callers get a response instead of a dead-end voicemail.</li>
              <li>Your team gets the customer name, number, address, and problem details.</li>
              <li>Jobs that need a person still come back as clean callbacks instead of scattered messages.</li>
            </ul>
          </article>
        </div>
      </section>

      <CtaBand
        title="Need better after-hours coverage for plumbing calls?"
        body="See the plans and tell us how your shop wants to handle urgent calls, callbacks, and scheduling."
      />
    </>
  )
}

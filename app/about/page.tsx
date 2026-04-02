import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "BookedOnCall helps trades businesses answer calls, capture job details, and route follow-up without losing leads to voicemail.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "About BookedOnCall",
          description:
            "BookedOnCall is built to help trades businesses answer calls, capture structured intake, and move faster on booked work or callbacks.",
          path: "/about",
        })}
      />
      <PageIntro
        eyebrow="About"
        title="Built for trades teams that miss calls while they are working."
        description="BookedOnCall exists to help home-service businesses answer more inbound calls, capture the right details, and move faster on booked work or callbacks."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">Why it exists</h2>
            <p className="text-base leading-8 text-slate-600">
              Trades businesses lose work when calls hit voicemail while the team is on site. BookedOnCall exists to answer those calls, capture the details the office actually needs, and help the team move from first contact to a booked job or callback faster.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black text-slate-950">What it helps with</h2>
            <p className="text-base leading-8 text-slate-600">
              BookedOnCall helps with missed-call coverage, after-hours intake, lead qualification, callback capture, and supported scheduling for businesses that have configured that workflow.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-3xl font-black text-slate-950">How BookedOnCall is designed</h2>
            <p className="text-base leading-8 text-slate-600">
              The product is designed to collect clear intake, respect your scheduling rules, and hand off anything that needs a person. That keeps the workflow practical for real trades businesses instead of forcing every call into the same path.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        title="Want to see if BookedOnCall fits your business?"
        body="Review pricing, choose a plan, and set up the workflow that matches how your team handles calls."
      />
    </>
  )
}

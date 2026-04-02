import { Heart, Phone, Target, Users } from "lucide-react"
import { ComingSoonProof } from "@/components/marketing/ComingSoonProof"
import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { siteConfig } from "@/config/site"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

const values = [
  {
    icon: Phone,
    title: "Every call matters",
    description:
      "Behind every ring is a homeowner with a problem and a tradesperson who can solve it. We built BookedOnCall to help those two connect more often.",
  },
  {
    icon: Users,
    title: "Built for smaller teams",
    description:
      "The solo plumber, the two-person HVAC crew, the family-run electrical business. They deserve the same level of responsiveness as a company with a full front desk.",
  },
  {
    icon: Heart,
    title: "Respect the trade",
    description:
      "Tradespeople keep homes running and communities functioning. The technology around them should support that work, not talk down to it or get in the way.",
  },
  {
    icon: Target,
    title: "Keep it practical",
    description:
      "If a tool is hard to set up, hard to trust, or hard to use when the phone rings, it does not belong in a real trades business.",
  },
] as const

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "The story behind BookedOnCall and why it was built for trades businesses that lose jobs when calls go unanswered.",
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
            "The story behind BookedOnCall and the mission to help trades businesses answer more calls and book more jobs.",
          path: "/about",
        })}
      />
      <PageIntro
        eyebrow="About us"
        title="Why we built BookedOnCall."
        description="BookedOnCall exists because too many great trades businesses lose good jobs simply because they cannot answer the phone while they are doing the work."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6">
          <article className="rounded-[1.75rem] border border-white bg-white p-7 shadow-sm">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-800">
              <Heart className="size-4" />
              The founder&apos;s story
            </div>
            <div className="grid gap-5 text-base leading-8 text-slate-700">
              <p>
                I grew up around the trades. My family, my neighbors, and the people I looked up to were plumbers,
                electricians, HVAC techs, and contractors. I watched them leave early, work hard, and build strong
                reputations by doing the job right.
              </p>
              <p>
                I also watched the phone ring while they were on a ladder, under a sink, or halfway through a job.
                Sometimes the call went to voicemail. Sometimes it came at dinner or late at night. A lot of the time,
                the customer never left a message. They just moved on to the next company that picked up.
              </p>
              <p>
                That problem stayed with me. Years later, while I was having work done on my own house, I saw the same
                thing again. Great tradespeople were losing work, not because they were worse at the job, but because
                they did not have someone free to answer the phone every time it rang.
              </p>
              <p>
                That felt backward. The small, family-run, and owner-operated shops are often the businesses customers
                trust most. But they do not always have the budget for a receptionist or a front office. They should
                not have to choose between doing the work well and catching the next opportunity.
              </p>
              <p className="font-semibold text-slate-950">
                BookedOnCall was built to help fix that. The goal is simple: help trades businesses answer more calls,
                book more good jobs, and stop losing work just because their hands were full.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
              <div className="flex size-14 items-center justify-center rounded-full bg-amber-500 text-lg font-black text-white">DC</div>
              <div>
                <p className="text-lg font-black text-slate-950">David Carley</p>
                <p className="text-sm text-slate-500">Founder, {siteConfig.name}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-800">
              <Target className="size-4" />
              Our north star
            </div>
            <h2 className="mb-4 text-3xl font-black text-slate-950">No trades business should lose a good job because nobody could answer the phone.</h2>
            <p className="max-w-3xl text-base leading-8 text-slate-700">
              That idea drives the product. If something helps a trades business answer more calls, capture better
              details, and move faster on real work, it belongs in BookedOnCall. If it does not, it is noise.
            </p>
          </article>

          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <article key={value.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <value.icon className="size-6" />
                </div>
                <h3 className="mb-2 text-xl font-black text-slate-950">{value.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ComingSoonProof
        title="More of the story will live here."
        description="As BookedOnCall grows, this is where we will publish sample calls, customer proof, and case studies that show how real trades businesses are using it."
      />

      <CtaBand
        title="Want to see if BookedOnCall fits your business?"
        body="Review pricing, ask questions, and choose the plan that matches the way your team handles calls."
      />
    </>
  )
}

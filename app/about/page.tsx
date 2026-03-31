import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import {
  Heart,
  Target,
  Users,
  Wrench,
  Phone,
  Star,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About",
  description:
    "About BookedOnCall: founded to solve missed calls for trades professionals. AI-powered call answering so plumbers, electricians, and HVAC techs never lose a job because they couldn't pick up the phone.",
  alternates: { canonical: `${siteConfig.url}/about` },
}

const values = [
  {
    icon: Phone,
    title: "Every Call Matters",
    description:
      "Behind every ring is a homeowner with a problem and a tradesperson who can solve it. We exist to make sure those two connect, every single time.",
  },
  {
    icon: Users,
    title: "Built for the Little Guy",
    description:
      "The solo plumber, the two-person HVAC crew, the electrician running the whole show alone. They deserve the same professionalism as a company with a front desk.",
  },
  {
    icon: Heart,
    title: "Respect the Trade",
    description:
      "Tradespeople build and fix the world with their hands. We build technology that honors that work. We never replace it. We always support it.",
  },
  {
    icon: Target,
    title: "Simple by Design",
    description:
      "If it takes an hour to set up or a manual to operate, we've failed. BookedOnCall should feel as natural as answering your own phone, only faster.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white py-28 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-amber-200">
            <Heart className="w-3.5 h-3.5" />
            Our Story
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Missed Calls Are<br />
            <span className="text-amber-500">Missed Paychecks</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            BookedOnCall exists because the hardest-working people in America
            shouldn&apos;t lose jobs just because their hands were full.
          </p>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="bg-slate-50 py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The Founder&apos;s Story
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
            <p className="text-lg leading-relaxed">
              I grew up around the trades. My family, my neighbors, the people I looked up to
              as a kid were plumbers, electricians, HVAC techs, and contractors. I watched
              them leave for work before sunrise and come home after dark, building and fixing
              the things the rest of us take for granted. They took immense pride in their craft,
              and the community trusted them with their homes.
            </p>

            <p className="text-lg leading-relaxed">
              But I also watched something else: the phone would ring while they were elbow-deep
              in a job, and it would go to voicemail. Or it would ring at dinner, on a Saturday
              morning, at 10 p.m. on a Tuesday. And more often than not, the caller didn&apos;t
              leave a message. They just called someone else. That&apos;s the harsh reality of the
              trades: <span className="font-semibold text-slate-900">missed calls are missed money</span>.
              I saw it firsthand growing up, and I saw it again years later when I was having my
              own house renovated.
            </p>

            <p className="text-lg leading-relaxed">
              The contractor doing my renovation was one of the best in the area. Meticulous work,
              fair pricing, great reputation. But he was constantly losing leads because he was a
              one-man operation. While he was on a ladder or under a sink, potential customers were
              calling and getting silence. The big outfits with dedicated receptionists and office
              staff were scooping up the work, not because they were better at the trade, but
              because they could answer the phone.
            </p>

            <p className="text-lg leading-relaxed">
              That felt deeply wrong to me. The solopreneur, the two-person crew, the family-run
              business, <span className="font-semibold text-slate-900">they&apos;re the backbone of this industry</span>.
              They do exceptional work. They show up, they care, they stand behind what they build.
              But they don&apos;t have the resources for a full-time receptionist. They can&apos;t afford
              to hire someone just to answer the phone. And they shouldn&apos;t have to choose between
              doing great work and booking the next job.
            </p>

            <p className="text-lg leading-relaxed">
              That&apos;s why I built BookedOnCall. Not to replace the personal touch, but to make sure
              it&apos;s there even when the tradesperson can&apos;t be. An AI receptionist that picks up
              your calls, qualifies the caller, checks your schedule, and books the job so you
              never lose work just because your hands were full.
            </p>

            <p className="text-lg leading-relaxed font-semibold text-slate-900">
              My goal is to democratize what the big companies have always had and make it accessible
              to every trades professional so they can grow their livelihood, provide quality service
              to their customers, and never have to worry about what they might be missing.
            </p>
          </div>

          {/* Founder signature */}
          <div className="mt-12 flex items-center gap-4 border-t border-slate-200 pt-8">
            <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">DC</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-lg">David Carley</p>
              <p className="text-slate-500 text-sm">Founder, BookedOnCall</p>
              <a
                href={siteConfig.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-500 font-medium mt-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NORTH STAR & VALUES */}
      <section className="bg-white py-28 px-4">
        <div className="max-w-4xl mx-auto">
          {/* North Star */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-amber-200">
              <Star className="w-3.5 h-3.5" />
              Our North Star
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-5">
              No tradesperson should ever lose a job<br />because they couldn&apos;t answer the phone.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Every feature we build, every decision we make, comes back to this single idea.
              If it doesn&apos;t help a trades professional answer more calls and book more jobs,
              it doesn&apos;t belong in BookedOnCall.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border border-slate-200 shadow-sm">
                <CardContent className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                    <value.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Wrench className="w-12 h-12 text-amber-400 mx-auto mb-5" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            We&apos;re building this for you.
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            BookedOnCall is launching soon. Join the waitlist to be the first to know and
            to help shape what we build next.
          </p>
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 rounded-lg border-transparent"
            )}
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  )
}

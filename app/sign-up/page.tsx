import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { CheckCircle, Zap, Phone, CalendarCheck, Wrench, Mail, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description:
    "BookedOnCall is launching soon. Join the waitlist to be the first to know when we go live.",
  alternates: { canonical: `${siteConfig.url}/sign-up` },
}

const highlights = [
  { icon: Phone, text: "AI answers every call on the first ring" },
  { icon: CalendarCheck, text: "Books appointments directly into your calendar" },
  { icon: Wrench, text: "Integrates with Jobber and Google Calendar" },
  { icon: Zap, text: "Quick, guided setup — we walk you through it" },
]

export default function WaitlistPage() {
  return (
    <section className="bg-slate-50 min-h-screen py-28 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-full mb-5 border border-amber-200">
            <Zap className="w-3.5 h-3.5" />
            Coming Soon
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Be the First to Know
          </h1>
          <p className="text-slate-600 text-lg">
            BookedOnCall is launching soon. Join the waitlist and we&apos;ll let you know the moment
            you can start answering every call automatically.
          </p>
        </div>

        {/* Main card */}
        <Card className="border border-slate-200 shadow-md bg-white">
          <CardContent className="p-8">
            {/* What you'll get */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-7">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                What&apos;s coming
              </p>
              <div className="space-y-3">
                {highlights.map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-sm text-slate-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Email CTA */}
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-4">
                Drop us your email and we&apos;ll reach out as soon as we&apos;re ready:
              </p>
              <a
                href={`mailto:${siteConfig.email}?subject=Waitlist%20-%20I%27m%20interested%20in%20BookedOnCall&body=Hi%20BookedOnCall%20team%2C%0A%0AI%27m%20interested%20in%20joining%20the%20waitlist.%0A%0AMy%20name%3A%20%0AMy%20trade%3A%20%0AMy%20city%2Fstate%3A%20%0A%0AThanks!`}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-base bg-amber-500 hover:bg-amber-400 text-white shadow-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                Join the Waitlist
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-slate-400 text-center mt-3">
                No spam, ever. Just a heads-up when we launch.
              </p>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col gap-2 mt-7 pt-6 border-t border-slate-100">
              {[
                "Early access for waitlist members",
                "Starting at $250/month when we launch",
                "Plans include Jobber + Google Calendar integration",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learn more */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Want to learn more first?{" "}
          <Link
            href="/how-it-works"
            className="text-amber-600 font-semibold hover:text-amber-500 underline underline-offset-2"
          >
            See how it works
          </Link>
        </p>
      </div>
    </section>
  )
}

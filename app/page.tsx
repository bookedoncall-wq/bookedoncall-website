import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { plans } from "@/config/pricing"
import { HeroGraphic } from "@/components/sections/HeroGraphic"
import {
  PhoneMissed,
  Voicemail,
  HardHat,
  Phone,
  CalendarCheck,
  MessageSquare,
  Zap,
  Clock,
  Check,
  Wrench,
  Play,
  ArrowRight,
} from "lucide-react"

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text column */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-amber-200">
                <Zap className="w-3.5 h-3.5" />
                AI-powered call answering for trades businesses
              </div>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
                Every Call Answered.<br />
                <span className="text-amber-500">Every Job Booked.</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
                While you&apos;re working, we&apos;re answering. BookedOnCall picks up every call,
                qualifies the lead, and books the appointment — automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 text-lg rounded-lg shadow-md border-transparent"
                  )}
                >
                  Join the Waitlist
                </Link>
                <Link
                  href="/how-it-works"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "font-semibold px-8 text-lg rounded-lg border-slate-300"
                  )}
                >
                  See How It Works
                </Link>
              </div>
              {/* Trade type pills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {siteConfig.trades.map((trade) => (
                  <Badge
                    key={trade}
                    variant="secondary"
                    className="bg-slate-100 text-slate-600 border border-slate-200 text-sm px-3 py-1 rounded-full font-medium"
                  >
                    {trade}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Graphic column — hidden on mobile */}
            <div className="hidden lg:flex flex-1 justify-center items-center">
              <HeroGraphic className="w-72 h-auto drop-shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFIT BAR */}
      <section className="bg-slate-950 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: Phone, text: "Answers on the first ring" },
              { icon: Clock, text: "Works 24/7 — nights & weekends" },
              { icon: Zap, text: "Quick, guided setup" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2 text-white">
                <item.icon className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="bg-white py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Every missed call is a missed paycheck
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
              You&apos;re on the job. Your phone rings. Here&apos;s what happens next — and what it costs you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
                  <PhoneMissed className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Missed calls = missed jobs</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Most callers won&apos;t leave a voicemail — they&apos;ll call your competitor instead. Every
                  unanswered ring is real revenue walking out the door.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
                  <Voicemail className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">First to answer wins the job</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Even if they leave a message, they&apos;ve already called someone else. Response time wins
                  jobs in the trades — and we answer on the first ring.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
                  <HardHat className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Your hands are full</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  You&apos;re in the middle of a job. You can&apos;t stop to take calls, and you shouldn&apos;t have to.
                  That&apos;s what BookedOnCall is for.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (BRIEF) */}
      <section className="bg-slate-50 py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              While You&apos;re Working, We&apos;re Answering.
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
              Set up once. Then forget about it. Every call handled.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Phone,
                title: "Customer calls",
                desc: "Your business number rings. BookedOnCall picks up instantly — every time, day or night.",
              },
              {
                step: "2",
                icon: CalendarCheck,
                title: "AI qualifies & books",
                desc: "The AI captures the caller's info, checks your schedule, and books the appointment on the spot.",
              },
              {
                step: "3",
                icon: MessageSquare,
                title: "You get a text",
                desc: "You receive an SMS summary with the caller's name, service needed, and appointment details.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center shadow-md">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/how-it-works"
              className={cn(buttonVariants({ variant: "outline" }), "border-slate-300 font-semibold")}
            >
              See the full call flow &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES HIGHLIGHT */}
      <section className="bg-white py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Everything a receptionist does — automated
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
              No training required. No sick days. No overtime.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                title: "AI Voice Answering",
                desc: "Sounds professional, handles every call like a trained receptionist.",
              },
              {
                icon: CalendarCheck,
                title: "Instant Booking",
                desc: "Syncs with your calendar and books the job in real time, no back-and-forth.",
              },
              {
                icon: MessageSquare,
                title: "SMS Confirmations",
                desc: "Callers get instant text confirmation. You get a summary notification.",
              },
              {
                icon: Zap,
                title: "Jobber & Calendar Sync",
                desc: "Plugs directly into Jobber and Google Calendar — tools you already use.",
              },
            ].map((feat) => (
              <Card
                key={feat.title}
                className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
                    <feat.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/features"
              className={cn(buttonVariants({ variant: "outline" }), "border-slate-300 font-semibold")}
            >
              View all features &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* AUDIO DEMO */}
      <section className="bg-slate-950 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-amber-500/20">
            <Phone className="w-3.5 h-3.5" />
            Hear it in action
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Listen to a sample call
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Hear how BookedOnCall handles a real plumbing inquiry — from greeting to booking confirmation.
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
              <Play className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-white font-semibold mb-2">Audio Demo</p>
            <p className="text-slate-500 text-sm mb-6">Sample call: Emergency plumbing booking</p>
            <div className="bg-slate-800 rounded-lg h-12 flex items-center justify-center">
              <p className="text-slate-500 text-sm">Coming soon — demo recording in progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
            Works with tools you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { name: "Jobber", icon: Wrench },
              { name: "Google Calendar", icon: CalendarCheck },
              { name: "SMS Notifications", icon: MessageSquare },
            ].map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm"
              >
                <tool.icon className="w-5 h-5 text-slate-700" />
                <span className="font-semibold text-slate-800">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="bg-white py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              One answered call can pay for the whole month.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`border-2 shadow-sm relative ${
                  plan.highlighted ? "border-amber-500 shadow-amber-100" : "border-slate-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-500 text-white font-semibold px-3 py-0.5">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-7">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {plan.features.slice(0, 5).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sign-up"
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-base transition-colors",
                      plan.highlighted
                        ? "bg-amber-500 hover:bg-amber-400 text-white shadow-sm"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    )}
                  >
                    Join the Waitlist
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-sm text-amber-600 font-semibold hover:text-amber-500 underline underline-offset-2"
            >
              View full pricing details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-950 py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Stop missing calls.<br />
            <span className="text-amber-400">Start booking more jobs.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Quick setup. Works with Jobber and Google Calendar. One answered call can pay for the whole month.
          </p>
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-amber-500 hover:bg-amber-400 text-white font-bold px-10 text-lg rounded-lg shadow-lg border-transparent"
            )}
          >
            Join the Waitlist
          </Link>
          <p className="text-slate-600 text-sm mt-4">Launching soon — be first in line</p>
        </div>
      </section>
    </>
  )
}

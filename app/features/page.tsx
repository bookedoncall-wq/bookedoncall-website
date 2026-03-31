import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/button-variants"
import { siteConfig } from "@/config/site"
import {
  Phone,
  UserCheck,
  CalendarCheck,
  BookOpen,
  MessageSquare,
  DollarSign,
  MapPin,
  AlertTriangle,
  Wrench,
  CalendarDays,
  TrendingUp,
  FileText,
  BarChart2,
  Users,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Features",
  description:
    "BookedOnCall features: AI voice answering, lead qualification, automatic booking, SMS confirmations, Jobber and Google Calendar integration, emergency detection, and more for trades businesses.",
  alternates: { canonical: `${siteConfig.url}/features` },
}

const features = [
  {
    icon: Phone,
    name: "AI Voice Answering",
    description:
      "Your calls are answered fast by a natural-sounding AI voice. No robotic tone, no long pauses. Callers hear your business name and feel like they reached a real receptionist.",
  },
  {
    icon: UserCheck,
    name: "Lead Qualification",
    description:
      "The AI asks the right questions to determine if the caller is a qualified lead: what service they need, their location, their timeline, and their budget expectations. All before any booking happens.",
  },
  {
    icon: CalendarCheck,
    name: "Real-Time Availability Check",
    description:
      "Before confirming a time slot, BookedOnCall checks your live calendar to make sure the slot is actually open. No double-bookings, no embarrassing callbacks to reschedule.",
  },
  {
    icon: BookOpen,
    name: "Automatic Booking",
    description:
      "Qualified leads are booked directly into your calendar and Jobber. No manual entry, no copy-pasting. The appointment shows up ready for your morning, exactly how you configured it.",
  },
  {
    icon: MessageSquare,
    name: "SMS Confirmations & Reminders",
    description:
      "Every caller gets an SMS confirmation with appointment details immediately after booking. Automated reminders before the job cut no-show rates significantly.",
  },
  {
    icon: DollarSign,
    name: "Pricing Presentation",
    description:
      "The AI shares your configured service rates, trip fees, and diagnostic charges during the call so callers know what to expect before you arrive. Fewer sticker-shock cancellations.",
  },
  {
    icon: MapPin,
    name: "Service Area Verification",
    description:
      "Set your service radius by zip codes or miles from your base. BookedOnCall verifies the caller's address before booking so you never show up to a job 45 minutes outside your area.",
  },
  {
    icon: AlertTriangle,
    name: "Emergency Detection & Escalation",
    description:
      "The AI detects emergency language in natural conversation and escalates immediately. You get an urgent SMS alert, and the caller is offered your emergency line or on-call contact.",
  },
  {
    icon: Wrench,
    name: "Jobber Integration",
    description:
      "Newly booked jobs are automatically created in Jobber with client details, service type, and appointment time pre-filled. Your Jobber workflow stays clean and up to date.",
  },
  {
    icon: CalendarDays,
    name: "Google Calendar Integration",
    description:
      "BookedOnCall reads your Google Calendar to check availability and writes new appointments back in real time. Works with personal calendars and Google Workspace accounts.",
  },
  {
    icon: TrendingUp,
    name: "Upsell Prompts",
    description:
      "The AI includes natural upsell prompts, like mentioning a seasonal tune-up when booking HVAC or a drain cleaning when booking plumbing. Increase average job value without any extra effort.",
  },
  {
    icon: FileText,
    name: "Call Transcripts & Summaries",
    description:
      "Every call produces a full transcript and a plain-English summary: who called, what they needed, what was booked, and any special notes. Accessible from your dashboard and emailed to you.",
  },
  {
    icon: BarChart2,
    name: "Usage Dashboard",
    description:
      "See how many calls were answered, how many jobs were booked, your busiest days and hours, and how close you are to your monthly plan limits. Know your numbers at a glance.",
  },
  {
    icon: Users,
    name: "Team Member Access",
    description:
      "Add office staff or a co-owner to your account so they can view call history, update availability, and manage settings without needing full admin access.",
  },
]

export default function FeaturesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white py-28 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Everything You Need,<br />
            <span className="text-amber-500">Nothing You Don&apos;t</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            BookedOnCall is purpose-built for trades professionals, not bloated enterprise software.
            Every feature here earns its place.
          </p>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="bg-slate-50 py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.name}
                className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-amber-500 py-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            All of this, starting at $250/month
          </h2>
          <p className="text-amber-100 text-lg mb-10">
            One answered call can pay for the whole month. Quick, guided setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white hover:bg-amber-50 text-amber-600 font-bold px-8 rounded-lg shadow border-transparent"
              )}
            >
              Join the Waitlist
            </Link>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-amber-700 hover:bg-amber-800 text-white font-bold px-8 rounded-lg border-transparent"
              )}
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

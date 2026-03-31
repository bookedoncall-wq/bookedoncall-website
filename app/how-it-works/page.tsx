import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/lib/button-variants"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import {
  Phone,
  Bot,
  User,
  MapPin,
  DollarSign,
  CalendarCheck,
  MessageSquare,
  AlertTriangle,
  PhoneCall,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How BookedOnCall works: AI answers your business calls, qualifies leads, checks your calendar, and books appointments automatically. Integrates with Jobber and Google Calendar.",
  alternates: { canonical: `${siteConfig.url}/how-it-works` },
}

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Customer calls your business number",
    description:
      "A potential customer dials your forwarded business number. BookedOnCall picks up fast so they never hit voicemail. Available 24/7, including evenings and weekends.",
    detail: "Your existing phone number can be forwarded directly, or we provide a new local number.",
  },
  {
    number: "02",
    icon: Bot,
    title: "BookedOnCall answers immediately",
    description:
      "Your AI booking assistant greets the caller with a professional, natural-sounding introduction using your business name. No robotic tone. Callers engage naturally and get the help they need right away.",
    detail:
      "Example: \"Thanks for calling Mike's Plumbing! I'm the booking assistant. I can get you scheduled today. What's going on?\"",
  },
  {
    number: "03",
    icon: User,
    title: "AI captures name and service needed",
    description:
      "BookedOnCall asks the right qualifying questions: what service do you need, is this an emergency, when are you available? It captures the caller's name, phone number, and full job details.",
    detail: "The AI handles interruptions, accents, and unclear answers the way a real person would.",
  },
  {
    number: "04",
    icon: MapPin,
    title: "Checks your service area and availability",
    description:
      "Before booking, BookedOnCall verifies the caller's address is within your defined service area and checks your real-time calendar for available slots. No double-bookings. No out-of-area jobs.",
    detail: "Syncs live with Google Calendar and Jobber to see your actual availability.",
  },
  {
    number: "05",
    icon: DollarSign,
    title: "Presents pricing and gets confirmation",
    description:
      "The AI shares your standard service rates and any diagnostic or trip fees, exactly how you've configured them. The caller confirms they're ready to proceed before anything gets booked.",
    detail: "You control the pricing script. Edit it anytime from your dashboard.",
  },
  {
    number: "06",
    icon: CalendarCheck,
    title: "Books the appointment and sends SMS confirmation",
    description:
      "The job is added to your calendar. The caller receives an SMS confirmation with the appointment details. You receive a text notification with a full summary: name, address, service, time, and any notes.",
    detail: "Calendar event and Jobber job are created automatically. Zero manual entry needed.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white py-28 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-amber-200">
            <Phone className="w-3.5 h-3.5" />
            From call to booked
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            From Call to Booked<br />in Minutes
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Here&apos;s exactly what happens when a customer calls your number. Most calls go from first ring to confirmed booking in just a few minutes.
          </p>
        </div>
      </section>

      {/* STEP-BY-STEP */}
      <section className="bg-slate-50 py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <Card className="border border-slate-200 shadow-sm bg-white">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Step number + icon */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-2">
                        <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow">
                          <step.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 tracking-wider">
                          STEP {step.number}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">{step.description}</p>
                        <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
                          <p className="text-sm text-amber-800 font-medium">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowRight className="w-5 h-5 text-amber-400 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDGE CASES */}
      <section className="bg-white py-28 px-4 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Handles the unexpected too
            </h2>
            <p className="text-slate-600 mt-4 text-lg leading-relaxed">
              Not every call is a straightforward booking. BookedOnCall is built to handle edge cases
              gracefully, without leaving anyone on hold or sending them to voicemail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Complex jobs */}
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-5">
                  <PhoneCall className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Complex or unusual requests</h3>
                <p className="text-slate-600 leading-relaxed mb-5">
                  When a caller has an unusual request, needs a custom quote, or asks something outside
                  the standard flow, BookedOnCall captures their information and ensures nothing falls through the cracks.
                </p>
                <ul className="space-y-2">
                  {[
                    "AI captures the caller's info for a live callback from you",
                    "Full call details and notes are forwarded to you via SMS immediately",
                    "Job is flagged as needing your review in the dashboard",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Emergency handling */}
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-5">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Emergency handling</h3>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Burst pipe at midnight? Gas smell? BookedOnCall detects emergency language, captures the
                  caller&apos;s details, and gets you notified urgently. No voicemail, no waiting.
                </p>
                <ul className="space-y-2">
                  {[
                    "Emergency keyword detection in natural conversation",
                    "You receive an urgent SMS alert with caller details right away",
                    "Caller is offered your emergency callback or on-call number",
                    "Emergency rate information shared upfront",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-950 py-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <MessageSquare className="w-12 h-12 text-amber-400 mx-auto mb-5" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to never miss a call again?
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Works with Jobber and Google Calendar. One answered call can pay for the whole month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 rounded-lg border-transparent"
              )}
            >
              Join the Waitlist
            </Link>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-slate-700 text-slate-300 hover:bg-slate-800 rounded-lg"
              )}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

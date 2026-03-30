import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { CheckCircle, ArrowRight, Building2, Phone, MapPin, Zap, ShieldCheck, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Start answering calls automatically. Set up BookedOnCall in under 10 minutes.",
  alternates: { canonical: `${siteConfig.url}/sign-up` },
}

const setupSteps = [
  { icon: Building2, label: "Business info", sub: "Name, trade type, service details" },
  { icon: Phone, label: "Phone number", sub: "Forward your existing number or get a new one" },
  { icon: MapPin, label: "Service area", sub: "Set your coverage radius and zip codes" },
  { icon: Zap, label: "Integrations", sub: "Connect Jobber and Google Calendar" },
]

export default function SignUpPage() {
  return (
    <section className="bg-slate-50 min-h-screen py-28 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-full mb-5 border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secure checkout — takes under 10 minutes
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Start Answering Calls Today
          </h1>
          <p className="text-slate-600 text-lg">
            Stop missing calls. Start booking jobs automatically.
          </p>
        </div>

        {/* Main card */}
        <Card className="border border-slate-200 shadow-md bg-white">
          <CardContent className="p-8">
            {/* Trust signals */}
            <div className="flex flex-col gap-2 mb-7">
              {[
                { icon: CheckCircle, text: "Secure payment via Stripe" },
                { icon: Clock, text: "10-minute setup — we walk you through it" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-slate-600">
                  <item.icon className="w-4 h-4 text-amber-500 shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>

            {/* Setup preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-7">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                What you&apos;ll set up
              </p>
              <div className="space-y-3">
                {setupSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <step.icon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{step.label}</p>
                      <p className="text-xs text-slate-500">{step.sub}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400 font-bold">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA — routes to pricing to select plan & pay */}
            <Link
              href="/pricing"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-base bg-amber-500 hover:bg-amber-400 text-white shadow-sm transition-colors border-transparent"
            >
              Choose Your Plan
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-slate-400 text-center mt-3">
              Choose a plan, pay securely, then set up your account.
            </p>
          </CardContent>
        </Card>

        {/* Already have an account */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <a
            href={siteConfig.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 font-semibold hover:text-amber-500 underline underline-offset-2"
          >
            Log in
          </a>
        </p>
      </div>
    </section>
  )
}

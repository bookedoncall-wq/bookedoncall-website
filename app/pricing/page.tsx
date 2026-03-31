import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { plans } from "@/config/pricing"
import { Check, HelpCircle, Phone, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "BookedOnCall pricing: AI call answering for trades businesses starting at $250/month. Includes Jobber integration, Google Calendar sync, SMS confirmations. No setup fees, cancel anytime.",
  alternates: { canonical: `${siteConfig.url}/pricing` },
}

const faqs = [
  {
    question: "What happens if I go over my minutes?",
    answer:
      "If you exceed your plan's included minutes, additional minutes are billed at $0.75/minute at the end of your billing cycle. You'll receive a notification when you're at 80% of your included minutes so there are no surprises.",
  },
  {
    question: "Can I change plans?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time from your account dashboard. Upgrades take effect immediately; downgrades take effect at the start of your next billing period.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No setup fee, ever. Your first month's subscription is collected when you activate your account. Onboarding and configuration support is included at no extra charge.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from your account settings at any time. Your service continues until the end of your current billing period. No long-term contracts, no cancellation fees.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* HERO */}
      <section className="bg-white py-28 px-4 border-b border-slate-100">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Priced to Pay for Itself
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            One answered call can pay for the whole month. No setup fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* PLAN CARDS */}
      <section className="bg-slate-50 py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`border-2 relative ${
                  plan.highlighted
                    ? "border-amber-500 shadow-xl shadow-amber-100"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-500 text-white font-semibold px-4 py-1 text-sm shadow">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  {/* Plan header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{plan.name}</h2>
                    <p className="text-slate-500 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-extrabold text-slate-900">${plan.price}</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">
                    {plan.minutes} minutes included
                  </p>

                  <Separator className="mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Waitlist CTA */}
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
                  <p className="text-xs text-slate-400 text-center mt-3">
                    Billed monthly. Cancel anytime.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overage note */}
          <div className="mt-10 max-w-2xl mx-auto">
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Simple as a pre-paid phone plan</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    You get a block of minutes each month. Use them for as many calls as you need.
                    If you go over, extra minutes are{" "}
                    <span className="font-semibold text-slate-900">$0.75/minute</span>, added to
                    your next invoice automatically. Track your usage anytime from your dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="bg-white border-y border-slate-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Check, label: "No setup fees", sub: "Start immediately, pay monthly" },
              { icon: Clock, label: "Cancel anytime", sub: "No long-term contracts" },
              { icon: HelpCircle, label: "Onboarding included", sub: "We help you get configured" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-amber-500" />
                </div>
                <p className="font-bold text-slate-900">{item.label}</p>
                <p className="text-sm text-slate-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-16 text-center tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-7">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm pl-7">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-slate-950 py-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Every call answered starts here.
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Works with Jobber and Google Calendar, tools you already use.
          </p>
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-amber-500 hover:bg-amber-400 text-white font-bold max-w-xs mx-auto text-lg px-10 py-4 rounded-lg border-transparent"
            )}
          >
            Join the Waitlist
          </Link>
          <p className="text-slate-600 text-sm mt-4">
            Launching soon. Be first in line.
          </p>
        </div>
      </section>
    </>
  )
}

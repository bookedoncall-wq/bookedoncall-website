import { ArrowRight, CalendarClock, ClipboardList, PhoneCall, ShieldCheck } from "lucide-react"
import { CtaBand } from "@/components/marketing/CtaBand"
import { PageIntro } from "@/components/marketing/PageIntro"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { afterCallArtifacts, productFlowSteps } from "@/config/marketing"
import { buildGetStartedHref, integrations, positioning, primaryCtaLabel, sourcedProof, validatedCapabilities } from "@/config/site"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Product",
  description: positioning.oneLiner,
  path: "/product",
})

export default function ProductPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Product", path: "/product" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "BookedOnCall product overview",
          description: positioning.oneLiner,
          path: "/product",
        })}
      />
      <PageIntro
        eyebrow="Product"
        title="The AI phone assistant for trades businesses that want a better first response."
        description={positioning.oneLiner}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">What it replaces</p>
            <h2 className="mb-4 text-3xl font-black text-slate-950">A missed call, a rushed voicemail, or a lead that goes cold.</h2>
            <p className="text-base leading-8 text-slate-700">
              BookedOnCall is built for the moment when the phone rings and you can&apos;t stop what you&apos;re doing to answer it. It gives that caller a real first response, captures the details, and helps move the job toward the right next step.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
            <div className="mb-6 flex items-center gap-3">
              <PhoneCall className="size-5 text-amber-300" />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">What happens on a call</p>
            </div>
            <div className="grid gap-4 text-sm leading-7 text-slate-200">
              <p>
                <strong>Caller:</strong> “Our AC stopped working and the house is getting hot.”
              </p>
              <p>
                <strong>Assistant:</strong> “I can help with that. What’s the best callback number and the service address?”
              </p>
              <p>
                <strong>Next step:</strong> BookedOnCall gets the basics first, then the job can move toward a booking if it fits your setup, or come back to your team with clear details for follow-up.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">How it works</p>
            <h2 className="text-4xl font-black text-slate-950">Three steps, one job: keep the call moving.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {productFlowSteps.map((step, index) => (
              <article key={step.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
                  <span>Step {index + 1}</span>
                  <ArrowRight className="size-4" />
                </div>
                <h3 className="mb-3 text-2xl font-black text-slate-950">{step.title}</h3>
                <p className="text-base leading-7 text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">After the call</p>
            <h2 className="text-4xl font-black text-slate-950">You get something usable, not just a message.</h2>
            <p className="text-lg leading-8 text-slate-600">
              The goal isn&apos;t to sound clever. The goal is to give you enough context to act quickly.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {afterCallArtifacts.map((artifact, index) => (
              <article
                key={artifact.title}
                className={`rounded-[1.75rem] border p-6 shadow-sm ${index === 1 ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-slate-50"}`}
              >
                <div className="mb-4 flex items-center gap-3">
                  {index === 0 ? <ClipboardList className="size-5 text-amber-600" /> : null}
                  {index === 1 ? <CalendarClock className="size-5 text-amber-600" /> : null}
                  {index === 2 ? <ShieldCheck className="size-5 text-amber-600" /> : null}
                  <h3 className="text-xl font-black text-slate-950">{artifact.title}</h3>
                </div>
                <p className="text-sm leading-7 text-slate-700">{artifact.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">What it handles well</p>
            <div className="grid gap-3">
              {validatedCapabilities.map((capability) => (
                <div key={capability} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                  {capability}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Fits the tools you already use</p>
            <div className="grid gap-4">
              {integrations.map((integration) => (
                <TrackedLink
                  key={integration.id}
                  href={`/integrations/${integration.id}`}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "product_integration", href: `/integrations/${integration.id}` }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition-colors hover:border-amber-300 hover:bg-amber-50/40"
                >
                  <span
                    className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${integration.status === "coming_soon" ? "border border-amber-300 bg-white text-amber-800" : "border border-emerald-200 bg-emerald-50 text-emerald-800"}`}
                  >
                    {integration.status === "coming_soon" ? "Coming soon*" : "Available now"}
                  </span>
                  <p className="mb-2 text-lg font-black text-slate-950">{integration.name}</p>
                  <p className="text-sm leading-7 text-slate-600">{integration.description}</p>
                </TrackedLink>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4 text-center">
            <p className="mx-auto text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Outside numbers</p>
            <h2 className="text-4xl font-black text-slate-950">A few outside numbers worth knowing.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {sourcedProof.map((item) => (
              <article key={item.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mb-4 text-sm leading-7 text-slate-700">{item.detail}</p>
                <TrackedLink
                  href={item.sourceUrl}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "product_source", href: item.sourceUrl }}
                  className="text-sm font-bold text-amber-700 underline decoration-amber-300 underline-offset-4"
                >
                  Source: {item.sourceLabel}
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Ready to see how it fits?</p>
            <h2 className="text-3xl font-black text-slate-950">Read sample calls or talk through your setup.</h2>
            <p className="text-base leading-8 text-slate-600">
              If you want to know whether BookedOnCall fits your business, hear how the calls sound and see how the flow would work for your shop.
            </p>
          </div>
          <div className="grid gap-3">
            <TrackedLink
              href="/examples"
              eventName="marketing_cta_clicked"
              eventPayload={{ placement: "product_demo", href: "/examples" }}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-amber-300 hover:bg-amber-50/40"
            >
              Read sample calls
            </TrackedLink>
            <TrackedLink
              href={buildGetStartedHref(undefined, "website-product")}
              eventName="signup_started"
              eventPayload={{ placement: "product_primary" }}
              className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-slate-800"
            >
              {primaryCtaLabel}
            </TrackedLink>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to talk through your call flow?"
        body="Tell us how your shop handles incoming calls today and we&apos;ll help set the right flow."
      />
    </>
  )
}

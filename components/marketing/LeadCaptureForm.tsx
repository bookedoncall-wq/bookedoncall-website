"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { customerLoginPath, plans, siteConfig, supportedTrades } from "@/config/site"
import { trackMarketingEvent } from "@/lib/analytics"
import {
  containsProviderSecretLikeContent,
  getIntegrationReviewCopy,
  normalizeLeadSource,
  providerSecretMessage,
} from "@/lib/integration-review-intake"

type FormState = {
  name: string
  businessName: string
  trade: string
  phone: string
  email: string
  planInterest: string
  details: string
  website: string
}

const defaultPlanId = plans[0]?.id ?? "starter"

function getPlanFromSearchParams(searchParams: URLSearchParams) {
  const plan = searchParams.get("plan")?.trim().toLowerCase()
  return plans.find((item) => item.id === plan)?.id ?? defaultPlanId
}

function buildLeadEmailText(lead: FormState & { source: string }) {
  const reviewCopy = getIntegrationReviewCopy(lead.source)
  const reviewLines = reviewCopy
    ? [
        `Lead type: Assisted ${reviewCopy.provider} integration review`,
        "Provider credential policy: no provider credentials should be collected through the public form.",
        "",
        "Review intake checklist:",
        ...reviewCopy.include.map((item) => `- ${item}`),
        "",
      ]
    : []

  return [
    `New ${siteConfig.name} website lead`,
    "",
    ...reviewLines,
    `Name: ${lead.name}`,
    `Business name: ${lead.businessName}`,
    `Primary trade: ${lead.trade}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "Not provided"}`,
    `Plan: ${lead.planInterest}`,
    `Source: ${lead.source || "website-form"}`,
    "",
    "Notes:",
    lead.details || "None provided",
  ].join("\n")
}

function buildLeadMailtoHref(lead: FormState & { source: string }) {
  const reviewCopy = getIntegrationReviewCopy(lead.source)
  const subject = reviewCopy
    ? `${siteConfig.name} ${reviewCopy.provider} review lead`
    : `${siteConfig.name} ${lead.planInterest || "Starter"} lead`
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildLeadEmailText(lead))}`
}

export function LeadCaptureForm() {
  const searchParams = useSearchParams()
  const selectedPlanFromUrl = useMemo(() => getPlanFromSearchParams(searchParams), [searchParams])
  const source = useMemo(() => normalizeLeadSource(searchParams.get("source")), [searchParams])
  const reviewCopy = useMemo(() => getIntegrationReviewCopy(source), [source])

  const [form, setForm] = useState<FormState>({
    name: "",
    businessName: "",
    trade: "",
    phone: "",
    email: "",
    planInterest: "",
    details: "",
    website: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [mailtoHref, setMailtoHref] = useState("")
  const planInterest = form.planInterest || selectedPlanFromUrl

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setMessage("")
    setMailtoHref("")

    const payload = {
      ...form,
      planInterest,
      source,
    }

    if (containsProviderSecretLikeContent(form.details)) {
      setErrors({ details: providerSecretMessage })
      setStatus("error")
      setMessage(providerSecretMessage)
      return
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })

      const body = (await response.json()) as {
        ok?: boolean
        message?: string
        errors?: Record<string, string>
        delivery?: "mailto" | "resend"
        mailtoHref?: string
      }

      if (!response.ok || !body.ok) {
        setErrors(body.errors || {})
        setStatus("error")
        setMessage(
          body.message ||
            (body.errors && Object.keys(body.errors).length
              ? "Please fix the highlighted fields and try again."
              : "We could not submit your request. Please try again.")
        )
        return
      }

      trackMarketingEvent("lead_form_submitted", {
        placement: "sign_up_form",
        planId: planInterest,
        trade: form.trade,
        delivery: body.delivery || "mailto",
      })

      setStatus("success")
      setMessage(body.message || "Your email app should open with your details filled in. Send that email to complete the setup request.")
      setMailtoHref(body.delivery === "mailto" ? body.mailtoHref || "" : "")
      setErrors({})
      setForm((current) => ({
        ...current,
        details: "",
        website: "",
      }))

      if (body.delivery === "mailto" && body.mailtoHref) {
        window.location.href = body.mailtoHref
      }
    } catch {
      const fallbackMailtoHref = buildLeadMailtoHref(payload)
      trackMarketingEvent("lead_form_submitted", {
        placement: "sign_up_form",
        planId: planInterest,
        trade: form.trade,
        delivery: "mailto",
        fallbackReason: "client_request_failed",
      })
      setStatus("success")
      setMessage("We could not submit through the website, so your email app should open with your details filled in. Send that email to complete the setup request.")
      setMailtoHref(fallbackMailtoHref)
      setErrors({})
      window.location.href = fallbackMailtoHref
    }
  }

  return (
    <section id="lead-form" className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-3">
        <h2 className="text-2xl font-black text-slate-950">{reviewCopy ? reviewCopy.title : "Request setup"}</h2>
        <p className="text-base leading-7 text-slate-600">
          {reviewCopy
            ? reviewCopy.description
            : "Tell us about your shop, your current phone coverage, and the plan you are considering. We will follow up with the right setup path and send you into the app when your account is ready."}
        </p>
      </div>

      {reviewCopy ? (
        <div className="mt-5 grid gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-slate-700">
          <p className="font-bold text-slate-950">What to include for {reviewCopy.provider}</p>
          <ul className="grid gap-2">
            {reviewCopy.include.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="font-semibold text-amber-900">{providerSecretMessage}</p>
        </div>
      ) : null}

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Your name
            <input
              name="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
              autoComplete="name"
            />
            {errors.name ? <span className="text-sm text-red-600">{errors.name}</span> : null}
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Business name
            <input
              name="businessName"
              value={form.businessName}
              onChange={(event) => updateField("businessName", event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
              autoComplete="organization"
            />
            {errors.businessName ? <span className="text-sm text-red-600">{errors.businessName}</span> : null}
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Primary trade
            <select
              name="trade"
              value={form.trade}
              onChange={(event) => updateField("trade", event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
            >
              <option value="">Choose the closest starting point</option>
              {supportedTrades.map((trade) => (
                <option key={trade} value={trade}>
                  {trade}
                </option>
              ))}
            </select>
            <span className="text-xs leading-5 text-slate-500">
              This sets the starting template. Add secondary services, like tile, flooring, or handyman work, in the notes.
            </span>
            {errors.trade ? <span className="text-sm text-red-600">{errors.trade}</span> : null}
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Best phone number
            <input
              name="phone"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
              autoComplete="tel"
            />
            {errors.phone ? <span className="text-sm text-red-600">{errors.phone}</span> : null}
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email address (optional)
            <input
              name="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
              autoComplete="email"
            />
            {errors.email ? <span className="text-sm text-red-600">{errors.email}</span> : null}
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Plan
            <select
              name="planInterest"
              value={planInterest}
              onChange={(event) => updateField("planInterest", event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
            >
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
            {errors.planInterest ? <span className="text-sm text-red-600">{errors.planInterest}</span> : null}
          </label>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          What should we know before we set you up?
          <textarea
            name="details"
            value={form.details}
            onChange={(event) => updateField("details", event.target.value)}
            className="min-h-36 rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
            placeholder={
              reviewCopy
                ? reviewCopy.placeholder
                : "Tell us about your actual services, secondary trades you handle, scheduling setup, after-hours calls, or anything else we should know before onboarding."
            }
          />
          {errors.details ? <span className="text-sm text-red-600">{errors.details}</span> : null}
        </label>

        <label className="hidden">
          Leave this empty
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => updateField("website", event.target.value)}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : reviewCopy ? "Request review" : "Request setup"}
          </button>
          <p className="text-sm leading-6 text-slate-500">
            Already a customer?{" "}
            <a href={customerLoginPath} className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4">
              Use customer login.
            </a>
          </p>
        </div>

        {message ? (
          <p
            className={status === "success" ? "text-sm font-semibold text-green-700" : "text-sm font-semibold text-red-600"}
            aria-live="polite"
        >
          {message}
          {mailtoHref ? (
            <>
              {" "}
              <a href={mailtoHref} className="underline decoration-green-300 underline-offset-4">
                Open the email draft again.
              </a>
            </>
          ) : null}
        </p>
      ) : null}
      </form>
    </section>
  )
}

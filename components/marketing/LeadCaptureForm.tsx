"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { plans, supportedTrades } from "@/config/site"
import { trackMarketingEvent } from "@/lib/analytics"

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

export function LeadCaptureForm() {
  const searchParams = useSearchParams()
  const selectedPlanFromUrl = useMemo(() => getPlanFromSearchParams(searchParams), [searchParams])

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

    const payload = {
      ...form,
      planInterest,
      source: searchParams.get("source") || "website-form",
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
      }

      if (!response.ok || !body.ok) {
        setErrors(body.errors || {})
        setStatus("error")
        setMessage(body.message || "We could not submit your request. Please try again.")
        return
      }

      trackMarketingEvent("lead_form_submitted", {
        placement: "sign_up_form",
        planId: planInterest,
        trade: form.trade,
      })

      setStatus("success")
      setMessage("Thanks. We received your details and will follow up soon.")
      setErrors({})
      setForm((current) => ({
        ...current,
        details: "",
        website: "",
      }))
    } catch {
      setStatus("error")
      setMessage("We could not submit your request. Please try again.")
    }
  }

  return (
    <section id="lead-form" className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-3">
        <h2 className="text-2xl font-black text-slate-950">Tell us about your business</h2>
        <p className="text-base leading-7 text-slate-600">
          Fill this out and we will follow up to talk through your trade, schedule, and how you want BookedOnCall to handle calls.
        </p>
      </div>

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Your name
            <input
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
              value={form.businessName}
              onChange={(event) => updateField("businessName", event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
              autoComplete="organization"
            />
            {errors.businessName ? <span className="text-sm text-red-600">{errors.businessName}</span> : null}
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Trade
            <select
              value={form.trade}
              onChange={(event) => updateField("trade", event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
            >
              <option value="">Choose your trade</option>
              {supportedTrades.map((trade) => (
                <option key={trade} value={trade}>
                  {trade}
                </option>
              ))}
            </select>
            {errors.trade ? <span className="text-sm text-red-600">{errors.trade}</span> : null}
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Best phone number
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
              autoComplete="tel"
            />
            {errors.phone ? <span className="text-sm text-red-600">{errors.phone}</span> : null}
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Email address
            <input
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
          What should we know about your calls?
          <textarea
            value={form.details}
            onChange={(event) => updateField("details", event.target.value)}
            className="min-h-36 rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-950 outline-none transition focus:border-amber-400"
            placeholder="Tell us about your trade, scheduling setup, after-hours calls, or anything else you want us to know."
          />
        </label>

        <label className="hidden">
          Leave this empty
          <input
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
            {status === "submitting" ? "Sending..." : "Send my details"}
          </button>
          <p className="text-sm leading-6 text-slate-500">We will follow up personally. No fake instant demo, no spam.</p>
        </div>

        {message ? (
          <p
            className={status === "success" ? "text-sm font-semibold text-green-700" : "text-sm font-semibold text-red-600"}
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}
      </form>
    </section>
  )
}

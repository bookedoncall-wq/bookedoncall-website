import { NextResponse } from "next/server"
import { siteConfig } from "@/config/site"

export const runtime = "nodejs"

type LeadPayload = {
  name?: unknown
  businessName?: unknown
  trade?: unknown
  phone?: unknown
  email?: unknown
  planInterest?: unknown
  details?: unknown
  source?: unknown
  website?: unknown
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function normalizeEmail(value: unknown) {
  const email = normalizeText(value).toLowerCase()
  return email
}

function normalizeLead(payload: LeadPayload) {
  return {
    name: normalizeText(payload.name),
    businessName: normalizeText(payload.businessName),
    trade: normalizeText(payload.trade),
    phone: normalizeText(payload.phone),
    email: normalizeEmail(payload.email),
    planInterest: normalizeText(payload.planInterest),
    details: normalizeText(payload.details),
    source: normalizeText(payload.source),
    website: normalizeText(payload.website),
  }
}

function validateLead(lead: ReturnType<typeof normalizeLead>) {
  const errors: Record<string, string> = {}

  if (!lead.name) {
    errors.name = "Enter your name."
  }
  if (!lead.businessName) {
    errors.businessName = "Enter your business name."
  }
  if (!lead.trade) {
    errors.trade = "Choose your trade."
  }
  if (!lead.phone) {
    errors.phone = "Enter the best phone number to reach you."
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.email = "Enter a valid email address."
  }
  if (!lead.planInterest) {
    errors.planInterest = "Choose the plan you are most interested in."
  }

  return errors
}

function buildLeadMailtoHref(lead: ReturnType<typeof normalizeLead>) {
  const subject = `${siteConfig.name} ${lead.planInterest || "Starter"} lead`
  const body = [
    `New ${siteConfig.name} website lead`,
    "",
    `Name: ${lead.name}`,
    `Business name: ${lead.businessName}`,
    `Trade: ${lead.trade}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "Not provided"}`,
    `Plan: ${lead.planInterest}`,
    `Source: ${lead.source || "website-form"}`,
    "",
    "Notes:",
    lead.details || "None provided",
  ].join("\n")

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export async function POST(request: Request) {
  let payload: LeadPayload

  try {
    payload = (await request.json()) as LeadPayload
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 })
  }

  const lead = normalizeLead(payload)

  if (lead.website) {
    return NextResponse.json({ ok: true })
  }

  const errors = validateLead(lead)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const leadRecord = {
    ...lead,
    createdAt: new Date().toISOString(),
  }

  console.info("bookedoncall_website_lead", JSON.stringify(leadRecord))

  const webhookUrl = process.env.BOOKEDONCALL_LEAD_WEBHOOK_URL?.trim()
  const webhookSecret = process.env.BOOKEDONCALL_LEAD_WEBHOOK_SECRET?.trim()

  if (!webhookUrl) {
    return NextResponse.json({
      ok: true,
      delivery: "mailto",
      mailtoHref: buildLeadMailtoHref(lead),
      message: "Your email app should open with your details filled in.",
    })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(webhookSecret ? { "x-bookedoncall-lead-secret": webhookSecret } : {}),
      },
      body: JSON.stringify(leadRecord),
      cache: "no-store",
    })

    if (!response.ok) {
      console.error("bookedoncall_website_lead_delivery_failed", response.status, await response.text())
      return NextResponse.json(
        { ok: false, message: "We could not submit your request right now. Please try again." },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error("bookedoncall_website_lead_delivery_error", error)
    return NextResponse.json(
      { ok: false, message: "We could not submit your request right now. Please try again." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true, delivery: "webhook" })
}

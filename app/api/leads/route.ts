import { NextResponse } from "next/server"
import { siteConfig } from "@/config/site"

export const runtime = "nodejs"

const leadRateLimitWindowMs = 10 * 60 * 1000
const leadRateLimitMaxSubmissions = 5
const resendRequestTimeoutMs = 8000
const leadSubmissionBuckets = new Map<string, number[]>()

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

type Lead = ReturnType<typeof normalizeLead>

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

function validateLead(lead: Lead) {
  const errors: Record<string, string> = {}

  if (!lead.name) {
    errors.name = "Enter your name."
  }
  if (!lead.businessName) {
    errors.businessName = "Enter your business name."
  }
  if (!lead.trade) {
    errors.trade = "Choose the closest starting point."
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

function buildLeadSubject(lead: Lead) {
  return `${siteConfig.name} ${lead.planInterest || "Starter"} lead`
}

function buildLeadEmailText(lead: Lead) {
  return [
    `New ${siteConfig.name} website lead`,
    "",
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

function buildLeadMailtoHref(lead: Lead) {
  const subject = `${siteConfig.name} ${lead.planInterest || "Starter"} lead`
  const body = buildLeadEmailText(lead)

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function getClientFingerprint(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const realIp = request.headers.get("x-real-ip")?.trim()
  return forwardedFor || realIp || null
}

function isRateLimited(fingerprint: string) {
  const now = Date.now()
  const cutoff = now - leadRateLimitWindowMs
  const recentSubmissions = (leadSubmissionBuckets.get(fingerprint) || []).filter((timestamp) => timestamp > cutoff)

  if (recentSubmissions.length >= leadRateLimitMaxSubmissions) {
    leadSubmissionBuckets.set(fingerprint, recentSubmissions)
    return true
  }

  recentSubmissions.push(now)
  leadSubmissionBuckets.set(fingerprint, recentSubmissions)
  return false
}

function parseRecipientList(value: string | undefined) {
  return (value || siteConfig.email)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function getResendLeadConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim()

  if (!apiKey || !fromEmail) {
    return null
  }

  return {
    apiKey,
    fromEmail,
    replyToEmail: process.env.RESEND_REPLY_TO_EMAIL?.trim(),
    recipients: parseRecipientList(process.env.BOOKEDONCALL_LEAD_NOTIFY_TO),
  }
}

async function sendLeadWithResend(lead: Lead) {
  const config = getResendLeadConfig()

  if (!config) {
    return null
  }

  if (config.recipients.length === 0) {
    throw new Error("lead_email_recipients_missing")
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: config.recipients,
      subject: buildLeadSubject(lead),
      text: buildLeadEmailText(lead),
      reply_to: lead.email || config.replyToEmail || undefined,
    }),
    signal: AbortSignal.timeout(resendRequestTimeoutMs),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => "")
    throw new Error(`resend_lead_delivery_failed:${response.status}:${errorText.slice(0, 160)}`)
  }

  const body = (await response.json().catch(() => ({}))) as { id?: string }
  return body.id || null
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

  const clientFingerprint = getClientFingerprint(request)
  if (clientFingerprint && isRateLimited(clientFingerprint)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many setup requests were submitted from this connection. Please try again in a few minutes.",
      },
      { status: 429 }
    )
  }

  try {
    const resendMessageId = await sendLeadWithResend(lead)

    if (resendMessageId) {
      console.info(
        "bookedoncall_website_lead_delivery",
        JSON.stringify({
          delivery: "resend",
          messageId: resendMessageId,
          trade: lead.trade,
          planInterest: lead.planInterest,
          source: lead.source || "website-form",
          createdAt: new Date().toISOString(),
        })
      )

      return NextResponse.json({
        ok: true,
        delivery: "resend",
        message: "Thanks. We received your details and will follow up with the right setup path.",
      })
    }
  } catch (error) {
    console.error(
      "bookedoncall_website_lead_delivery_failed",
      JSON.stringify({
        delivery: "resend",
        error: error instanceof Error ? error.message : "unknown_error",
        trade: lead.trade,
        planInterest: lead.planInterest,
        source: lead.source || "website-form",
        createdAt: new Date().toISOString(),
      })
    )
  }

  console.info(
    "bookedoncall_website_lead_delivery",
    JSON.stringify({
      delivery: "mailto",
      trade: lead.trade,
      planInterest: lead.planInterest,
      source: lead.source || "website-form",
      createdAt: new Date().toISOString(),
    })
  )

  return NextResponse.json({
    ok: true,
    delivery: "mailto",
    mailtoHref: buildLeadMailtoHref(lead),
    message: "Your email app should open with your details filled in. Send that email to complete the setup request.",
  })
}

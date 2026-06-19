import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const demoSessionWindowMs = 60 * 60 * 1000
const defaultMaxDemoStartsPerWindow = 3
const demoSessionBuckets = new Map<string, number[]>()

type DemoSessionPayload = {
  scenarioId?: unknown
}

const allowedDemoProfileIds = new Set([
  "summit-air-hvac",
  "oakline-plumbing",
  "brightline-electric",
])

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function normalizePositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value || "", 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function normalizePositiveNumber(value: string | undefined, fallback: number) {
  const parsed = Number.parseFloat(value || "")
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function getClientFingerprint(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const realIp = request.headers.get("x-real-ip")?.trim()
  return forwardedFor || realIp || "anonymous-missing-ip-header"
}

function isRateLimited(fingerprint: string) {
  const now = Date.now()
  const cutoff = now - demoSessionWindowMs
  const maxStarts = normalizePositiveInteger(process.env.BOOKEDONCALL_DEMO_MAX_STARTS_PER_HOUR, defaultMaxDemoStartsPerWindow)
  const recentStarts = (demoSessionBuckets.get(fingerprint) || []).filter((timestamp) => timestamp > cutoff)

  if (recentStarts.length >= maxStarts) {
    demoSessionBuckets.set(fingerprint, recentStarts)
    return true
  }

  recentStarts.push(now)
  demoSessionBuckets.set(fingerprint, recentStarts)
  return false
}

function getDemoConfig() {
  const enabled = process.env.BOOKEDONCALL_DEMO_VOICE_ENABLED === "true"
  const publicKey = process.env.VAPI_WEB_PUBLIC_KEY?.trim()
  const assistantId = process.env.VAPI_DEMO_ASSISTANT_ID?.trim()
  const monthlyBudgetUsd = normalizePositiveNumber(process.env.VAPI_DEMO_MONTHLY_BUDGET_USD, 50)
  const maxCallSeconds = normalizePositiveInteger(process.env.BOOKEDONCALL_DEMO_MAX_CALL_SECONDS, 180)

  return {
    enabled,
    configured: Boolean(enabled && publicKey && assistantId),
    publicKey,
    assistantId,
    monthlyBudgetUsd,
    maxCallSeconds,
  }
}

function unavailableResponse() {
  return NextResponse.json(
    {
      ok: false,
      configured: false,
      message: "The live web demo is temporarily unavailable. Example calls and private setup test calls are still available.",
    },
    { status: 503 }
  )
}

export function GET() {
  const config = getDemoConfig()

  return NextResponse.json({
    ok: true,
    configured: config.configured,
    maxCallSeconds: config.maxCallSeconds,
  })
}

export async function POST(request: Request) {
  const config = getDemoConfig()
  if (!config.configured || !config.publicKey || !config.assistantId) {
    return unavailableResponse()
  }

  let payload: DemoSessionPayload = {}
  try {
    payload = (await request.json()) as DemoSessionPayload
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 })
  }

  const scenarioId = normalizeText(payload.scenarioId)
  if (!scenarioId || !allowedDemoProfileIds.has(scenarioId)) {
    return NextResponse.json({ ok: false, message: "Choose a sample business before starting." }, { status: 400 })
  }

  const fingerprint = getClientFingerprint(request)
  if (isRateLimited(fingerprint)) {
    return NextResponse.json(
      {
        ok: false,
        message: "The live demo is getting a lot of use from this connection. Please try again later or request setup for a private test call.",
      },
      { status: 429 }
    )
  }

  return NextResponse.json({
    ok: true,
    sessionId: randomUUID(),
    publicKey: config.publicKey,
    assistantId: config.assistantId,
    maxCallSeconds: config.maxCallSeconds,
  })
}

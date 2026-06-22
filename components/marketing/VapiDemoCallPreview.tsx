"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { CalendarClock, Clock, MapPin, Mic, PhoneCall, ShieldCheck, Square, Volume2, Wrench } from "lucide-react"
import type Vapi from "@vapi-ai/web"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { trackMarketingEvent } from "@/lib/analytics"

type DemoService = {
  name: string
  detail: string
  range?: string
}

type DemoBusinessProfile = {
  id: string
  name: string
  trade: string
  tagline: string
  serviceArea: string
  hours: string
  demoAvailability: string
  bookingPolicy: string
  pricePolicy: string
  emergencyPolicy: string
  callerPrompt: string
  services: DemoService[]
  guardrails: string[]
}

type DemoConfig = {
  ok?: boolean
  configured?: boolean
  publicKey?: string
  assistantId?: string
  sessionId?: string
  maxCallSeconds?: number
  message?: string
}

type TranscriptLine = {
  id: string
  speaker: "Caller" | "BookedOnCall"
  text: string
}

type VapiInstance = InstanceType<typeof Vapi>
type DemoStartProgress = {
  stage?: unknown
  status?: unknown
}

const demoBusinessProfiles: DemoBusinessProfile[] = [
  {
    id: "summit-air-hvac",
    name: "Summit Air & Heat",
    trade: "HVAC",
    tagline: "Residential heating and cooling calls for busy owner-operated HVAC shops.",
    serviceArea: "West Denver, Lakewood, Wheat Ridge, and Arvada.",
    hours: "Monday-Friday 8 AM-6 PM, Saturday 9 AM-2 PM.",
    demoAvailability: "Sample appointment-request windows: tomorrow 10 AM-12 PM or 2 PM-4 PM.",
    bookingPolicy: "Offer appointment requests for in-area no-cool, no-heat, tune-up, and diagnostic calls. Installs, warranty questions, commercial work, and out-of-area calls go to owner review.",
    pricePolicy: "Can share a sample diagnostic range of $89-$149. Never quote a final repair price.",
    emergencyPolicy: "No heat in freezing weather, electrical smell from equipment, or vulnerable occupants should be marked urgent for owner review.",
    callerPrompt: "Ask about an AC, furnace, tune-up, or indoor-air issue. You do not need to follow a script.",
    services: [
      { name: "No-cool diagnostic", detail: "AC runs but does not cool, weak airflow, thermostat concern.", range: "$89-$149 diagnostic range" },
      { name: "No-heat diagnostic", detail: "Furnace or heat pump not heating during normal hours.", range: "$89-$149 diagnostic range" },
      { name: "Seasonal tune-up", detail: "Maintenance visit for AC, furnace, or heat pump.", range: "$129 sample maintenance visit" },
    ],
    guardrails: [
      "Collect name, callback number, address, symptoms, and preferred window.",
      "Offer sample windows only as appointment requests pending owner confirmation.",
      "Share only the approved diagnostic range, never a final repair price.",
    ],
  },
  {
    id: "oakline-plumbing",
    name: "Oakline Plumbing",
    trade: "Plumbing",
    tagline: "Leak, drain, water-heater, and fixture calls for a small plumbing crew.",
    serviceArea: "Plano, Richardson, Allen, and North Dallas.",
    hours: "Monday-Friday 7:30 AM-5:30 PM, urgent owner review after hours.",
    demoAvailability: "Sample appointment-request windows: today 3 PM-5 PM for urgent review or tomorrow 9 AM-11 AM.",
    bookingPolicy: "Offer appointment requests for drains, fixture repairs, water-heater checks, and contained leaks. Active flooding, gas concerns, sewer backup, remodel bids, and out-of-area calls go to owner review.",
    pricePolicy: "Can share a sample service-call range of $95-$175. Do not estimate repair cost without inspection.",
    emergencyPolicy: "Active water leaks, sewage backup, or no water at the property should be marked urgent and escalated for owner review.",
    callerPrompt: "Ask about a leak, clogged drain, water heater, toilet, sink, or fixture problem. You can describe the situation naturally.",
    services: [
      { name: "Contained leak", detail: "Under-sink, toilet, or fixture leak where water can be shut off.", range: "$95-$175 service-call range" },
      { name: "Drain clearing", detail: "Slow or stopped sink, tub, shower, or main-line symptoms.", range: "Owner review for final price" },
      { name: "Water-heater check", detail: "No hot water, pilot issue, leak near the tank, or replacement question.", range: "Inspection needed before quote" },
    ],
    guardrails: [
      "Ask whether water is still actively leaking and whether the shutoff is accessible.",
      "Mark active leaks urgent; do not promise arrival time.",
      "Hand the owner clean callback context when the call needs review.",
    ],
  },
  {
    id: "brightline-electric",
    name: "Brightline Electric",
    trade: "Electrical",
    tagline: "Troubleshooting, safety review, and install-request intake for electricians.",
    serviceArea: "Raleigh, Cary, Apex, and Morrisville.",
    hours: "Monday-Friday 8 AM-5 PM.",
    demoAvailability: "Sample appointment-request windows: tomorrow 1 PM-3 PM or Friday 9 AM-11 AM for owner-reviewed jobs.",
    bookingPolicy: "Offer appointment requests for troubleshooting, fixture replacement, outlets, and EV charger consultations. Burning smell, sparks, hot panels, tripping main breakers, and panel upgrades go to owner review.",
    pricePolicy: "Can share a sample troubleshooting range of $125-$225. Panel, EV charger, and larger project pricing requires owner review.",
    emergencyPolicy: "Smoke, sparks, burning smell, hot panels, or repeated breaker trips should be treated as safety-sensitive and escalated.",
    callerPrompt: "Ask about flickering lights, breakers, outlets, a fixture, an EV charger, or another electrical concern.",
    services: [
      { name: "Electrical troubleshooting", detail: "Flickering lights, dead outlets, repeated breaker trips, or intermittent power.", range: "$125-$225 troubleshooting range" },
      { name: "Fixture or outlet work", detail: "Replace fixtures, add outlets, repair switches, or inspect small issues.", range: "Owner review for final price" },
      { name: "EV charger consult", detail: "Home charger request that needs panel and site review.", range: "Consultation request only" },
    ],
    guardrails: [
      "Ask about smoke, sparks, heat, burning smell, and whether a breaker keeps tripping.",
      "Route safety-sensitive work for owner review instead of forcing automatic booking.",
      "Keep the caller calm and clear about the next step.",
    ],
  },
] as const

function transcriptLineFromMessage(message: unknown): TranscriptLine | null {
  if (!message || typeof message !== "object") return null
  const candidate = message as Record<string, unknown>
  if (candidate.type !== "transcript") return null

  const transcriptType = typeof candidate.transcriptType === "string" ? candidate.transcriptType : ""
  if (transcriptType && transcriptType !== "final") return null

  const text = typeof candidate.transcript === "string"
    ? candidate.transcript.trim()
    : typeof candidate.text === "string"
      ? candidate.text.trim()
      : ""
  if (!text) return null

  const role = typeof candidate.role === "string" ? candidate.role : ""
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    speaker: role === "assistant" ? "BookedOnCall" : "Caller",
    text,
  }
}

function buildDemoFirstMessage(profile: DemoBusinessProfile) {
  return `Thanks for calling ${profile.name}. How can I help with your ${profile.trade.toLowerCase()} call today?`
}

function buildDemoGuardrailMessage(profile: DemoBusinessProfile) {
  return [
    "This is a public BookedOnCall website demo, not a real customer call.",
    "Do not create appointments, change calendars, send texts, transfer calls, request payment, or claim a confirmed booking.",
    "Keep the conversation human, concise, and trades-specific.",
    `Sample business: ${profile.name}.`,
    `Trade: ${profile.trade}.`,
    `Service area: ${profile.serviceArea}`,
    `Hours: ${profile.hours}`,
    `Services: ${profile.services.map((service) => `${service.name} (${service.detail}${service.range ? `; ${service.range}` : ""})`).join("; ")}.`,
    `Availability policy: ${profile.demoAvailability} All demo appointment times are appointment requests pending owner confirmation.`,
    `Booking policy: ${profile.bookingPolicy}`,
    `Pricing policy: ${profile.pricePolicy}`,
    `Emergency policy: ${profile.emergencyPolicy}`,
    "Default result: collect the caller's core details, explain owner-approved booking or callback, and summarize the next step.",
    `Guardrails: ${profile.guardrails.join(" ")}`,
  ].join(" ")
}

function normalizedStartStage(event: unknown) {
  if (!event || typeof event !== "object") return "unknown"
  const stage = (event as DemoStartProgress).stage
  return typeof stage === "string" ? stage : "unknown"
}

function isProgressStatus(event: unknown, status: "started" | "completed" | "failed") {
  return Boolean(event && typeof event === "object" && (event as DemoStartProgress).status === status)
}

function publicConnectionStatusForStage(stage: string) {
  if (stage === "web-call-creation") {
    return "Creating a short live demo session..."
  }
  if (stage === "daily-call-join" || stage === "daily-call-object-creation" || stage === "mobile-permissions") {
    return "Connecting browser audio. If Chrome asks for microphone access, choose allow."
  }
  if (stage.includes("audio")) {
    return "Connecting the live audio path..."
  }
  return "Connecting the live demo..."
}

function publicFailureStatusForStage(stage: string) {
  if (stage === "web-call-creation") {
    return "The live demo could not create a voice session. Request setup and review your call flow with us."
  }
  if (stage === "daily-call-join" || stage === "daily-call-object-creation" || stage === "mobile-permissions" || stage.includes("audio")) {
    return "The live demo started, but this browser could not connect audio. Check microphone permissions or request setup and review your call flow with us."
  }
  return "The live demo started, but this browser could not connect audio. Check microphone permissions or request setup and review your call flow with us."
}

export function VapiDemoCallPreview() {
  const [profileId, setProfileId] = useState(demoBusinessProfiles[0].id)
  const [configured, setConfigured] = useState<boolean | null>(null)
  const [status, setStatus] = useState("Checking live demo...")
  const [isStarting, setIsStarting] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [maxCallSeconds, setMaxCallSeconds] = useState(180)
  const [transcript, setTranscript] = useState<TranscriptLine[]>([])
  const vapiRef = useRef<VapiInstance | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const profile = useMemo(() => demoBusinessProfiles.find((item) => item.id === profileId) || demoBusinessProfiles[0], [profileId])

  useEffect(() => {
    let cancelled = false

    async function checkDemoAvailability() {
      try {
        const response = await fetch("/api/demo-session", { method: "GET" })
        const body = (await response.json()) as DemoConfig
        if (cancelled) return
        setConfigured(Boolean(body.configured))
        setMaxCallSeconds(body.maxCallSeconds || 180)
        setStatus(
          body.configured
            ? "Live voice demo is ready. Choose a sample shop, allow microphone access, and speak naturally."
            : "The live voice demo is temporarily unavailable. Use example calls or request setup to review your call flow."
        )
      } catch {
        if (cancelled) return
        setConfigured(false)
        setStatus("We could not check the live demo right now. Use example calls or request setup to review your call flow.")
      }
    }

    checkDemoAvailability()
    return () => {
      cancelled = true
      void stopDemo()
    }
  }, [])

  async function stopDemo(nextStatus = "Demo ended. You can choose another sample shop or start again.") {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (vapiRef.current) {
      try {
        await vapiRef.current.stop()
      } catch {
        // The call may already be gone; the UI state still needs to reset.
      }
      vapiRef.current.removeAllListeners()
      vapiRef.current = null
    }
    setIsLive(false)
    setIsStarting(false)
    setStatus(nextStatus)
  }

  async function startDemo() {
    if (isStarting || isLive) return

    setIsStarting(true)
    setTranscript([])
    setStatus("Requesting a live demo session...")

    let body: DemoConfig
    try {
      const response = await fetch("/api/demo-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scenarioId: profile.id }),
      })
      body = (await response.json()) as DemoConfig
      if (!response.ok || !body.ok || !body.publicKey || !body.assistantId) {
        setConfigured(false)
        setStatus(body.message || "The live voice demo is temporarily unavailable. Request setup to review your call flow.")
        setIsStarting(false)
        return
      }
    } catch {
      setStatus("Live voice demo could not start. Request setup to review your call flow.")
      setIsStarting(false)
      return
    }

    try {
      const Vapi = (await import("@vapi-ai/web")).default
      const vapi = new Vapi(body.publicKey)
      vapiRef.current = vapi

      vapi.on("call-start-progress", (event) => {
        const stage = normalizedStartStage(event)
        if (isProgressStatus(event, "failed")) {
          trackMarketingEvent("demo_voice_call_failed", {
            placement: "demo_call_preview",
            scenarioId: profile.id,
            sessionId: body.sessionId,
            failureStage: stage,
          })
          void stopDemo(publicFailureStatusForStage(stage))
          return
        }
        setStatus(publicConnectionStatusForStage(stage))
      })
      vapi.on("call-start-failed", (event) => {
        const stage = normalizedStartStage(event)
        trackMarketingEvent("demo_voice_call_failed", {
          placement: "demo_call_preview",
          scenarioId: profile.id,
          sessionId: body.sessionId,
          failureStage: stage,
        })
        void stopDemo(publicFailureStatusForStage(stage))
      })
      vapi.on("call-start", () => {
        setIsLive(true)
        setIsStarting(false)
        setStatus("Live demo connected. Speak naturally as the caller.")
        trackMarketingEvent("demo_voice_call_started", {
          placement: "demo_call_preview",
          scenarioId: profile.id,
          sessionId: body.sessionId,
        })
        vapi.send({
          type: "add-message",
          message: {
            role: "system",
            content: buildDemoGuardrailMessage(profile),
          },
          triggerResponseEnabled: false,
        })
      })
      vapi.on("call-end", () => {
        void stopDemo("Demo ended. Review the transcript or start another sample shop.")
      })
      vapi.on("message", (message) => {
        const line = transcriptLineFromMessage(message)
        if (!line) return
        setTranscript((current) => [...current.slice(-11), line])
      })
      vapi.on("speech-start", () => {
        setStatus("Assistant is speaking. You can interrupt naturally if needed.")
      })
      vapi.on("speech-end", () => {
        setStatus("Listening for your response.")
      })
      vapi.on("error", () => {
        trackMarketingEvent("demo_voice_call_failed", {
          placement: "demo_call_preview",
          scenarioId: profile.id,
          sessionId: body.sessionId,
          failureStage: "runtime-error",
        })
        void stopDemo("The live demo started, but this browser could not connect audio. Check microphone permissions or request setup to review your call flow.")
      })

      const callLimitSeconds = body.maxCallSeconds || maxCallSeconds
      timeoutRef.current = window.setTimeout(() => {
        void stopDemo("Demo ended at the public time limit.")
      }, callLimitSeconds * 1000)

      await vapi.start(body.assistantId, {
        maxDurationSeconds: callLimitSeconds,
        firstMessage: buildDemoFirstMessage(profile),
        firstMessageMode: "assistant-speaks-first",
        variableValues: {
          demo_mode: "public_website_demo_no_real_actions",
          demo_scenario_id: profile.id,
          demo_trade: profile.trade,
          demo_business_name: profile.name,
          demo_service_area: profile.serviceArea,
          demo_hours: profile.hours,
          demo_availability: profile.demoAvailability,
          demo_booking_policy: profile.bookingPolicy,
          demo_pricing_policy: profile.pricePolicy,
          demo_emergency_policy: profile.emergencyPolicy,
          demo_services: profile.services.map((service) => `${service.name}: ${service.detail}${service.range ? ` (${service.range})` : ""}`).join(" | "),
          demo_guardrails: profile.guardrails.join(" "),
        },
      })
    } catch {
      await stopDemo("The live demo could not start in this browser. Check microphone permissions or request setup to review your call flow.")
    }
  }

  return (
    <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <p className="w-fit rounded-lg border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-sm font-bold text-amber-200">
              Sample shop demo
            </p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
              Speak to a trades call assistant in your browser.
            </h2>
            <p className="text-base leading-8 text-slate-300">
              Choose a sample shop, allow microphone access, and call about any service listed below. The public demo is rate-limited, time-limited, and does not create bookings, send texts, or change calendars.
            </p>
          </div>

          <div className="grid gap-3">
            {demoBusinessProfiles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (isLive || isStarting) return
                  setProfileId(item.id)
                  setTranscript([])
                  setStatus(configured ? `Ready for ${item.name}.` : "The live voice demo is temporarily unavailable.")
                }}
                aria-pressed={item.id === profile.id}
                disabled={isLive || isStarting}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-70",
                  item.id === profile.id
                    ? "border-amber-300 bg-amber-300/15 text-white"
                    : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-300/70"
                )}
              >
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-amber-200">{item.trade}</span>
                <span className="mt-1 block text-base font-black">{item.name}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-300">{item.callerPrompt}</span>
              </button>
            ))}
          </div>

          <div className="grid gap-3 rounded-xl border border-slate-700 bg-slate-900 p-5">
            <h3 className="text-lg font-black text-white">Demo limits</h3>
            <ul className="grid gap-2 text-sm leading-7 text-slate-300">
              <li className="flex gap-2">
                <ShieldCheck className="mt-1 size-4 shrink-0 text-emerald-300" />
                No real appointments, calendar changes, customer texts, or customer records are created from this page.
              </li>
              <li className="flex gap-2">
                <CalendarClock className="mt-1 size-4 shrink-0 text-amber-300" />
                Public calls are capped at about {Math.round(maxCallSeconds / 60)} minutes.
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/20 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-700">{profile.trade}</p>
              <h3 className="text-2xl font-black">{profile.name}</h3>
            </div>
            <div
              className={cn(
                "w-fit rounded-lg border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]",
                configured === true
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-amber-200 bg-amber-50 text-amber-800"
              )}
            >
              {configured === true ? "Ready" : configured === null ? "Checking" : "Demo unavailable"}
            </div>
          </div>

          <div className="mb-5 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-950">Sample shop setup</p>
            <p className="text-sm leading-7 text-slate-600">{profile.tagline}</p>
            <div className="grid gap-3 text-sm leading-6 text-slate-600 sm:grid-cols-2">
              <div className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-amber-600" />
                <span>{profile.serviceArea}</span>
              </div>
              <div className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-amber-600" />
                <span>{profile.hours}</span>
              </div>
            </div>
            <div className="grid gap-2">
              {profile.services.map((service) => (
                <div key={service.name} className="rounded-lg border border-slate-200 bg-white p-3">
                  <div className="flex items-start gap-2">
                    <Wrench className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-sm font-black text-slate-950">{service.name}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{service.detail}</p>
                      {service.range ? <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{service.range}</p> : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
              <strong>Sample availability:</strong> {profile.demoAvailability} Appointment times are sample requests pending owner confirmation.
            </div>
          </div>

          <div className="mb-5 min-h-[320px] rounded-xl border border-slate-200 bg-white p-4" aria-live="polite">
            {transcript.length === 0 ? (
              <div className="grid h-full min-h-[280px] place-items-center text-center text-sm leading-7 text-slate-500">
                {configured
                  ? "Start the live voice demo to see transcript lines here."
                  : "The live demo is temporarily unavailable. Example calls below show the intended call structure."}
              </div>
            ) : (
              <div className="grid gap-3">
                {transcript.map((line) => (
                  <div
                    key={line.id}
                    className={cn(
                      "max-w-[92%] rounded-xl px-4 py-3 text-sm leading-7",
                      line.speaker === "BookedOnCall"
                        ? "justify-self-start border border-slate-200 bg-slate-50 text-slate-700"
                        : "justify-self-end bg-amber-100 text-amber-950"
                    )}
                  >
                    <strong className="block text-xs uppercase tracking-[0.12em] text-slate-500">{line.speaker}</strong>
                    {line.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="mb-4 text-xs leading-6 text-slate-500">
            By starting the live demo, you agree that your microphone audio may be processed for this demo call. Do not share real
            customer information. See the{" "}
            <a href="/call-handling-notice" className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4">
              Call Notice
            </a>{" "}
            and{" "}
            <a href="/privacy" className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4">
              Privacy Policy
            </a>
            .
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => void startDemo()}
              disabled={isStarting || isLive || configured === false}
              className={cn(buttonVariants({ size: "lg" }), "justify-center rounded-xl bg-slate-950 px-5 text-white hover:bg-slate-800")}
            >
              {configured === false ? (
                <>
                  <Mic className="size-4" />
                  Demo unavailable
                </>
              ) : isStarting ? (
                <>
                  <Volume2 className="size-4" />
                  Connecting
                </>
              ) : (
                <>
                  <Mic className="size-4" />
                  Start live demo
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => void stopDemo()}
              disabled={!isStarting && !isLive}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "justify-center rounded-xl border-slate-300")}
            >
              <Square className="size-4" />
              End demo
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm leading-6 text-slate-600" role="status" aria-live="polite">
              {status}
            </p>
          </div>

          <div className="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="size-4 text-amber-600" />
              <p className="text-sm font-black text-slate-950">What to listen for</p>
            </div>
            <ul className="grid gap-2 text-sm leading-6 text-slate-600">
              {profile.guardrails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

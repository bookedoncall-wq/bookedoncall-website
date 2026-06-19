"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { Mic, PhoneCall, RotateCcw, Send, Volume2 } from "lucide-react"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

type Scenario = {
  id: string
  title: string
  trade: string
  openingLine: string
  callerHint: string
  assistantReplies: string[]
  summary: string[]
}

type PreviewMessage = {
  speaker: "Caller" | "BookedOnCall"
  text: string
}

type SpeechRecognitionResultLike = {
  readonly [index: number]: {
    transcript: string
  }
}

type SpeechRecognitionEventLike = {
  results: ArrayLike<SpeechRecognitionResultLike>
}

type SpeechRecognitionErrorEventLike = {
  error?: string
}

type BrowserSpeechRecognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null
  onend: (() => void) | null
  start: () => void
  abort: () => void
}

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

const scenarios: Scenario[] = [
  {
    id: "plumbing-leak",
    title: "Leak call",
    trade: "Plumbing",
    openingLine: "Thanks for calling. I can get the details over to the team. What is happening at the property?",
    callerHint: "Example: Water is leaking under the kitchen sink and we need someone today.",
    assistantReplies: [
      "I can help gather the details. What is the service address and the best callback number?",
      "Thanks. Is the leak active right now, and is water shut off or still running?",
      "Got it. I have the issue, urgency, address, and callback number so this can move to the right next step.",
    ],
    summary: ["Active leak", "Address and callback needed", "Urgency should be reviewed quickly"],
  },
  {
    id: "hvac-no-cool",
    title: "No-cool call",
    trade: "HVAC",
    openingLine: "Thanks for calling. I can collect the details for the HVAC team. What is going on today?",
    callerHint: "Example: The AC is blowing warm air and the house is getting hot.",
    assistantReplies: [
      "Thanks. What is the best callback number and service address?",
      "Is the system running without cooling, not turning on, or showing an error code?",
      "I have the symptoms and contact details. The team can use this to decide the fastest next step.",
    ],
    summary: ["No-cool issue", "System symptom captured", "Next step depends on schedule and rules"],
  },
  {
    id: "electrical-review",
    title: "Review-needed call",
    trade: "Electrical",
    openingLine: "Thanks for calling. I can get the details down for the electrical team. What do you need help with?",
    callerHint: "Example: Lights are flickering and a breaker tripped twice this week.",
    assistantReplies: [
      "Thanks. What is the service address and the best number to reach you?",
      "Is anything sparking, smoking, or hot to the touch right now?",
      "I have the concern and safety details. This should be reviewed before anyone promises a visit time.",
    ],
    summary: ["Potential safety-sensitive issue", "Owner review before booking", "Clear callback handoff"],
  },
]

function getRecognitionConstructor() {
  if (typeof window === "undefined") return null
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

function resultText(event: SpeechRecognitionEventLike) {
  return Array.from(event.results)
    .map((result) => result[0]?.transcript || "")
    .join(" ")
    .trim()
}

export function DemoCallPreview() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id)
  const [messages, setMessages] = useState<PreviewMessage[]>([])
  const [replyIndex, setReplyIndex] = useState(0)
  const [typedResponse, setTypedResponse] = useState("")
  const [status, setStatus] = useState("Choose a scenario and start the browser preview.")
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null)

  const scenario = useMemo(() => scenarios.find((item) => item.id === scenarioId) || scenarios[0], [scenarioId])
  const latestAssistantLine = [...messages].reverse().find((message) => message.speaker === "BookedOnCall")?.text

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort()
    }
  }, [])

  function resetScenario(nextScenarioId = scenarioId) {
    recognitionRef.current?.abort()
    const nextScenario = scenarios.find((item) => item.id === nextScenarioId) || scenarios[0]
    setScenarioId(nextScenario.id)
    setMessages([])
    setReplyIndex(0)
    setTypedResponse("")
    setIsListening(false)
    setStatus(`Ready to preview a ${nextScenario.trade.toLowerCase()} call.`)
  }

  function startPreview() {
    setMessages([{ speaker: "BookedOnCall", text: scenario.openingLine }])
    setReplyIndex(0)
    setStatus("Preview started. Respond as the caller by voice or text.")
  }

  function addCallerResponse(text: string) {
    const cleanText = text.trim()
    if (!cleanText) return

    const assistantReply = scenario.assistantReplies[Math.min(replyIndex, scenario.assistantReplies.length - 1)]
    setMessages((current) => [
      ...current,
      { speaker: "Caller", text: cleanText },
      { speaker: "BookedOnCall", text: assistantReply },
    ])
    setReplyIndex((current) => Math.min(current + 1, scenario.assistantReplies.length - 1))
    setTypedResponse("")
    setStatus("Transcript updated. Keep going or reset the preview.")
  }

  function submitTypedResponse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (messages.length === 0) {
      startPreview()
    }
    addCallerResponse(typedResponse)
  }

  function listenForCallerResponse() {
    if (messages.length === 0) {
      startPreview()
    }

    const Recognition = getRecognitionConstructor()
    if (!Recognition) {
      setStatus("Voice input is not available in this browser. Type a caller response instead.")
      return
    }

    recognitionRef.current?.abort()
    const recognition = new Recognition()
    recognition.lang = "en-US"
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onresult = (event) => {
      addCallerResponse(resultText(event))
    }
    recognition.onerror = () => {
      setStatus("The browser could not hear that clearly. Type the caller response instead.")
      setIsListening(false)
    }
    recognition.onend = () => {
      setIsListening(false)
    }
    recognitionRef.current = recognition

    try {
      recognition.start()
      setIsListening(true)
      setStatus("Listening for a caller response...")
    } catch {
      setStatus("Voice input could not start. Type a caller response instead.")
      setIsListening(false)
    }
  }

  function playLatestAssistantLine() {
    if (!latestAssistantLine || typeof window === "undefined" || !("speechSynthesis" in window)) {
      setStatus("Assistant audio playback is not available in this browser.")
      return
    }
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(latestAssistantLine))
    setStatus("Playing the latest assistant line.")
  }

  return (
    <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <p className="w-fit rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-sm font-bold text-amber-200">
              Browser call preview
            </p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
              Try a call flow with a visible transcript.
            </h2>
            <p className="text-base leading-8 text-slate-300">
              Use a guided preview to hear the assistant gather details, ask follow-up questions, and produce a clean handoff. This public preview does not create appointments, change calendars, or store caller data.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {scenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => resetScenario(item.id)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left transition-colors",
                  item.id === scenario.id
                    ? "border-amber-300 bg-amber-300/15 text-white"
                    : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-300/70"
                )}
              >
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-amber-200">{item.trade}</span>
                <span className="mt-1 block text-sm font-black">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-lg font-black text-white">What this preview protects</h3>
            <ul className="grid gap-2 text-sm leading-7 text-slate-300">
              <li>No appointment is created from this page.</li>
              <li>No calendar, Jobber, email, or text workflow is changed.</li>
              <li>Private test calls during setup use your actual services, service area, hours, and booking rules.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-700 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/20 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-700">{scenario.trade}</p>
              <h3 className="text-2xl font-black">Transcript preview</h3>
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
              Preview mode
            </div>
          </div>

          <div className="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-950">Caller prompt</p>
            <p className="text-sm leading-7 text-slate-600">{scenario.callerHint}</p>
          </div>

          <div className="mb-5 min-h-[320px] rounded-2xl border border-slate-200 bg-white p-4" aria-live="polite">
            {messages.length === 0 ? (
              <div className="grid h-full min-h-[280px] place-items-center text-center text-sm leading-7 text-slate-500">
                Start the preview to see the transcript appear here.
              </div>
            ) : (
              <div className="grid gap-3">
                {messages.map((message, index) => (
                  <div
                    key={`${message.speaker}-${index}`}
                    className={cn(
                      "max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-7",
                      message.speaker === "BookedOnCall"
                        ? "justify-self-start border border-slate-200 bg-slate-50 text-slate-700"
                        : "justify-self-end bg-amber-100 text-amber-950"
                    )}
                  >
                    <strong className="block text-xs uppercase tracking-[0.12em] text-slate-500">{message.speaker}</strong>
                    {message.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={submitTypedResponse} className="grid gap-3">
            <label className="text-sm font-bold text-slate-950" htmlFor="demo-caller-response">
              Type a caller response
            </label>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                id="demo-caller-response"
                value={typedResponse}
                onChange={(event) => setTypedResponse(event.target.value)}
                placeholder="Type what the caller says next"
                className="min-h-12 rounded-xl border border-slate-300 px-4 text-base text-slate-950 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
              />
              <button
                type="submit"
                className={cn(buttonVariants({ size: "lg" }), "justify-center rounded-xl bg-slate-950 px-5 text-white hover:bg-slate-800")}
              >
                <Send className="size-4" />
                Send
              </button>
            </div>
          </form>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={startPreview}
              className={cn(buttonVariants({ variant: "outline" }), "justify-center rounded-xl border-slate-300")}
            >
              <PhoneCall className="size-4" />
              Start
            </button>
            <button
              type="button"
              onClick={listenForCallerResponse}
              className={cn(buttonVariants({ variant: "outline" }), "justify-center rounded-xl border-slate-300")}
              aria-pressed={isListening}
            >
              <Mic className="size-4" />
              {isListening ? "Listening" : "Use mic"}
            </button>
            <button
              type="button"
              onClick={playLatestAssistantLine}
              className={cn(buttonVariants({ variant: "outline" }), "justify-center rounded-xl border-slate-300")}
            >
              <Volume2 className="size-4" />
              Play line
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-slate-600">{status}</p>
            <button
              type="button"
              onClick={() => resetScenario()}
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl px-3 text-sm font-bold text-amber-700 transition-colors hover:bg-amber-50"
            >
              <RotateCcw className="size-4" />
              Reset
            </button>
          </div>

          <div className="mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-black text-slate-950">Example handoff</p>
            <ul className="grid gap-2 text-sm leading-6 text-slate-600">
              {scenario.summary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

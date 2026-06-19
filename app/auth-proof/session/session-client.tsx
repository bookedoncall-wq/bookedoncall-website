"use client"

import { SignIn, useAuth } from "@clerk/nextjs"
import { useSignIn } from "@clerk/nextjs/legacy"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type TokenSummary =
  | {
      status: "token_present"
      tokenShape: "jwt_like_three_segments" | "opaque_session_token"
      tokenLengthBand: "short" | "medium" | "long"
      tokenFingerprint: string
    }
  | {
      status: "token_missing"
      reason: "not_signed_in_or_unloaded" | "empty_or_unsafe_token" | "token_read_failed"
    }

declare global {
  interface Window {
    __bookedOnCallAuthProofSession?: TokenSummary & {
      rawTokenPrinted: false
      customerDataRead: false
      businessAuthorizationGranted: false
    }
  }
}

export default function AuthProofSessionClient({ boundary }: { boundary: string }) {
  const auth = useAuth()
  const { isLoaded: signInLoaded, setActive, signIn } = useSignIn()
  const searchParams = useSearchParams()
  const signInToken = searchParams.get("token")
  const [summary, setSummary] = useState<TokenSummary>({
    status: "token_missing",
    reason: "not_signed_in_or_unloaded",
  })
  const [ticketStatus, setTicketStatus] = useState<"idle" | "working" | "complete" | "blocked">("idle")

  useEffect(() => {
    let cancelled = false

    async function consumeTicket() {
      if (!signInToken || signInLoaded !== true || !signIn || !setActive || auth.isSignedIn === true || ticketStatus !== "idle") {
        return
      }

      setTicketStatus("working")
      try {
        const signInAttempt = await signIn.create({
          strategy: "ticket",
          ticket: signInToken,
        })

        if (cancelled) {
          return
        }

        if (signInAttempt.status === "complete" && signInAttempt.createdSessionId) {
          await setActive({ session: signInAttempt.createdSessionId })
          if (!cancelled) {
            setTicketStatus("complete")
          }
          return
        }

        setTicketStatus("blocked")
      } catch {
        if (!cancelled) {
          setTicketStatus("blocked")
        }
      }
    }

    void consumeTicket()

    return () => {
      cancelled = true
    }
  }, [auth.isSignedIn, setActive, signIn, signInLoaded, signInToken, ticketStatus])

  useEffect(() => {
    let cancelled = false

    async function updateSummary() {
      if (auth.isLoaded !== true || auth.isSignedIn !== true) {
        setProofSummary({
          status: "token_missing",
          reason: "not_signed_in_or_unloaded",
        })
        return
      }

      try {
        const token = await auth.getToken()
        setProofSummary(await summarizeToken(token))
      } catch {
        setProofSummary({
          status: "token_missing",
          reason: "token_read_failed",
        })
      }
    }

    function setProofSummary(nextSummary: TokenSummary) {
      if (cancelled) {
        return
      }
      setSummary(nextSummary)
      window.__bookedOnCallAuthProofSession = {
        ...nextSummary,
        rawTokenPrinted: false,
        customerDataRead: false,
        businessAuthorizationGranted: false,
      }
    }

    void updateSummary()

    return () => {
      cancelled = true
    }
  }, [auth])

  const hasToken = summary.status === "token_present"

  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-4 py-20">
      <header className="grid gap-3">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Owner access</p>
        <h1 className="text-4xl font-black text-slate-950">Customer app access</h1>
        <p className="max-w-3xl text-base leading-7 text-slate-700">{boundary}</p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {auth.isSignedIn !== true ? (
          <div className="grid gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Sign-in required</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {ticketStatus === "working"
                  ? "Checking the single-use sign-in link."
                  : ticketStatus === "blocked"
                    ? "The single-use sign-in link could not open customer app access."
                    : "This browser is not signed in to the customer app yet."}
              </p>
            </div>
            <SignIn routing="hash" />
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  {hasToken ? "Customer app access found" : "Customer app access incomplete"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Only a redacted access check is shown here.
                </p>
              </div>
              <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-bold text-amber-800">
                {hasToken ? "Access found" : "Access incomplete"}
              </span>
            </div>

            {hasToken ? (
              <dl className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-bold text-slate-950">Access format</dt>
                  <dd className="mt-1 text-slate-600">{summary.tokenShape}</dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-950">Access size</dt>
                  <dd className="mt-1 text-slate-600">{summary.tokenLengthBand}</dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-950">Access reference</dt>
                  <dd className="mt-1 text-slate-600">{summary.tokenFingerprint}</dd>
                </div>
              </dl>
            ) : (
              <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                This browser appears signed in, but customer app access could not be confirmed.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

async function summarizeToken(value: unknown): Promise<TokenSummary> {
  if (typeof value !== "string" || value.trim() !== value || value.length === 0 || /\s/.test(value)) {
    return {
      status: "token_missing",
      reason: "empty_or_unsafe_token",
    }
  }

  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  const tokenFingerprint = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 12)

  return {
    status: "token_present",
    tokenShape: value.split(".").length === 3 ? "jwt_like_three_segments" : "opaque_session_token",
    tokenLengthBand: value.length < 500 ? "short" : value.length < 2000 ? "medium" : "long",
    tokenFingerprint: `sha256:${tokenFingerprint}`,
  }
}

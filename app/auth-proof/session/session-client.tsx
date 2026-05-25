"use client"

import { SignIn, useAuth } from "@clerk/nextjs"
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
  const [summary, setSummary] = useState<TokenSummary>({
    status: "token_missing",
    reason: "not_signed_in_or_unloaded",
  })

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
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Auth proof</p>
        <h1 className="text-4xl font-black text-slate-950">Clerk session status</h1>
        <p className="max-w-3xl text-base leading-7 text-slate-700">{boundary}</p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {auth.isSignedIn !== true ? (
          <div className="grid gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Sign-in required</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The provider session has not been established in this browser context.
              </p>
            </div>
            <SignIn routing="hash" />
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  {hasToken ? "Session token available" : "Session token unavailable"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The route reports redacted token facts only.
                </p>
              </div>
              <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-bold text-amber-800">
                {hasToken ? "Session present" : "Token missing"}
              </span>
            </div>

            {hasToken ? (
              <dl className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-bold text-slate-950">Token shape</dt>
                  <dd className="mt-1 text-slate-600">{summary.tokenShape}</dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-950">Length band</dt>
                  <dd className="mt-1 text-slate-600">{summary.tokenLengthBand}</dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-950">Fingerprint</dt>
                  <dd className="mt-1 text-slate-600">{summary.tokenFingerprint}</dd>
                </div>
              </dl>
            ) : (
              <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Clerk reported a signed-in browser session, but no usable request token was available.
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

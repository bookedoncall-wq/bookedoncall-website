import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import AuthProofSessionClient from "./session-client"

export const metadata: Metadata = {
  title: "Auth Session Proof",
  robots: {
    index: false,
    follow: false,
  },
}

const AUTH_PROOF_BOUNDARY =
  "Proof-only route. It renders Clerk session state without owner APIs, customer data, business authorization, or raw token output."

type ProofConfig =
  | {
      status: "enabled"
      publishableKey: string
    }
  | {
      status: "blocked"
      reason: string
    }

function resolveProofConfig(): ProofConfig {
  const flag = process.env.NEXT_PUBLIC_BOOKEDONCALL_AUTH_PROOF_SESSION_PAGE?.trim()
  if (flag !== "enabled") {
    return {
      status: "blocked",
      reason: "Auth proof route flag is not enabled for this build.",
    }
  }

  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim()
  if (!publishableKey) {
    return {
      status: "blocked",
      reason: "Clerk publishable key is not configured for this build.",
    }
  }

  if (!/^pk_(?:test|live)_[A-Za-z0-9._-]+$/.test(publishableKey)) {
    return {
      status: "blocked",
      reason: "Clerk publishable key has an unsafe shape.",
    }
  }

  return {
    status: "enabled",
    publishableKey,
  }
}

export default function AuthProofSessionPage() {
  const config = resolveProofConfig()
  if (config.status !== "enabled") {
    return <AuthProofBlocked reason={config.reason} />
  }

  return (
    <ClerkProvider publishableKey={config.publishableKey}>
      <AuthProofSessionClient boundary={AUTH_PROOF_BOUNDARY} />
    </ClerkProvider>
  )
}

function AuthProofBlocked({ reason }: { reason: string }) {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-20">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-slate-950 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Auth proof</p>
        <h1 className="mt-3 text-3xl font-black">Session proof unavailable</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">{reason}</p>
        <p className="mt-4 text-sm leading-6 text-slate-600">{AUTH_PROOF_BOUNDARY}</p>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface PlanCheckoutButtonProps {
  planId: string
  label?: string
  highlighted?: boolean
  className?: string
}

export function PlanCheckoutButton({
  planId,
  label = "Get Started",
  highlighted = false,
  className,
}: PlanCheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error ?? "Unable to start checkout. Please try again.")
        setLoading(false)
      }
    } catch {
      setError("Unable to start checkout. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={loading}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-base transition-colors",
          highlighted
            ? "bg-amber-500 hover:bg-amber-400 text-white shadow-sm"
            : "bg-slate-900 hover:bg-slate-800 text-white",
          loading && "opacity-70 cursor-not-allowed",
          className
        )}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Redirecting to payment…" : label}
      </button>
      {error && (
        <p className="text-sm text-red-600 text-center mt-2">{error}</p>
      )}
    </div>
  )
}

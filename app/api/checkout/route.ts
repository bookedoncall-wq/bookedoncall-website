import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { plans } from "@/config/pricing"

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }
  return new Stripe(key, { apiVersion: "2026-03-25.dahlia" })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { planId } = body as { planId: string }

    const plan = plans.find(
      (p) => p.planId.toLowerCase() === planId.toLowerCase()
    )

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    if (!plan.stripeMonthlyPriceId) {
      return NextResponse.json(
        { error: "Payment not configured for this plan. Please contact support." },
        { status: 500 }
      )
    }

    const stripe = getStripe()
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "https://app.bookedoncall.com"
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://bookedoncall.com"

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: plan.stripeMonthlyPriceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/sign-up?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: {
        planName: plan.name,
        planId: plan.planId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("[checkout] Stripe error:", err)
    return NextResponse.json(
      { error: "Failed to start checkout. Please try again." },
      { status: 500 }
    )
  }
}

# 2026-07-01 Demo Availability Boundary

## Goal

Remove a public-website buyer-trust mismatch where surrounding marketing copy implied the live web voice demo is always available, even though the controlled demo route can intentionally return unavailable while example calls and setup review remain available.

## Current State

- Website source started at clean HEAD `fc865dd`, one commit ahead of origin.
- `config/public-site-contract.json` still has `featureFlags.selfServeCheckout=false`, so buying CTAs remain on the setup/request path rather than app checkout.
- The public demo runtime already fails closed when `BOOKEDONCALL_DEMO_VOICE_ENABLED` or required provider env is unavailable.
- The copy around FAQ, Resources, Demo Calls, Sign-up, Email integration, and Examples still used unconditional "try/start the live web voice demo" language.

## Files Changed

- `config/marketing.ts`
  - Changed FAQ and Resources copy to say the live web voice demo is usable when available.
- `app/demo-calls/page.tsx`
  - Updated metadata, structured-data description, intro copy, demo-state copy, and buyer-checkpoint copy so example calls and setup review remain visible fallback paths when the live demo is unavailable.
- `components/marketing/VapiDemoCallPreview.tsx`
  - Updated the public demo intro to avoid promising the demo is always available.
- `app/sign-up/page.tsx`
  - Updated the pre-setup demo prompt to avoid always-available live demo language.
- `app/integrations/email/page.tsx`
  - Updated the demo call cross-link copy.
- `app/examples/page.tsx`
  - Updated the examples next-step copy.
- `scripts/verify-journeys.mjs`
  - Pinned the `/demo-calls` fallback copy in production-mode journey verification.

## Commands Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- `npm run verify:runtime`
- `npm run verify:journeys`
- `npm run verify:seo`
- `npm run verify:visual-layout -- --no-screenshots --routes=/demo-calls,/faq,/sign-up,/examples,/integrations/email`
- `npm run verify:production-leads`
- `npm run verify:visual-layout -- --no-screenshots`

## Proof Level

Website repo proof plus local production-mode website proof. The changed routes passed contract checks, lint, build, runtime, journey, SEO, synthetic lead-path verification, focused visual layout verification across three viewports, and a full no-screenshot visual layout sweep.

This is not deployed website proof, exact Vercel deployment identity proof, provider proof, live voice proof, customer-data proof, billing proof, legal approval, revenue readiness, public self-serve readiness, or launch readiness.

## Validation Not Run

- No live origin check at `https://www.bookedoncall.com`.
- No Vercel deployment inspection.
- No real live voice demo start.
- No legal/counsel due diligence.

## Risks

- The live website will still show the older unconditional copy until this website commit is deployed.
- The live demo itself remains dependent on provider/env configuration and rate limits; this batch only fixes public expectation-setting and verifier coverage.

## Next Prompt

Continue customer-facing website hardening only if a specific buyer-facing contradiction is substantiated. Otherwise return to V2/app launch work, and do not refresh founder-gated deployment, auth, provider, billing, customer-data, live, or legal proof rows outside a release/freeze checkpoint.

# 2026-06-24 Setup Expectation CTA

## Goal

Continue the public website review after the V2 artificial customer-experience packet, avoid re-proving the already-shipped examples audit, and remove a buyer hesitation loop: "What do I need ready, and what happens before callers hear this?"

## Current State

- V2 launch context at reviewed head `77ce029e` remains `private_pilot_prep_only`.
- Website setup-interest capture is allowed; public checkout, live customer calls, real customer data, provider readiness, revenue readiness, launch readiness, and legal approval remain separate and blocked by their owning gates.
- Current website truth, journey, runtime, SEO, and visual checks are healthy.
- Added a reusable setup-expectation strip to the shared CTA band so high-intent pages explain:
  - what the owner should bring to setup,
  - which rules get reviewed before callers rely on them,
  - that callers hear BookedOnCall only after a setup review call.
- Pinned the new buyer guidance in production-mode journey checks on `/`, `/product`, `/pricing`, `/demo-calls`, and `/examples`.

## Files Changed

- `components/marketing/CtaBand.tsx`
- `scripts/verify-journeys.mjs`

## Commands Run

- From V2:
  - `pnpm --silent ai:launch-context -- --json`
- From website:
  - `npm run verify:content`
  - `npm run check:public-truth`
  - `npm run build`
  - `npm run lint`
  - `npm run verify:journeys`
  - `npm run verify:visual-layout -- --routes=/,/pricing,/examples,/demo-calls,/for/plumbers --screenshot-dir=artifacts/screenshots/2026-06-24-setup-expectations --json-out=artifacts/reviews/2026-06-24-setup-expectations-visual.json`
  - Targeted local Chrome CDP screenshots for the new CTA band:
    - `artifacts/screenshots/2026-06-24-setup-expectations-targeted/desktop-pricing-cta-clip.png`
    - `artifacts/screenshots/2026-06-24-setup-expectations-targeted/iphone-examples-cta-clip.png`
  - `npm run verify:security`
  - `git diff --check`
  - `npm run build`
  - `npm run verify:runtime`
  - `npm run verify:seo`
  - `npm run verify:visual-layout -- --no-screenshots`

## Proof Level

Website repo proof plus local production-mode browser proof.

The validation proves local built website behavior, public route copy/journeys, SEO crawl shape, secret/audit checks, and local Chrome visual layout for the changed CTA. It does not prove deployed website output, exact Vercel deployment identity, provider readiness, live voice behavior, customer-data readiness, billing readiness, revenue readiness, public self-serve readiness, launch readiness, or legal/counsel approval.

## Validation Notes

- Running `verify:runtime`, `verify:seo`, and `verify:visual-layout` in parallel caused stale/inconsistent `.next` output where `next start` could not find `.next/server/app/page.js`. Rebuilding once restored a clean production output, and the runtime/SEO/visual verifiers passed sequentially.
- The generated screenshot/review artifacts are ignored evidence outputs and were not staged.

## Risks And Open Questions

- The CTA copy improves buyer clarity but still does not replace real owner usability research.
- The website still intentionally routes setup starts to the lead/setup path because `featureFlags.selfServeCheckout` is false.
- Legal pages are public launch drafts; this batch did not perform counsel review.

## Next Prompt

Continue with the next AI-ownable launch slice rather than refreshing stable website checks. In V2, the launch context still lists owner setup activation and service/service-area/pricing guardrails as AI-owned blockers; use the selected workflow packet and ship a real rehearsal or product fix, keeping provider/live/legal/customer-data proof separate.

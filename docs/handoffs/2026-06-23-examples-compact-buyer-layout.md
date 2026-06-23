# 2026-06-23 Examples Compact Buyer Layout

## Goal

Clean up the public examples page so a trades owner can scan the value and trust boundaries quickly instead of scrolling through eight fully open transcripts. Preserve the prime-product examples posture while keeping setup requirements, owner review, booking limits, pricing limits, and legal/proof boundaries honest.

## Current State

- The `/examples` page now leads each trade card with the buyer-useful decision path and owner summary.
- Full sample conversations remain available behind a native disclosure labeled `View sample conversation`.
- Public examples no longer include phone-number-like sample callback values; summaries now say `callback number captured`.
- The content verifier now blocks reintroducing `000-555-0000`-style public example values and requires the compact examples pattern.
- The journey verifier now requires `Decision path` and `View sample conversation` on `/examples`.
- Local visual proof shows the page is materially shorter:
  - Desktop document height moved from about `13990px` live pre-cleanup to `10734px` local post-cleanup.
  - iPhone document height moved from about `30634px` live pre-cleanup to `23998px` local post-cleanup.

## Files Changed

- `app/examples/page.tsx`
- `scripts/verify-content.mjs`
- `scripts/verify-journeys.mjs`

## Validation Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- `npm run verify:runtime`
- `npm run verify:journeys`
- `npm run verify:seo`
- `npm run security:secrets`
- `npm run verify:visual-layout -- --routes=/examples --screenshot-dir=artifacts/screenshots/2026-06-23-examples-compact-layout-local --json-out=artifacts/reviews/2026-06-23-examples-compact-layout-local.json`

Live pre-cleanup reference collected:

- `npm run verify:visual-layout -- --origin=https://www.bookedoncall.com --routes=/examples --screenshot-dir=artifacts/screenshots/2026-06-23-live-examples-pre-cleanup --json-out=artifacts/reviews/2026-06-23-live-examples-pre-cleanup.json`

Attempted but not used as passing evidence:

- `npm run verify:visual-layout -- --no-screenshots` exited nonzero on default-route checks outside this examples batch, including `/demo-calls`, `/for/hvac`, `/for/plumbers`, `/integrations`, `/integrations/google-calendar`, `/integrations/jobber`, `/terms`, `/call-handling-notice`, and `/dpa` reporting missing visible h1 / first-screen CTA. The targeted `/examples` visual run above passed and is the scoped visual evidence for this change.

## Proof Level Reached

- Website repo proof: source, content contract, lint, build, runtime, journey, SEO, secret scan, and local production-mode visual proof passed.
- Live website observation was collected before this edit to confirm the current deployed examples page shape.

This is not deployed website proof for the edited commit, Vercel deployment identity proof, provider proof, live voice proof, customer-data proof, billing proof, legal approval, revenue readiness, or launch readiness.

## Validation Not Run

- No live deployed post-change verification yet.
- No Vercel connector deployment identity inspection.
- No passing full default-route visual sweep; the attempted sweep exposed unrelated pre-existing route issues outside this examples page batch.
- No legal/counsel review.
- No live voice, provider, app, billing, or customer-data proof.

## Risks And Blockers

- The examples page is still a long proof surface because it intentionally covers all eight supported trades.
- Mobile cards remain content-rich; if buyers still find it too heavy, the next iteration should add trade filters or a single-featured-example view before the full eight-card library.
- Several default-route visual checks outside `/examples` currently fail the broad no-screenshot sweep and should be triaged as a separate public-site quality batch.
- Legal copy remains materially stronger public draft language, not legal approval.

## Next Safest Task

If deploying this website batch, push the commit, wait for the public origin to update, and run live `/examples` visual verification against `https://www.bookedoncall.com`. If returning to V2, continue with the AI-owned owner activation or line-of-business guardrail gap without re-running stable proof as a standalone batch.

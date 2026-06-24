# 2026-06-24 Examples Configured Outcome Boundary

## Goal

Run the requested holistic public-website pass outside W3, verify the current customer-facing route surface, and ship the smallest buyer-facing fix found: make the examples page clearer that booked/confirmed outcomes are configured-product examples, not an immediate promise for every new buyer or public demo.

## Current State

- V2 launch context remains `private_pilot_prep_only`; production/provider/customer-data/revenue/live/launch readiness are still false.
- The website can accept setup interest and explain the mature configured product, but it must not imply public checkout, live answering, direct booking, provider writes, or customer-data readiness are available before setup and separate proof.
- Local production-mode checks showed the current 40-route website surface is mechanically healthy after a fresh build.
- Live public visual sweep over the same 40 routes passed before this local edit, proving the deployed site did not have the earlier broad first-screen h1/CTA visual failures at review time.

## Files Changed

- `app/examples/page.tsx`
  - Added a buyer-facing boundary block near the top of `/examples`:
    - confirmed appointments require reviewed service, coverage, scheduling permission, and booking rules
    - owner review remains available for urgent, pricing-sensitive, out-of-area, unsafe, or unclear jobs
    - website demos/examples do not change calendars, send texts, dispatch crews, or create real customer records
- `scripts/verify-journeys.mjs`
  - Pins the new `/examples` boundary language in production-mode journey verification.

## Commands Run

- From V2 for claim boundaries:
  - `pnpm --silent ai:workflows -- --json`
  - `pnpm --silent ai:launch-context -- --json`
- From website:
  - `npm run verify:content`
  - `npm run check:public-truth`
  - `npm run verify:journeys -- --json-out=artifacts/reviews/2026-06-24-holistic-website-journeys-before.json`
  - `npm run build`
  - `npm run verify:runtime`
  - `npm run verify:seo`
  - `npm run verify:visual-layout -- --no-screenshots --json-out=artifacts/reviews/2026-06-24-holistic-website-visual-before.json`
  - `npm run verify:visual-layout -- --no-screenshots --routes=/,/product,/features,/how-it-works,/pricing,/login,/sign-up,/industries,/for/plumbers,/for/hvac,/for/electricians,/for/painters,/for/flooring,/for/landscaping,/for/roofing,/for/general-home-services,/integrations,/integrations/jobber,/integrations/google-calendar,/integrations/email,/integrations/text-sms,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/resources,/demo-calls,/examples,/compare/ai-receptionist-vs-voicemail,/compare/missed-calls-for-home-service-businesses,/compare/answering-service-vs-receptionist-vs-ai-receptionist,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers,/faq,/about,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa,/contact --json-out=artifacts/reviews/2026-06-24-holistic-website-full-visual-before.json`
  - `npm run verify:visual-layout -- --origin=https://www.bookedoncall.com --no-screenshots --routes=/,/product,/features,/how-it-works,/pricing,/login,/sign-up,/industries,/for/plumbers,/for/hvac,/for/electricians,/for/painters,/for/flooring,/for/landscaping,/for/roofing,/for/general-home-services,/integrations,/integrations/jobber,/integrations/google-calendar,/integrations/email,/integrations/text-sms,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/resources,/demo-calls,/examples,/compare/ai-receptionist-vs-voicemail,/compare/missed-calls-for-home-service-businesses,/compare/answering-service-vs-receptionist-vs-ai-receptionist,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers,/faq,/about,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa,/contact --json-out=artifacts/reviews/2026-06-24-holistic-website-full-visual-live-before.json`
  - `npm run lint`
  - `npm run build`
  - `npm run verify:journeys -- --json-out=artifacts/reviews/2026-06-24-examples-boundary-journeys.json`
  - `npm run verify:visual-layout -- --routes=/examples --screenshot-dir=artifacts/screenshots/2026-06-24-examples-boundary-local --json-out=artifacts/reviews/2026-06-24-examples-boundary-visual-local.json`
  - `npm run verify:runtime`
  - `npm run verify:seo`
  - `npm run verify:visual-layout -- --no-screenshots --routes=/,/product,/features,/how-it-works,/pricing,/login,/sign-up,/industries,/for/plumbers,/for/hvac,/for/electricians,/for/painters,/for/flooring,/for/landscaping,/for/roofing,/for/general-home-services,/integrations,/integrations/jobber,/integrations/google-calendar,/integrations/email,/integrations/text-sms,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/resources,/demo-calls,/examples,/compare/ai-receptionist-vs-voicemail,/compare/missed-calls-for-home-service-businesses,/compare/answering-service-vs-receptionist-vs-ai-receptionist,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers,/faq,/about,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa,/contact --json-out=artifacts/reviews/2026-06-24-examples-boundary-full-visual-local.json`
  - `npm run security:secrets`
  - `npm run verify:security`
  - `git diff --check`

## Proof Level

- Website repo proof: content contract, public truth contract, lint, build, production-mode journey, runtime, SEO, secrets, npm audit, and local visual layout checks passed.
- Local browser proof: `/examples` screenshot proof passed on desktop, iPhone, and Android viewports after the edit.
- Live website observation before the edit: the deployed public site passed the full 40-route visual sweep at `https://www.bookedoncall.com`.

This does not prove deployed output for this edited commit, exact Vercel deployment identity, provider readiness, live voice behavior, customer-data readiness, billing readiness, launch readiness, or legal/counsel approval.

## Validation Not Run

- No deployment or post-deploy live verification for this local edit.
- No Vercel connector deployment identity inspection.
- No live voice demo call.
- No legal/counsel due diligence.

## Risks And Notes

- The full website route surface was mechanically healthy in local and live visual checks, so the shipped change is a claim-boundary/customer-trust improvement rather than a visual rescue.
- The examples page still intentionally includes one direct-booking showcase because the website rules allow prime configured-product examples. The new boundary block makes the setup and demo limits visible before buyers reach that example.
- Generated screenshot/review artifacts are ignored evidence outputs and were not added to git status.

## Next Safest Task

Deploy or push this website commit if the operator intends the boundary improvement to go live, then run live `/examples` and full-route visual verification against `https://www.bookedoncall.com`. If staying in V2, return to owner setup activation or service-area/services/pricing guardrail rehearsal; do not refresh founder-gated provider/live/deployment rows per commit.

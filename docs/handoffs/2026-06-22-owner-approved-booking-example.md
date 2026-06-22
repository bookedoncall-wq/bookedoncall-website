# 2026-06-22 Owner-Approved Booking Example

## Goal

Finish the website examples review after the live full-site audit by filling the remaining customer-facing examples gap: the page described owner-approved booking requests, but only showed direct booking, urgent callback, and manual review outcomes.

## Current State

- Live `https://www.bookedoncall.com/examples` already reflects the earlier repaired layout, not the sparse layout shown in the user's screenshot.
- Live full-site visual verification passed across all 40 sitemap routes and desktop/iPhone/Android viewports before this source edit.
- Live HTML copy audit passed across all 40 sitemap routes: every route returned 200, every route had one H1, and no scanned internal proof/provider/unsupported-integration phrases appeared.
- The examples page now covers four core customer-ready outcomes:
  - direct booking when the owner has enabled it for that setup,
  - owner-approved booking request pending confirmation,
  - urgent owner alert and callback handoff,
  - manual-review callback for safety-sensitive work.

## Files Changed

- `app/examples/page.tsx`
  - Added a roofing leak example where the caller selects a preferred window, BookedOnCall sends it as an owner-approved booking request, and the page clearly says no appointment is confirmed until the owner approves it.
- `scripts/verify-journeys.mjs`
  - Added `Booking request pending owner confirmation` to the `/examples` route expectations so the review-first booking outcome remains covered.

## Commands Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-22-owner-approved-booking-example.json`
- `npm run verify:visual-layout -- --routes=/examples --json-out=artifacts/reviews/2026-06-22-owner-approved-booking-example-visual.json --screenshot-dir=artifacts/screenshots/owner-approved-booking-example-2026-06-22`
- `npm run verify:runtime`
- `npm run verify:seo`
- `npm run verify:security`
- `npm run verify:visual-layout -- --routes=/,/product,/industries,/integrations,/resources,/features,/how-it-works,/pricing,/login,/sign-up,/about,/faq,/demo-calls,/examples,/compare/answering-service-vs-receptionist-vs-ai-receptionist,/compare/missed-calls-for-home-service-businesses,/compare/after-hours-call-answering-for-hvac,/compare/ai-receptionist-vs-voicemail,/compare/after-hours-call-answering-for-plumbers,/for/plumbers,/for/hvac,/for/electricians,/for/painters,/for/flooring,/for/landscaping,/for/roofing,/for/general-home-services,/integrations/jobber,/integrations/google-calendar,/integrations/email,/integrations/text-sms,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa,/contact --json-out=artifacts/reviews/2026-06-22-owner-approved-booking-example-full-visual.json --screenshot-dir=artifacts/screenshots/owner-approved-booking-example-full-visual-2026-06-22`

## Proof Level

Website repo proof and local production-mode website proof. The live pre-edit audit reached deployed website visual proof for the existing live site, but the new owner-approved booking request example has not been deployed or rechecked on production at the time this handoff was written.

This is not app proof, provider proof, live voice proof, billing proof, customer-data proof, public self-serve launch readiness, revenue readiness, or legal approval.

## Validation Notes

- `verify:runtime` initially returned 500s because the existing `.next` output had stale Turbopack runtime chunk references. Removing only the generated `.next` directory and rebuilding fixed the runtime verifier.
- Two unrelated untracked duplicate scratch files remain and were not staged:
  - `docs/handoffs/2026-06-22-launch-legal-diligence 2.md`
  - `docs/legal/2026-06-19-launch-legal-review 2.md`

## Risks And Blockers

- The new example is product-prime marketing copy for a configured shop; it does not prove the V2 app is live-ready for owner-approved booking requests.
- Legal pages remain materially stronger public drafts, not outside-counsel approval.
- True paid customer go-live remains blocked by app/checkout/onboarding, live phone, live billing, customer-data, support/privacy, and provider proof gates.

## Next Prompt

After deployment, verify `https://www.bookedoncall.com/examples` contains `Roofing leak call with owner-approved booking request` and rerun the focused live visual check for `/examples`. Then return to V2 app proof for first paid customer go-live.

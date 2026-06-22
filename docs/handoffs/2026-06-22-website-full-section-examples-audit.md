# Website Full-Section Examples Audit Handoff

Date: 2026-06-22

## Goal

Review the customer-facing BookedOnCall website across the product, industry, integration, resource, legal, contact, login, and signup surfaces; make safe copy/content improvements; keep V2/app truth and prime-product positioning aligned without overstating current availability.

## Current State

- Website AGENTS now explicitly preserves the intended-prime-product rule: examples and mature-product pages may describe configured/after-setup behavior, not only currently tested surfaces, as long as current availability remains honest.
- The live website legal pages are already materially stronger and publicly visible with `Last updated: 2026-06-22`.
- The live deployed website visual audit passed before this edit over 40 customer-facing routes across desktop, iPhone, and Android.
- This batch improved the examples page by adding the missing service-area review outcome and removing internal-sounding caller-ID wording from owner summaries.
- The updated examples page was pushed to `origin/main`, appeared on `https://www.bookedoncall.com/examples`, and the live deployed 40-route visual audit passed after deployment.

## Files Changed

- `AGENTS.md`
  - Added a precise rule for prime-product examples and mature-product pages.
- `app/examples/page.tsx`
  - Added a landscaping service-area review callback example.
  - Removed `callback number captured from caller ID authorization` from all owner summaries.
  - Updated examples metadata/schema descriptions to include service-area review.
- `config/marketing.ts`
  - Updated the resources-card examples description to reflect the broader examples set.
- `scripts/verify-journeys.mjs`
  - Added `Service-area review callback` as a protected `/examples` journey snippet.

## Section Audit Notes

- Product pages: customer-facing copy is aligned with configured product value, not internal proof language.
- Industry pages: broad coverage exists for plumbers, HVAC, electricians, painters, flooring, landscaping, roofing, and general home services. They are intentionally lightweight but not misleading.
- Integration pages: Jobber, Google Calendar, email, and Text / SMS are framed as setup-enabled; QuickBooks, Housecall Pro, and ServiceTitan remain visibly planned/roadmap.
- Resources and examples: examples now cover direct booking, owner-approved booking request, urgent escalation, service-area review, and safety/manual review.
- Pricing and signup: self-serve checkout remains disabled in the public contract; CTAs route to setup request rather than claiming checkout-ready self-serve.
- Legal pages: stronger drafts are live, but this remains counsel-review draft posture, not legal approval.

## Commands Run

- `node scripts/verify-visual-layout.mjs --origin=https://www.bookedoncall.com --routes=/,/product,/features,/how-it-works,/pricing,/login,/industries,/for/plumbers,/for/hvac,/for/electricians,/for/painters,/for/flooring,/for/landscaping,/for/roofing,/for/general-home-services,/integrations,/integrations/jobber,/integrations/google-calendar,/integrations/email,/integrations/text-sms,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/resources,/demo-calls,/examples,/compare/ai-receptionist-vs-voicemail,/compare/missed-calls-for-home-service-businesses,/compare/answering-service-vs-receptionist-vs-ai-receptionist,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers,/faq,/about,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa,/contact,/sign-up --json-out=artifacts/reviews/2026-06-22-live-full-site-audit-latest.json --screenshot-dir=artifacts/screenshots/2026-06-22-live-full-site-audit`
- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- `npm run verify:runtime`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-22-examples-service-area-audit.json`
- `npm run verify:seo`
- `node scripts/verify-visual-layout.mjs --routes=/,/product,/features,/how-it-works,/pricing,/login,/industries,/for/plumbers,/for/hvac,/for/electricians,/for/painters,/for/flooring,/for/landscaping,/for/roofing,/for/general-home-services,/integrations,/integrations/jobber,/integrations/google-calendar,/integrations/email,/integrations/text-sms,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/resources,/demo-calls,/examples,/compare/ai-receptionist-vs-voicemail,/compare/missed-calls-for-home-service-businesses,/compare/answering-service-vs-receptionist-vs-ai-receptionist,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers,/faq,/about,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa,/contact,/sign-up --json-out=artifacts/reviews/2026-06-22-examples-service-area-local-visual-layout.json --screenshot-dir=artifacts/screenshots/2026-06-22-examples-service-area-local-visual`
- `npm run security:secrets`
- `git diff --check`
- `git push origin main`
- Live `/examples` poll confirming `Service-area review callback` is present and `caller ID authorization` is absent.
- `node scripts/verify-visual-layout.mjs --origin=https://www.bookedoncall.com --routes=/,/product,/features,/how-it-works,/pricing,/login,/industries,/for/plumbers,/for/hvac,/for/electricians,/for/painters,/for/flooring,/for/landscaping,/for/roofing,/for/general-home-services,/integrations,/integrations/jobber,/integrations/google-calendar,/integrations/email,/integrations/text-sms,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/resources,/demo-calls,/examples,/compare/ai-receptionist-vs-voicemail,/compare/missed-calls-for-home-service-businesses,/compare/answering-service-vs-receptionist-vs-ai-receptionist,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers,/faq,/about,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa,/contact,/sign-up --json-out=artifacts/reviews/2026-06-22-examples-service-area-live-visual-layout.json --screenshot-dir=artifacts/screenshots/2026-06-22-examples-service-area-live-visual`

## Validation Result

All commands above passed.

## Proof Boundary

- Live deployed website visual proof was collected before and after this edit from `https://www.bookedoncall.com`.
- Local production-mode website proof was collected before deployment.
- This does not prove outside-counsel approval, legal compliance, live voice behavior, provider readiness, self-serve checkout readiness, billing readiness, customer-data readiness, or first-paid-customer go-live readiness.

## Remaining Risks And Follow-Ups

- Outside counsel still needs to review Terms, Privacy, DPA, Call Handling Notice, SMS Terms, recording consent, TCPA/SMS posture, renewal/cancellation language, and privacy request operations.
- The website still sells a mature configured product. The app must continue turning those claims into executable setup, acceptance, call notice, SMS consent, booking, billing, and support workflows before broader self-serve launch.

## Next Prompt

Continue the BookedOnCall launch-readiness goal. If deploying this website batch, verify the exact deployed website output after deployment and keep legal approval separate from website proof. If returning to V2, start in `/Users/david/Documents/bookedoncall-v2`, run the session-start and launch-context sequence, then pick the highest safe P0 remaining that removes a founder loop.

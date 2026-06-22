# 2026-06-22 Examples Layout Refresh

## Goal

Make the public `/examples` page feel customer-ready and consistent with the rest of the website after the owner review noted that the examples page looked poor and the top-right hero area felt busy.

## Current State

- `/examples` now uses a dedicated dark website-matched hero instead of the generic page intro.
- The hero keeps the required after-setup boundary but reduces the desktop top-right area to a single reviewed-setup note, not a checklist wall.
- The examples now include anchor IDs and a compact decision-path index so owners can jump to direct booking, urgent callback, owner confirmation, service-area review, or safety review examples.
- The example cards use tighter spacing, consistent 8px radii, smaller transcript bubbles, and a desktop-sticky caller outcome panel.
- Customer-facing copy still frames the flows as after-setup/configured examples and does not claim every behavior is live for every buyer today.
- `AGENTS.md` was reviewed and left unchanged; it already aligns the website to V2, the app, and `config/public-site-contract.json`.

## Files Changed

- `app/examples/page.tsx`
- `docs/handoffs/2026-06-22-examples-layout-refresh.md`

## Commands Run

- `npm run verify:content` - passed
- `npm run check:public-truth` - passed
- `npm run lint` - passed
- `npm run build` - passed
- `node scripts/verify-visual-layout.mjs --routes=/examples --json-out=artifacts/reviews/2026-06-22-examples-layout-refresh.json --screenshot-dir=artifacts/screenshots/2026-06-22-examples-layout-refresh` - passed
- `npm run verify:runtime` - initially passed, later failed once because `.next/server/app/page.js` was missing from a stale build artifact after repeated visual runs
- `rm -rf .next && npm run build` - passed; clean rebuild restored the runtime artifact
- `npm run verify:runtime` - passed after clean rebuild
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-22-examples-layout-refresh.json` - passed after clean rebuild
- `npm run verify:seo` - passed after clean rebuild
- `node scripts/verify-visual-layout.mjs --routes=/,/product,/features,/how-it-works,/pricing,/login,/industries,/for/plumbers,/for/hvac,/for/electricians,/for/painters,/for/flooring,/for/landscaping,/for/roofing,/for/general-home-services,/integrations,/integrations/jobber,/integrations/google-calendar,/integrations/email,/integrations/text-sms,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/resources,/demo-calls,/examples,/compare/ai-receptionist-vs-voicemail,/compare/missed-calls-for-home-service-businesses,/compare/answering-service-vs-receptionist-vs-ai-receptionist,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers,/faq,/about,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa,/contact,/sign-up --json-out=artifacts/reviews/2026-06-22-examples-layout-refresh-all-public-routes.json --screenshot-dir=artifacts/screenshots/2026-06-22-examples-layout-refresh-all-public-routes` - passed after clean rebuild; 40 routes, 3 viewports
- `npm run security:secrets` - passed
- `git diff --check` - passed

## Proof Level

Repo proof and local production-mode website proof only. This is not deployed website proof, V2 app proof, provider proof, live voice proof, billing proof, customer-data proof, revenue readiness, launch readiness, or legal approval.

## Validation Not Run

- No legal counsel review.
- No live customer traffic, live voice/provider, checkout, billing, or CRM proof.
- No deployed-site verification yet in this handoff.

## Risks And Notes

- Legal pages remain public launch drafts until counsel approves them.
- `featureFlags.selfServeCheckout` remains false, so public buying CTAs must continue routing to setup/lead paths.
- Existing untracked duplicate files were not staged: `docs/handoffs/2026-06-22-launch-legal-diligence 2.md`, `docs/legal/2026-06-19-launch-legal-review 2.md`, and `tmp/`.

## Next Prompt

Deploy the website examples layout refresh, verify the deployed `/examples` page and public-route smoke output, then return to V2 AI-operations work or the owner-console simplification depending on the active launch priority.

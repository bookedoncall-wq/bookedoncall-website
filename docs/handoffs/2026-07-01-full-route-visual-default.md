# Full Route Visual Default

## Goal

Remove the recurring founder/operator loop of hand-building the public website full-section visual audit command. The default website visual verifier now covers the full customer-facing route inventory that buyers can use to discover, compare, request setup, read examples, and review legal/contact pages.

## Current State

- `npm run verify:visual-layout` now defaults to the 40 customer-facing routes used by the public sitemap and journey checks.
- The customer-facing route inventory lives in one script-level source of truth for content, journey, and visual verification.
- Local production-mode visual verification passed for all 40 routes across desktop, iPhone, and Android viewports.
- Live custom-domain visual verification also passed for all 40 routes across the same three viewport sizes.

## Files Changed

- `scripts/lib/customer-facing-routes.mjs`
- `scripts/verify-content.mjs`
- `scripts/verify-journeys.mjs`
- `scripts/verify-visual-layout.mjs`
- `/Users/david/Documents/bookedoncall-v2/docs/LAUNCH-RUNBOOK.md`

## Validation Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- `npm run verify:runtime`
- `npm run verify:journeys`
- `npm run verify:seo`
- `npm run verify:visual-layout -- --no-screenshots`
- `npm run verify:visual-layout -- --origin=https://www.bookedoncall.com --no-screenshots`
- `npm run security:secrets`
- `git diff --check`

## Proof Level

Website repo proof, local production-mode website proof, and live deployed website visual proof for the current public custom domain.

## Validation Not Run

- No deployment was performed; `curl` and live visual checks showed the custom domain already served the redacted examples page.
- No provider calls, live voice calls, app checkout proof, customer-data proof, billing proof, or legal approval.
- No Safari-specific visual proof.

## Risks And Blockers

- This improves website QA coverage and buyer-path confidence, but it does not clear V2 launch, revenue, live voice, customer-data, provider, or legal readiness.
- Future customer-facing route additions should update `scripts/lib/customer-facing-routes.mjs` so content, journey, and visual verification stay aligned.

## Next Prompt

Continue the launch goal by using the expanded website verifier after any public-site content or visual changes, or return to V2 and pick only verified customer-path gaps that remove a founder loop without refreshing stable proof rows.

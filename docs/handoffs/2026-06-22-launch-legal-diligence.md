# 2026-06-22 Website Review, Examples Repair, And Legal Diligence

## Goal

Review the live customer-facing website, fix the poor `/examples` desktop layout, preserve the materially stronger legal draft updates for publication, and align the website operator instructions with V2 proof and product truth.

## Current State

- Live `https://www.bookedoncall.com` passed the existing visual layout verifier across 13 customer-facing routes and desktop/iPhone/Android viewports.
- The live `/examples` page still had a conversion-quality problem that the mechanical verifier did not catch: the first example card used a wide sparse layout with too much empty space in the case-study area.
- Local `/examples` now uses sectioned example cards with a compact header, explicit caller-outcome panel, and framed checks/owner-summary panels.
- The visual verifier now includes `/examples`, `/industries`, and public legal pages by default so future full-site visual checks cover the surfaced issue and the launch legal surface.
- `AGENTS.md` now routes website agents to V2 for product/proof truth, keeps `config/public-site-contract.json` as the website public claim contract, and preserves separate proof/legal/deployment boundaries.
- Legal pages remain counsel-review drafts, not legal approval, but the updated public disclosures are materially better than the current live baseline.

## Files Changed

- `AGENTS.md`
  - Added BookedOnCall website operator rules aligned to V2 proof posture, public claim boundaries, legal draft status, common checks, and definition of done.
- `app/examples/page.tsx`
  - Reworked example cards to remove the large sparse desktop field and make caller outcome, conversation, checks, owner summary, and customer follow-up easier to scan.
- `scripts/verify-visual-layout.mjs`
  - Expanded default visual route coverage to include `/examples`, `/industries`, `/privacy`, `/terms`, `/call-handling-notice`, `/sms-terms`, and `/dpa`.
- `app/terms/page.tsx`
  - Strengthened electronic acceptance, subscription renewal/cancellation/refund, payment recovery, third-party permissions, and material-change language.
- `app/privacy/page.tsx`
  - Added Google API Limited Use wording, connected-calendar handling, rights-request workflow, appeal language, state privacy posture, and sensitive/regulated data exclusions.
- `app/dpa/page.tsx`
  - Added Google-data restrictions, subprocessor categories, account-specific subprocessor information, and material change-notice posture.
- `app/call-handling-notice/page.tsx`
  - Strengthened AI-assisted call, recording/transcription consent, stricter-state fallback, and alternate-path language.
- `app/sms-terms/page.tsx`
  - Strengthened STOP/HELP, broader revocation wording, marketing-consent boundary, and ten-business-day TCPA opt-out target.
- `config/public-site-contract.json`
  - Updated legal `lastUpdated` to `2026-06-22`.
- `docs/legal/2026-06-19-launch-legal-review.md`
  - Reworked as a counsel-review packet with official source areas, issue list, product changes required before paid go-live, counsel yes/no questions, approval scope, and proof boundary.

## Commands Run

- `npm run verify:visual-layout -- --origin=https://www.bookedoncall.com --routes=/,/product,/demo-calls,/examples,/pricing,/industries,/integrations,/sign-up,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa --json-out=artifacts/reviews/2026-06-22-live-website-visual-layout.json --screenshot-dir=artifacts/screenshots/live-website-review-2026-06-22`
- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run security:secrets`
- `npm run build`
- `npm run verify:security`
- `npm run verify:runtime`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-22-website-review.json`
- `npm run verify:seo`
- `npm run verify:visual-layout -- --json-out=artifacts/reviews/2026-06-22-local-website-visual-layout.json --screenshot-dir=artifacts/screenshots/local-website-review-2026-06-22`
- `npm run verify:homepage-hero`
- `npm run verify:production-leads`
- Local production-mode targeted screenshots for `/examples` at desktop scroll positions around the first example card:
  - `artifacts/screenshots/local-examples-scroll-review-2026-06-22/desktop-y780.png`
  - `artifacts/screenshots/local-examples-scroll-review-2026-06-22/desktop-y960.png`
  - `artifacts/screenshots/local-examples-scroll-review-2026-06-22/desktop-y1160.png`

## Validation Result

- Live website visual review: passed mechanically across the sampled current production routes, but confirmed the need for human visual review because the original `/examples` issue was not a clipping/overflow failure.
- Local production build: passed.
- Local journey proof: passed across 40 sitemap routes and 52 internal links.
- Local SEO proof: passed across 40 sitemap routes and 141 JSON-LD blocks.
- Local visual proof: passed across 18 routes and 3 viewports after adding `/examples` and legal routes to default coverage.
- Targeted screenshot inspection confirmed the patched `/examples` first case-study card no longer has the large sparse desktop layout shown in the user screenshot.
- Homepage hero proof: passed across 5 viewports.
- Production lead verification: passed synthetic checks; safe lead send was skipped without `--execute-send`, so this is not inbox delivery proof.
- Security verification: passed `npm audit --omit=dev --audit-level=moderate` and secret scan.

## Validation Not Run

- No deployed website proof for the local changes yet.
- No outside-counsel review or legal approval.
- No real Stripe, phone, SMS provider, calendar-write, customer-data, V2 production runtime, provider, or live voice proof.
- No manual legal review, keyboard-only accessibility pass, screen-reader pass, or formal contrast audit beyond the existing automated/browser layout checks.
- No live lead send or inbox delivery proof; `npm run verify:production-leads` was run without executing a real send.

## Risks And Blockers

- The legal pages are better public drafts, but counsel still needs to approve the Terms, Privacy Policy, DPA, Call Handling Notice, SMS Terms, subscription renewal/cancellation/refund language, SMS consent/revocation approach, Google Limited Use language, subprocessor posture, and public marketing claim boundaries.
- V2 still needs durable Terms/Privacy/SMS acceptance capture, call-notice behavior, SMS consent/STOP handling, privacy/export/deletion/support workflows, live billing proof, customer-data proof, provider proof, and phone go-live proof before first paid customer launch.
- `/examples` is now much better on desktop, but the examples page is still long on mobile because it intentionally shows full call transcripts and owner summaries.
- The generated live/local screenshot artifacts are evidence artifacts, not source changes.

## Proof Level

Highest proof reached: live website sampled visual review for current production output, plus local website repo proof and local production-mode browser proof for the changed build.

This does not prove deployed state for the new local changes, outside-counsel approval, legal compliance, provider proof, live voice proof, app proof, billing proof, customer-data proof, phone go-live, public self-serve readiness, or launch readiness.

## Next Prompt

Deploy the website changes, then verify the exact deployed output for `/examples`, legal pages, sitemap routes, and public CTAs. Keep the legal pages labeled as counsel-review drafts, not legal approval, and continue V2 launch work by converting the legal/public promises into executable app proof: acceptance capture, call-notice behavior, SMS consent/STOP handling, and support/privacy operator workflows.

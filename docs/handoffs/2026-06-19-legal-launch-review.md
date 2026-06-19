# 2026-06-19 Legal Launch Review

## Goal

Replace placeholder-level website legal posture with a stronger counsel-review draft and publishable public baseline before first paid customer launch.

## Current State

- Public legal surface now includes strengthened `/terms`, `/privacy`, and `/dpa`.
- Added `/call-handling-notice` for AI-assisted calls, recording/transcription, owner review, booking limits, emergency limits, and caller choices.
- Added `/sms-terms` for service texts, consent, STOP/HELP, frequency, carrier charges, delivery limits, and privacy.
- Footer, legal nav, sitemap, and `llms.txt` link the new legal notices.
- Lead form now states that submitted setup information may be used to contact the prospect and links Privacy/Terms.
- Public demo now states microphone audio may be processed and links Call Notice/Privacy.
- Internal counsel packet added at `docs/legal/2026-06-19-launch-legal-review.md` with C-suite review, product-compliance recommendations, outside-counsel questions, and proof boundary.

## Files Changed

- `app/terms/page.tsx`
- `app/privacy/page.tsx`
- `app/dpa/page.tsx`
- `app/call-handling-notice/page.tsx`
- `app/sms-terms/page.tsx`
- `components/legal/LegalPageShell.tsx`
- `components/layout/Footer.tsx`
- `components/marketing/LeadCaptureForm.tsx`
- `components/marketing/VapiDemoCallPreview.tsx`
- `app/sitemap.xml/route.ts`
- `app/llms.txt/route.ts`
- `config/public-site-contract.json`
- `scripts/verify-content.mjs`
- `scripts/verify-postbuild-seo.mjs`
- `docs/legal/2026-06-19-launch-legal-review.md`
- `docs/handoffs/2026-06-19-legal-launch-review.md`

## Commands Run

- `npm run lint`
- `npm run verify:content`
- `npm run build`
- `npm run verify:runtime`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-19-legal-launch-review.json`
- `npm run verify:seo`
- `npm run verify:security`
- `npm run check:public-truth`
- `git diff --check`
- `npm run verify:production-leads`
- Local production server: `npm run start -- --hostname 127.0.0.1 --port 4312`
- Chrome browser smoke via bundled Playwright package and local Google Chrome for `/terms`, `/privacy`, `/dpa`, `/call-handling-notice`, `/sms-terms`, `/sign-up`, and `/demo-calls` at desktop, iPhone-width, and Android-width viewports.

## Proof Level

Highest proof reached before deploy: website repo proof plus local production-mode browser proof.

This does not prove outside-counsel approval, legal compliance, production app acceptance capture, call-flow recording notice behavior, SMS provider compliance, A2P/10DLC readiness, Stripe live checkout, customer-data readiness, provider readiness, phone go-live, live voice quality, public-testing readiness, or launch readiness.

## C-Suite Product Actions Before Paid Go-Live

P0:

1. App or checkout must record Terms/Privacy acceptance with legal version, actor, account/business scope, timestamp, and source surface.
2. Call flow must include default AI/recording/transcription notice and a stricter account posture for all-party-consent jurisdictions if counsel requires it.
3. Outbound SMS must stay blocked until consent status, sender setup, STOP/HELP, opt-out honoring, rate limiting, and provider/A2P posture are reviewed.
4. Owner-approved booking requests should remain default; direct booking requires explicit owner opt-in and customer-specific calendar/provider proof.
5. Pricing quotes must stay ranges only unless a fixed price is explicitly configured.
6. Emergency escalation defaults must be reviewed in onboarding by vertical.
7. Privacy/export/deletion/support request intake must have an owner, verification process, and audit trail.
8. Checkout and invoice copy must align with Terms on price, included minutes, overages, taxes/fees, cancellation, and refund posture.

P1:

1. Named subprocessor list and change-notice process.
2. State privacy request packet or dashboard.
3. Customer-specific retention settings.
4. Incident response tabletop with legal-notice triggers.
5. Keyboard/focus and screen-reader-oriented accessibility pass for legal and signup pages.

## Validation Not Run

- No outside-counsel review.
- No live website deploy check yet in this handoff.
- No live microphone/demo call proof.
- No real lead send or inbox delivery.
- No SMS provider send, A2P/10DLC, or opt-out provider proof.
- No app checkout/legal acceptance implementation.
- No production call-flow recording notice proof.

## Next Prompt

Deploy and verify the website legal update on `https://www.bookedoncall.com`, then continue the launch-readiness goal by implementing P0 product-compliance actions in the app/repo before first paid customer go-live.

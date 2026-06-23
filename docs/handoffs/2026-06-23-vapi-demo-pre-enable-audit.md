# 2026-06-23 Vapi Demo Pre-Enable Audit

## Goal

Triple-check the eight-trade live web voice demo and examples before enabling the public Vapi path, clean stale dirty items, and make only enablement-critical fixes.

## Current State

- `main` was clean and aligned with `origin/main` after duplicate stale docs and old `tmp/` screenshots were removed.
- The eight demo profiles and eight showcase examples from `a1ec3c0` remain the public halo content.
- Production `https://www.bookedoncall.com/api/demo-session` currently reports `configured: false`, so the live demo remains disabled until production env is set.
- No additional caller friction was added around real customer data. The public page already warns that no real appointments, calendar changes, customer texts, or records are created from this page.

## Files Changed

- `app/api/demo-session/route.ts`
  - Rejects cross-origin live-demo session starts.
  - Caps env-configured public demo starts per hour at 10.
  - Caps env-configured public demo call length at 300 seconds.
- `scripts/verify-content.mjs`
  - Preserves the same-origin and max-call-duration route guards as content verification requirements.

## Validation Run

- `npm run verify:content`
- `npm run lint`
- `npm run build`
- `npm run check:public-truth`
- `npm run verify:runtime`
- `npm run security:secrets`
- `git diff --check`
- `node --check scripts/verify-content.mjs`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-23-vapi-demo-pre-enable-audit.json`
- `npm run verify:seo`
- `npm run verify:visual-layout -- --routes=/demo-calls,/examples --json-out=artifacts/reviews/2026-06-23-vapi-demo-pre-enable-audit-visual.json --screenshot-dir=artifacts/screenshots/2026-06-23-vapi-demo-pre-enable-audit`
- Local production route probes on `http://127.0.0.1:4513/api/demo-session`:
  - `GET` returned `ok: true` with configured local demo state.
  - Cross-origin `POST` with `Origin: https://evil.example` returned `403`.
  - No-origin `POST` for an allowed profile returned a session in the configured local environment.
- Deployed endpoint probe:
  - `https://www.bookedoncall.com/api/demo-session` returned `ok: true`, `configured: false`, `maxCallSeconds: 180`.

## Proof Level

Website repo proof plus local production-mode website proof. This is not deployed website proof for the new commit, provider proof, live voice proof, app proof, customer-data proof, billing proof, legal approval, or launch readiness.

## Validation Not Run

- `npm run check:scripts` was not available in this website repo.
- No real browser microphone/Vapi call was placed during this patch.
- No Vapi dashboard or production provider configuration was inspected.
- No deployed exact-SHA proof was run for this patch.

## Risks And Blockers

- Live Vapi quality remains unproven until production env points at the intended public-demo assistant and the founder smokes all eight profiles.
- The Vapi assistant must respect the variable values and system context sent by `VapiDemoCallPreview`; if the assistant is configured to ignore those values, the website cannot guarantee trade-specific live behavior by itself.
- The public demo is intentionally broad. If a visitor volunteers real customer details despite the warning, the current website does not add extra friction beyond the existing public-demo limits.

## Next Prompt

Enable the live web demo env, deploy the exact commit, then smoke `/demo-calls` across all eight profiles with a real browser microphone and record provider/live proof separately from website repo proof.

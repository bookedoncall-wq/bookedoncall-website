# 2026-06-21 Site Consistency And Conversion Cleanup

## Goal

Clean up public website language and visual consistency so the customer-facing site feels trustworthy, buyer-ready, and aligned with the current BookedOnCall launch posture.

## Changes

- Removed remaining customer-visible "private test call" framing from the homepage, demo, signup, example, API fallback, FAQ, and verifier expectations.
- Reframed setup language around normal call handling, appointment handling, owner review, and setup review calls.
- Replaced the weak Google-only proof card with a home-services phone conversion benchmark from Invoca.
- Strengthened Starter vs Pro differentiation:
  - Starter: missed-call answering, clean intake, callback and owner-approved booking request handoffs.
  - Pro: more included minutes, branded caller experience, urgent-call flags, owner-review rules, and appointment-handling controls.
- Made shared page intros dark and brand-consistent across major secondary pages.
- Reduced oversized card radii across public pages and shared marketing/legal shells to make the site feel more restrained and service-business credible.
- Removed duplicate proof and CTA sections from `/product` so it is less repetitive with the homepage.
- Updated the product page call example to show empathetic probing, urgency review, appointment handling, and owner escalation.
- Reworked `/resources` into balanced buyer navigation cards and fixed desktop whitespace.
- Added fresh local production-mode screenshot evidence for desktop, iPhone, and Android widths across `/`, `/product`, `/demo-calls`, `/pricing`, `/resources`, `/sign-up`, `/for/hvac`, and `/integrations`.

## E-Sign Posture

For standard public self-serve plans, the recommended launch posture remains clickwrap acceptance with clear Terms/Privacy/SMS/Call Notice links plus recorded acceptance metadata by version, date/time, authenticated user/account, plan, IP/user-agent where appropriate, and checkout/session reference.

Formal e-sign should be reserved for custom order forms, enterprise-style terms, or anything outside the public plan terms unless outside counsel advises otherwise.

## Validation

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- `npm run security:secrets`
- `git diff --check`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-21-site-consistency-final.json`
- `npm run verify:runtime`
- `npm run verify:seo`
- Production-mode Chrome screenshot audit:
  - report: `artifacts/screenshots/site-consistency-2026-06-21-final-current/report.json`
  - result: no bad public phrases, no horizontal overflow, no console errors, all sampled routes returned 200

## Proof Level

Local production-mode website proof only.

This does not prove deployed production website state, provider live voice behavior, checkout readiness, app onboarding readiness, calendar writes, customer-data readiness, outside-counsel approval, provider proof, live proof, launch readiness, or manual approval.

## Risks And Follow-Up

- The public pages are more visually consistent, but deeper design QA should still review every route in the sitemap before paid go-live.
- The live web voice demo still requires separate provider/browser-audio proof before it should be treated as a proven demo path.
- The pricing language is clearer, but final packaging and terms should still be reviewed against the app checkout and acceptance-record implementation.
- Clickwrap acceptance is the operationally right starting point for standard plans, but outside counsel should confirm final enforceability details before launch.

## Next Prompt

Continue website launch polish by reviewing the full sitemap in production mode, then compare deployed website output against the final local screenshots and route-proof artifacts before pointing paid traffic at the site.

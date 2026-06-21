# 2026-06-21 Homepage Hero Clipping Guard

## Goal

Fix the homepage hero summary card clipping shown in Safari and add production-mode guards so visible clipping, overlap, horizontal overflow, and missing first-screen route content are caught before deployment.

## Current State

- The desktop hero call preview now participates in the normal hero grid instead of being absolutely positioned inside an `overflow-hidden` section.
- The shop-ready summary copy is shorter and remains fully visible in production-mode Chrome at desktop, wide desktop, iPhone-width, and Android-width viewports.
- The hero proof chip copy now says `Monthly plans with clear terms` instead of `Month-to-month public plans`.
- The four proof-band lines under the hero now use customer-facing wording:
  - `Answers missed calls like a trained front desk`
  - `You approve the call flow before calls forward`
  - `Books only when your rules and schedule allow it`
  - `Works with your number, calendar, and follow-up tools`
- Added `npm run verify:homepage-hero` and `npm run verify:visual-layout`, then wired both into `.github/workflows/verify-content.yml`.
- The broader visual guard checks 11 customer-facing routes across desktop, iPhone-width, and Android-width viewports.
- During validation, `/product` returned production-mode 500 because `.next/server/app/product/page.js` was missing from a stale/incomplete build artifact. A clean `.next` rebuild restored the bundle, `/product` returned 200, and both journey and visual-layout checks passed. Keep `rm -rf .next && npm run build` in mind if a local production route reports a missing `page.js` while the source and route table look correct.

## Files Changed

- `.github/workflows/verify-content.yml`
- `README.md`
- `app/page.tsx`
- `package.json`
- `scripts/lib/local-chrome-cdp.mjs`
- `scripts/verify-homepage-hero-visual.mjs`
- `scripts/verify-visual-layout.mjs`

## Evidence Artifacts

- `artifacts/website-screenshots/2026-06-21-homepage-hero-visual.json`
- `artifacts/screenshots/homepage-hero-visual/home-desktop.png`
- `artifacts/screenshots/homepage-hero-visual/home-wide-desktop.png`
- `artifacts/screenshots/homepage-hero-visual/home-iphone.png`
- `artifacts/screenshots/homepage-hero-visual/home-android.png`
- `artifacts/website-journeys/2026-06-21-homepage-hero-clipping-fix.json`
- `artifacts/website-screenshots/2026-06-21-site-visual-layout.json`
- `artifacts/screenshots/site-visual-layout/`
- `artifacts/website-journeys/2026-06-21-visual-layout-guard.json`

## Commands Run

- `npm run lint`
- `npm run verify:content`
- `npm run check:public-truth`
- `npm run build`
- `npm run verify:homepage-hero -- --json-out=artifacts/website-screenshots/2026-06-21-homepage-hero-visual.json`
- `npm run verify:homepage-hero -- --no-screenshots`
- `npm run verify:visual-layout -- --json-out=artifacts/website-screenshots/2026-06-21-site-visual-layout.json`
- `npm run verify:visual-layout -- --no-screenshots`
- `npm run verify:runtime`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-21-visual-layout-guard.json`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-21-homepage-hero-clipping-fix.json`
- `npm run verify:seo`
- `npm run verify:security`
- `git diff --check`

## Proof Level

Local production-mode website proof.

This does not prove deployed website state, Safari rendering on the user's exact browser session, provider behavior, live voice, checkout, customer-data readiness, or launch readiness.

## Validation Not Run

- No deployed website comparison.
- No Safari automation pass.
- No iPhone Simulator or Android device browser pass in this batch.

## Risks And Follow-Up

- The new guard uses local Chrome CDP. It should catch the structural clipping failure shown in the Safari screenshot, but a dedicated Safari/WebKit check would add browser-specific confidence before a major paid launch.
- The new key-route visual guard is not all-sitemap coverage. It should catch high-risk buyer-path regressions, while `verify:journeys` and `verify:seo` continue covering all sitemap routes for route/content/SEO proof.
- The visual guards use local Chrome CDP. They do not prove Mobile Safari, native iPhone, native Android, or deployed production rendering.
- Strategic follow-up from the value review: prioritize ROI proof, weekly value-report framing, and integration-lift analysis before adding more plan tiers or operationally heavy promises.

## Next Prompt

Continue first-customer readiness by evaluating day-one integration lift for Google Calendar, Jobber, Housecall Pro, ServiceTitan, CallRail, QuickBooks, Zapier, and Make. Recommend add/defer for each using implementation lift, access/API friction, maintenance risk, day-one value, and one-person operator burden. Do not build a new integration unless it is cheap, clean, and launch-relevant.

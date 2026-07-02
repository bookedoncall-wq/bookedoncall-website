# 2026-07-02 Examples Hero Actions

## Goal

Remove the remaining buyer-flow weakness on the public examples page after the V2 launch context reported no AI-owned self-contained app work. The live examples page was no longer the old fully-open transcript layout, but mobile still showed no useful first-screen action beyond the header/menu.

## Current State

- `/examples` keeps the compact buyer layout: decision paths, owner summaries, collapsed sample conversations, and setup-boundary copy.
- The examples hero now exposes two first-screen actions:
  - `See decision paths` jumps to the first example decision path.
  - `Start setup` routes to the setup lead path because website self-serve checkout remains off.
- Content and journey verifiers now require `See decision paths` so the examples page cannot regress back to a static first screen.
- Local production visual evidence now shows mobile first-screen CTAs: `BookedOnCall`, `See decision paths`, and `Start setup`.

## Files Changed

- `app/examples/page.tsx`
- `scripts/verify-content.mjs`
- `scripts/verify-journeys.mjs`

## Commands Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- `npm run verify:runtime`
- `npm run verify:journeys`
- `npm run verify:seo`
- `npm run verify:visual-layout -- --routes=/examples --screenshot-dir=artifacts/screenshots/2026-07-02-examples-hero-actions-local --json-out=artifacts/reviews/2026-07-02-examples-hero-actions-local.json`
- `npm run verify:visual-layout -- --no-screenshots`
- `npm run security:secrets`
- `git diff --check`

Pre-change live observation:

- `npm run verify:visual-layout -- --origin=https://www.bookedoncall.com --routes=/examples --screenshot-dir=artifacts/screenshots/2026-07-02-examples-live-review --json-out=artifacts/reviews/2026-07-02-examples-live-review.json`
- `curl -Ls https://www.bookedoncall.com/examples | rg -n "View sample conversation|Decision path|Setup reviewed|HVAC no-heat call|Plumbing running-toilet|Appointment booked from reviewed rules|callback number captured"`

## Proof Level

Website repo proof and local production-mode website proof. The pre-change live custom-domain check confirmed the deployed page was already serving the compact examples layout, but the edited hero actions are not live proof until the deployed site updates and is checked again.

## Validation Not Run

- No post-deploy live custom-domain verification for this commit yet.
- No Vercel deployment identity inspection.
- No provider calls, live voice calls, app checkout proof, customer-data proof, billing proof, revenue readiness, public self-serve readiness, launch readiness, or legal approval.
- No Safari-specific visual proof.

## Risks And Blockers

- The examples page remains long because it covers all eight supported trades; the current improvement is first-screen action clarity, not a full content model redesign.
- `Start setup` intentionally remains a setup lead path while `featureFlags.selfServeCheckout` is false.
- Legal pages remain public launch drafts pending outside counsel approval.

## Next Prompt

If this commit is deployed, verify `https://www.bookedoncall.com/examples` again with the live visual verifier and confirm the mobile first-screen CTAs include `See decision paths` and `Start setup`. Then return to V2 only when a new AI-owned blocker appears or external authority unblocks the real pilot, deployment, phone, billing, customer-data, or legal lanes.

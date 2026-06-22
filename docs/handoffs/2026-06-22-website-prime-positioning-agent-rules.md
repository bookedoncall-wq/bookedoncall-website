# 2026-06-22 Website Prime Positioning Agent Rules

## Goal

Resolve the website instruction mismatch after the full-site prime-copy audit: future website agents should use V2 and the app as the source of truth for the mature product vision while keeping current availability, setup, roadmap, checkout, legal, and proof boundaries honest.

## Current State

- The prior full-site audit and deployed website proof are recorded in `docs/handoffs/2026-06-22-full-site-prime-copy-audit.md`.
- The sitemap currently covers 40 public routes, including the user's master list plus `/sign-up`, `/industries`, `/compare/answering-service-vs-receptionist-vs-ai-receptionist`, `/compare/after-hours-call-answering-for-hvac`, and `/compare/after-hours-call-answering-for-plumbers`.
- The examples page already uses the stronger direct-booking, urgent-escalation, and manual-review examples from the prior batch.
- The remaining issue was `AGENTS.md` wording that could force future website copy to describe only currently proven V2 surfaces instead of the mature configured product.

## Files Changed

- `AGENTS.md`
  - Clarified that the public website may sell the mature configured product when setup requirements and current availability boundaries remain clear.
  - Preserved the separation between mature-product positioning and claims that something is currently live, checkout-ready, provider-ready, launch-ready, or legally approved.

## Commands Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run security:secrets`
- `git diff --check`

## Proof Level

Website repo proof for instruction-surface alignment. This did not change rendered customer-facing pages and did not refresh live deployed website proof.

## Validation Not Run

- No full rebuild, journey crawl, SEO crawl, or visual-layout pass, because only `AGENTS.md` changed.
- No redeploy.
- No outside-counsel review, app proof, provider proof, live voice proof, billing proof, customer-data proof, or launch-readiness proof.

## Risks And Blockers

- Legal pages remain materially improved counsel-review drafts, not legal approval.
- The website can now intentionally market the mature configured product, but any future page edits still need to keep unsupported integrations, self-serve checkout state, demo limits, legal draft status, and setup requirements clear.
- True first paid customer go-live remains blocked by the V2/app evidence gates, not by this website instruction update.

## Next Prompt

Continue V2 launch work by converting the public/legal promises into executable app proof: acceptance capture, call-notice behavior, SMS consent/STOP handling, privacy/support workflows, first-charge proof, and owner setup go-live checks.

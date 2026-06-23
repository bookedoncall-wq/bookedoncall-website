# 2026-06-23 Website Route Coverage And Live Examples Audit

## Goal

Audit the customer-facing website against the V2/product contract, make safe source changes that improve buyer navigation, and keep proof boundaries separate from the live deployment state.

## Current State

- Local website source at `4d3b953` already contains the cleaned examples page and June 22 legal pages.
- Live `https://www.bookedoncall.com/terms` shows the June 22 legal language, including AI call handling, owner responsibility, booking limits, roadmap/example limits, billing/cancellation, and emergency-use boundaries.
- Live `https://www.bookedoncall.com/examples` initially served the older examples layout/copy during review. After commit `de721d8` was pushed, the live page reflected the newer dark-hero examples page.
- Vercel connector access returned `403 Forbidden`, so deployment/alias inspection through the connector remains blocked on Vercel scope re-auth. Live content/visual checks reached the public origin, but not exact deployment-identity proof from Vercel.
- The sitemap included after-hours HVAC and plumbing guide routes, but those guides were effectively hidden from visible resource/footer navigation.

## Files Changed

- `app/resources/page.tsx`
  - Added visible cards for the after-hours HVAC and after-hours plumbing guides.
  - Adjusted the secondary resource grid to three columns on wide screens.
- `components/layout/Footer.tsx`
  - Added the `/industries` hub to the Industries footer column.
  - Added visible footer links for Answering Options, After-Hours HVAC, and After-Hours Plumbing.
- `scripts/verify-content.mjs`
  - Expanded required customer-facing route coverage to include product, industries, resources, comparison, legal, login, and contact surfaces.
  - Replaced a partial sitemap assertion with an explicit 40-route customer-facing sitemap coverage list.
- `scripts/verify-journeys.mjs`
  - Added customer-facing snippet expectations across product, industries, use-case, comparison, resource, legal, FAQ, about, and contact routes.

## Validation Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- `npm run verify:runtime`
- `npm run verify:journeys`
- `npm run verify:seo`
- `npm run verify:visual-layout -- --routes=/resources,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers,/examples,/terms --screenshot-dir=artifacts/screenshots/2026-06-23-website-route-coverage`
- `npm run verify:security`
- `npm run verify:homepage-hero -- --no-screenshots`
- `npm run verify:visual-layout -- --no-screenshots`
- `npm run verify:visual-layout -- --origin=https://www.bookedoncall.com --routes=/examples,/resources,/terms,/pricing,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers --screenshot-dir=artifacts/screenshots/2026-06-23-live-website-route-coverage`
- `git diff --check`
- GitHub Actions after push: `Verify Content` run `28002731066` passed; `Security` run `28002731084` passed.

## Proof Level Reached

- Repo proof: source inspection, build, content contract checks, production-mode local route/runtime/SEO checks, security checks, and local visual layout checks passed.
- Live website observation: live Terms reflected the June 22 legal copy; live Examples and Resources reflected the pushed source after deployment; live visual layout passed for Examples, Resources, Terms, Pricing, and both after-hours guide routes.
- Not provider proof, environment deployment proof, live voice proof, customer-data proof, revenue readiness, legal approval, or launch readiness.

## Validation Not Run

- No Vercel deployment inspection through the connector: Vercel connector returned `403 Forbidden` for the project scope.
- No full legal due diligence or counsel approval.
- No live voice demo, provider, checkout, billing, or authenticated app proof.

## Risks And Blockers

- Vercel scope still needs re-authentication if future work requires deployment logs, exact deployment identity, rollback, or direct Vercel operations through the connector.
- Public legal copy is materially stronger and live, but still not legal approval.
- Untracked pre-existing files remain untouched: `docs/handoffs/2026-06-22-launch-legal-diligence 2.md`, `docs/legal/2026-06-19-launch-legal-review 2.md`, and `tmp/`.

## Next Safest Prompt

Re-authenticate Vercel for `bookedoncall-website` before the next deployment-sensitive batch so the operator can inspect exact deployment identity, build logs, aliases, and rollback state without founder intervention.

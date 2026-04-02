# BookedOnCall Website

This repo is the standalone public marketing and discovery site for BookedOnCall. It is intentionally separate from the canonical SaaS monorepo and should stay thin: public messaging, structured content, discovery surfaces, and clean handoff into the app domain.

## Canonical system boundaries

- `bookedoncall.com` is the marketing and discovery surface.
- `app.bookedoncall.com` is the canonical product surface.
- Checkout, sign-up, onboarding, billing, and business provisioning are owned by the app domain.
- The canonical product repo lives at `/Users/david/Documents/Trades Intelligent Assistant/TVA_All_In_One`.

## Public product truth

The website consumes a checked-in snapshot of the monorepo public contract:

- `config/public-site-contract.json`

That snapshot is derived from:

- `/Users/david/Documents/Trades Intelligent Assistant/TVA_All_In_One/config/bookedoncall-public-site-contract.json`

Sync it whenever the public product contract changes:

```bash
npm run sync:monorepo-truth
```

## Local commands

```bash
npm run dev
npm run lint
npm run build
npm run verify:content
npm run sync:monorepo-truth
```

## Environment and deployment

This repo should not hold checkout or billing secrets. There is no website-owned Stripe flow anymore.

- No `STRIPE_SECRET_KEY` should be configured here.
- App handoff URLs come from the checked-in public contract snapshot.
- Security headers, robots, sitemap, manifest, and `llms.txt` are generated from the App Router.

## Content and verification guardrails

- `npm run lint` must pass with zero warnings.
- `npm run build` must pass before deploy.
- `npm run verify:content` checks for required routes, metadata files, contract presence, and stale marketing claims.
- `.github/workflows/verify-content.yml` is the baseline CI workflow for this repo.

## Editing rules

- Do not reintroduce a website-owned checkout route.
- Do not drift from the monorepo public contract for plans, app URLs, or legal contacts.
- Do not describe booking, reminders, write-through integrations, or dashboard capabilities more strongly than the app currently supports.
- Prefer concrete, machine-readable copy over vague marketing language. This repo is optimized for both human conversion and search/AI discoverability.

# BookedOnCall Website

This repo is the standalone public marketing and discovery site for BookedOnCall. It is intentionally separate from the canonical SaaS monorepo and should stay thin: public messaging, structured content, discovery surfaces, lead capture, and clean product positioning for trades businesses.

## Canonical system boundaries

- `bookedoncall.com` is the marketing and discovery surface.
- The current public conversion path is a website-owned lead form at `/sign-up`.
- `app.bookedoncall.com` remains the planned canonical product surface in the broader system, but it is not the live public entry point right now.
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

This repo should not hold checkout or billing secrets. There is no website-owned Stripe flow.

- Lead form submissions post to `app/api/leads/route.ts`.
- In production, set `BOOKEDONCALL_LEAD_WEBHOOK_URL` to forward lead submissions into your CRM, automation tool, or internal intake endpoint.
- `BOOKEDONCALL_LEAD_WEBHOOK_SECRET` is optional and can be used to authenticate those webhook deliveries.
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

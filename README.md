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

- Lead form submissions post to `app/api/leads/route.ts`, which validates the payload and sends a text-only Resend email to the configured sales inbox when `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are configured.
- If Resend is not configured or delivery fails, the lead form returns a `mailto:` handoff so the visitor can still complete the request from their email client.
- Marketing analytics events are pushed to `window.dataLayer`; configure `NEXT_PUBLIC_GTM_ID` to load Google Tag Manager from the checked-in layout.
- The website intentionally does not support hidden lead-webhook environment variables or a website-owned checkout/billing target.
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
- Keep lead delivery explicit: Resend email delivery is allowed, webhook-based hidden lead delivery is not.
- Prefer concrete, machine-readable copy over vague marketing language. This repo is optimized for both human conversion and search/AI discoverability.

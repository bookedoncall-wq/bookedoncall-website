# BookedOnCall Website

This repo is the standalone public marketing and discovery site for BookedOnCall. It is intentionally separate from the canonical SaaS monorepo and should stay thin: public messaging, structured content, discovery surfaces, lead capture, and clean product positioning for trades businesses.

## Canonical system boundaries

- `bookedoncall.com` is the marketing and discovery surface.
- The current public conversion path is a website-owned lead form at `/sign-up`.
- `app.bookedoncall.com` remains the planned canonical product surface in the broader system, but it is not the live public entry point right now.
- The current product buildout is moving into the V2 app repo, while this repository remains the standalone public website.

## Public product truth

The website owns the checked-in public contract used for marketing copy, public plan details, supported trades, integrations, and legal/contact metadata:

- `config/public-site-contract.json`

Check it whenever the public product contract changes:

```bash
npm run check:public-truth
```

## Local commands

```bash
npm run dev
npm run lint
npm run build
npm run verify:content
npm run verify:runtime
npm run verify:homepage-hero
npm run verify:visual-layout
npm run verify:journeys
npm run verify:production-leads -- --origin https://www.bookedoncall.com --execute-send
npm run verify:seo
npm run verify:security
npm run check:public-truth
```

## Environment and deployment

This repo should not hold checkout or billing secrets. There is no website-owned Stripe flow.

- Lead form submissions post to `app/api/leads/route.ts`, which validates the payload and sends a text-only Resend email to the configured sales inbox when `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are configured.
- If Resend is not configured or delivery fails, the lead form returns a `mailto:` handoff so the visitor can still complete the request from their email client.
- Production lead capture can be checked with `npm run verify:production-leads -- --origin https://www.bookedoncall.com --execute-send`. The flag is explicit because it submits one synthetic setup request and may send a Resend email.
- Marketing analytics events are pushed to `window.dataLayer`; configure `NEXT_PUBLIC_GTM_ID` to load Google Tag Manager from the checked-in layout.
- The public voice demo uses `app/api/demo-session/route.ts` as a server-side gate before the client loads Vapi. Configure `BOOKEDONCALL_DEMO_VOICE_ENABLED=true`, `VAPI_WEB_PUBLIC_KEY`, and `VAPI_DEMO_ASSISTANT_ID` only after the assistant is ready for public demo calls. The same assistant powers all eight sample profiles: HVAC, plumbing, electrical, painting, flooring, landscaping, roofing, and general home services. The client passes the selected profile as `scenarioId` plus `variableValues` for trade, business name, service area, hours, services, booking policy, pricing policy, emergency policy, caller prompt, outcome policy, and guardrails. The assistant must use those variables or the injected system message, keep demo calls action-free, and never create appointments, change calendars, send texts, request payment, quote final prices, promise dispatch, or claim confirmed booking unless the selected demo profile explicitly allows a direct-booked outcome. The website route adds basic rate limiting and a time limit, but the operator still needs Vapi-side budget monitoring for the monthly demo allowance.
- The website intentionally does not support hidden lead-webhook environment variables or a website-owned checkout/billing target.
- Security headers, robots, sitemap, manifest, and `llms.txt` are generated from the App Router.

## Content and verification guardrails

- `npm run lint` must pass with zero warnings.
- `npm run build` must pass before deploy.
- `npm run verify:content` checks for required routes, metadata files, contract presence, and stale marketing claims.
- `npm run verify:runtime` checks the production build markers needed for route and runtime proof.
- `npm run verify:homepage-hero` runs a production-mode desktop, iPhone, and Android visual layout check for the homepage hero and stores screenshots by default.
- `npm run verify:visual-layout` runs a production-mode visual layout smoke for key customer-facing routes across desktop, iPhone, and Android widths.
- `npm run verify:journeys` checks the conversion, comparison, pricing, FAQ, and lead-capture journey surfaces.
- `npm run verify:seo` checks sitemap, robots, canonical, metadata, JSON-LD, and AI-discovery surfaces after build.
- `npm run verify:security` runs the website production dependency audit and repo-native secret scan.
- `.github/workflows/verify-content.yml` is the baseline website truth workflow for this repo.
- `.github/workflows/security.yml` runs CodeQL, Trivy filesystem/IaC scanning, repo-native secret scan, and dependency review. Those checks are CI scanner coverage, not proof of platform secret rotation or production provider safety.

## Editing rules

- Do not reintroduce a website-owned checkout route.
- Keep `config/public-site-contract.json` aligned with the current launch offer for plans, app URLs, integrations, and legal contacts.
- Do not describe booking, reminders, write-through integrations, or dashboard capabilities more strongly than the app currently supports.
- Do not reintroduce a scripted browser call preview as the primary demo. Use the Vapi-gated live voice demo, example calls, or private setup test calls.
- Keep lead delivery explicit: Resend email delivery is allowed, webhook-based hidden lead delivery is not.
- Prefer concrete, machine-readable copy over vague marketing language. This repo is optimized for both human conversion and search/AI discoverability.

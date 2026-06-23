# 2026-06-23 Eight-Trade Demo And Examples Halo

## Goal

Make the public live web voice demo and `/examples` page cover all eight supported trades with trade-authentic demo profiles, varied honest outcomes, and owner-summary artifacts that show the value after the call.

## Current State

- `/demo-calls` now renders eight selectable sample shops: HVAC, plumbing, electrical, painting, flooring, landscaping, roofing, and general home services.
- `/api/demo-session` now allowlists all eight sample profile IDs, so each selector option can start a Vapi web demo session once the founder enables the environment configuration.
- The Vapi web call path passes per-profile context through `variableValues` and an injected system message: trade, business name, service area, hours, services, booking policy, pricing policy, emergency policy, caller prompt, allowed outcomes, and guardrails.
- `/examples` now has one best showcase example per supported trade. Outcomes deliberately vary across emergency escalation, after-hours capture, direct booking when rules allow, owner-review estimate, walkthrough callback, measured estimate request, service-area review, urgent callback, and small-job triage.
- Each example shows the caller conversation, rule checks, an owner summary artifact, and a customer follow-up message.
- `/for/[trade]` pages now link to their matching showcase example so trade pages and examples reinforce the same content.
- `config/public-site-contract.json` now carries a compact `showcaseExamples` index with exactly one example per supported trade, and `npm run check:public-truth` validates that coverage.

## Files Changed

- `.env.example`
- `README.md`
- `app/api/demo-session/route.ts`
- `app/demo-calls/page.tsx`
- `app/examples/page.tsx`
- `components/marketing/UseCasePage.tsx`
- `components/marketing/VapiDemoCallPreview.tsx`
- `config/marketing.ts`
- `config/public-site-contract.json`
- `config/site.ts`
- `scripts/check-public-site-contract.mjs`
- `scripts/verify-content.mjs`
- `scripts/verify-journeys.mjs`
- `docs/handoffs/2026-06-23-eight-trade-demo-examples-halo.md`

## Validation Run

- `npm run check:public-truth` - passed
- `npm run verify:content` - passed
- `npm run lint` - passed
- `npm run build` - passed
- `npm run verify:runtime` - passed
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-23-eight-trade-demo-examples.json` - passed
- `npm run verify:seo` - passed
- `npm run verify:visual-layout -- --routes=/demo-calls,/examples --json-out=artifacts/reviews/2026-06-23-eight-trade-demo-examples-visual.json --screenshot-dir=artifacts/screenshots/2026-06-23-eight-trade-demo-examples` - passed across 2 routes and 3 viewports
- In-app browser check against local production server `http://127.0.0.1:4512`:
  - `/demo-calls` at 1440x1000 and 390x844 rendered 8 profile buttons
  - `/examples` at 1440x1000 and 390x844 rendered 8 example articles
  - owner summaries were present on desktop and mobile
  - no horizontal overflow detected on those routes/viewports
- `npm run security:secrets` - passed
- `node --check scripts/check-public-site-contract.mjs` - passed
- `node --check scripts/verify-content.mjs` - passed
- `node --check scripts/verify-journeys.mjs` - passed
- `npm run security:audit` - passed, 0 vulnerabilities
- `git diff --check` - passed

## Proof Level Reached

Highest proof reached: repo proof plus local production-mode website proof and browser DOM/visual proof for `/demo-calls` and `/examples`.

This is not deployed website proof, live Vapi/provider proof, live handset proof, customer-data proof, billing proof, legal approval, revenue readiness, launch readiness, or proof that the founder's Vapi assistant has been configured correctly in production.

## Validation Not Run

- No deploy or live `https://www.bookedoncall.com` verification was run.
- No live microphone call was started.
- No provider call, Vapi account inspection, assistant configuration inspection, calendar write, customer text, lead email send, checkout, billing, or authenticated app proof was run.
- No legal counsel review.

## Founder Vapi / Env Setup To Enable The Eight-Profile Live Demo

1. In the website deployment environment, set:
   - `BOOKEDONCALL_DEMO_VOICE_ENABLED=true`
   - `VAPI_WEB_PUBLIC_KEY=<public Vapi web key only>`
   - `VAPI_DEMO_ASSISTANT_ID=<public-demo assistant id>`
   - Optional budget/rate controls:
     - `VAPI_DEMO_MONTHLY_BUDGET_USD=50` or the chosen monthly cap
     - `BOOKEDONCALL_DEMO_MAX_CALL_SECONDS=180` or the chosen public call limit
     - `BOOKEDONCALL_DEMO_MAX_STARTS_PER_HOUR=3` or the chosen per-connection rate limit
2. Do not put the private Vapi API key in this website repo or public client env.
3. Configure the single public-demo assistant so it uses the website-provided `variableValues` and injected system message for each selected profile:
   - `demo_mode`
   - `demo_scenario_id`
   - `demo_trade`
   - `demo_business_name`
   - `demo_service_area`
   - `demo_hours`
   - `demo_availability`
   - `demo_booking_policy`
   - `demo_pricing_policy`
   - `demo_emergency_policy`
   - `demo_services`
   - `demo_caller_prompt`
   - `demo_outcome_policy`
   - `demo_full_context`
   - `demo_guardrails`
4. Assistant behavior requirement: public demo calls must stay action-free. The assistant must not create appointments, change calendars, send texts, request payment, quote final prices, promise dispatch, or claim a confirmed booking unless the selected demo profile explicitly allows the direct-booked demo outcome.
5. After env and assistant setup, run a public demo smoke on all eight profile IDs:
   - `summit-air-hvac`
   - `oakline-plumbing`
   - `brightline-electric`
   - `truecoat-painting`
   - `grainline-flooring`
   - `greenridge-landscaping`
   - `ridgecap-roofing`
   - `fixwell-home-services`

## Risks And Blockers

- The website can pass profile context to Vapi, but the actual public call quality depends on the founder-configured Vapi assistant honoring those variables and guardrails.
- Direct booking remains represented only in a reviewed/setup-gated example. It is not a blanket claim that every buyer gets automatic booking on day one.
- Public examples include synthetic caller names, 555 numbers, and location-style addresses. They are examples, not customer data.
- Pre-existing untracked files were left untouched: `docs/handoffs/2026-06-22-launch-legal-diligence 2.md`, `docs/legal/2026-06-19-launch-legal-review 2.md`, and `tmp/`.

## Next Safest Prompt

If deploying this website batch, deploy the exact current website commit, verify `/demo-calls` and `/examples` on `https://www.bookedoncall.com` at desktop and mobile widths, and separately run one founder-controlled Vapi demo smoke per profile after the public key and assistant ID are configured.

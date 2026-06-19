# 2026-06-19 Vapi Demo And Website Cleanup Handoff

## Goal

Remove the public scripted demo risk and make the website demo path launch-oriented without implying unproven live provider behavior.

## Current State

- The old `DemoCallPreview` scripted browser simulator was removed.
- `/demo-calls` now renders a Vapi-powered live voice demo shell through `VapiDemoCallPreview`.
- The live demo is gated by `/api/demo-session`.
- The default local/production build is disabled unless `BOOKEDONCALL_DEMO_VOICE_ENABLED=true`, `VAPI_WEB_PUBLIC_KEY`, and `VAPI_DEMO_ASSISTANT_ID` are configured.
- Demo starts have an in-memory per-IP throttle and a default 180-second time limit.
- Public copy now points to a sample-shop live web voice demo, example calls, and private setup test calls instead of a browser call preview.
- The demo now uses three sample shops (`Summit Air & Heat`, `Oakline Plumbing`, and `Brightline Electric`) with service areas, hours, service menus, sample pricing ranges, sample appointment-request windows, booking policy, and emergency-review rules.
- Public demo copy was cleaned of launch-internal phrases such as "when it is connected", "this environment", "Auth proof", "proof-only route", "not proof of a live phone bridge", and similar readiness/proof wording.
- Public demo copy no longer exposes the internal voice provider brand; customer-facing copy says "live voice demo", "live web demo", "sample shop", or "voice session" instead.
- Public-copy verifiers now block those internal phrases from the customer-facing site, and rendered-page crawls block internal voice/telephony provider brands such as Vapi, Retell, Telnyx, Twilio, Deepgram, ElevenLabs, and Daily.
- The homepage, signup page, lead form accessibility, page intro spacing, integration labels, and sample-data wording were cleaned up in the same website batch.
- A Vapi dashboard-scope assistant named `BookedOnCall Website Public Demo` was created for public demos with no real booking/calendar/SMS/payment/tool actions.
- Local ignored `.env.local` now has the matching Vapi public web key and public demo assistant ID for local proof only.
- Direct `POST /call/web` with the website public key and demo assistant returns `201` with a queued web call.
- Local Chrome button proof reached the voice provider but still failed at the browser audio/realtime connection layer; the visible fallback now says the browser could not connect audio and offers microphone/private-test-call next steps without naming the provider. This is not accepted as live browser demo pass evidence.

## Files Changed

- `.env.example`
- `README.md`
- `app/api/demo-session/route.ts`
- `app/auth-proof/session/page.tsx`
- `app/auth-proof/session/session-client.tsx`
- `app/demo-calls/page.tsx`
- `app/examples/page.tsx`
- `app/integrations/email/page.tsx`
- `app/integrations/page.tsx`
- `app/page.tsx`
- `app/sign-up/page.tsx`
- `app/terms/page.tsx`
- `components/marketing/VapiDemoCallPreview.tsx`
- `components/marketing/DemoCallPreview.tsx`
- `components/marketing/LeadCaptureForm.tsx`
- `components/marketing/PageIntro.tsx`
- `config/marketing.ts`
- `config/public-site-contract.json`
- `config/site.ts`
- `lib/analytics.ts`
- `package.json`
- `package-lock.json`
- `scripts/verify-content.mjs`
- `scripts/verify-journeys.mjs`
- `scripts/verify-postbuild-seo.mjs`
- `scripts/verify-runtime.mjs`

## Validation Run

- `npm run lint`
- `npm run build`
- `npm run verify:content`
- `npm run verify:runtime`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-19-provider-neutral-demo.json`
- `npm run verify:seo`
- `npm run verify:security`
- `npm run check:public-truth`
- `npm audit --json`
- `git diff --check`
- Local production browser smoke with Chrome for `/demo-calls` on desktop, iPhone, and Android-sized viewports.
- Local demo API smoke against `http://127.0.0.1:4311/api/demo-session`.
- Local production lead verifier against `http://127.0.0.1:4311`.
- Local configured demo API smoke against `http://127.0.0.1:4312/api/demo-session` with masked public-key and assistant references.
- Direct Vapi public web-call creation smoke using the dashboard-scope public key and `BookedOnCall Website Public Demo` assistant; response was `201 Created`, queued web call, no raw IDs or URLs printed.
- Local Chrome configured-page smoke showed `/demo-calls` as `READY` with the public budget copy removed.
- Local Chrome desktop and mobile-width visual checks showed the sample-shop cards, service/range details, appointment-request copy, and start button without visible overflow.
- Local Chrome configured-button click reached the voice provider but failed browser audio join; visible copy stayed customer-facing and did not expose internal proof, environment, or provider-brand language.

## Proof Level

Repo proof, local production-mode website proof, and provider API proof for dashboard-scope Vapi web-call creation only.

This does not prove deployed website state, Vapi assistant conversation quality, Vapi billing controls, browser audio join, live handset/browser demo calls, checkout, app onboarding, customer-data readiness, phone go-live, or launch readiness.

## Remaining Risks And Blockers

- Configure the same dashboard-scope `VAPI_WEB_PUBLIC_KEY` and `VAPI_DEMO_ASSISTANT_ID` in the deployment platform when deploying the website demo.
- Add Vapi-side budget monitoring or alerts for the $50/month public demo allowance; the website gate is not a hard provider billing cap.
- Reconcile founder-provided credit expectation with dashboard-visible balance; dashboard showed 10 PAYG credits during this run.
- Run provider proof with the configured Vapi assistant and save redacted evidence.
- Resolve and prove browser audio/realtime join in Chrome, then run live browser voice proof on desktop, iPhone, and Android after provider config is deployed.

## Next Safest Task

Deploy the website with the dashboard-scope Vapi demo env vars, then run live browser proof against the exact deployed SHA. If Chrome still fails after deployment, inspect microphone permissions and Vapi/Daily realtime join errors before spending more public-demo credits.

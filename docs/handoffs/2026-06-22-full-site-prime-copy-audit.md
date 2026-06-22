# 2026-06-22 Full Site Prime Copy Audit

## Goal

Review the public BookedOnCall website as the live customer-facing surface, fix the weak examples page, and align public language with the intended fully configured product while keeping setup, roadmap, demo, and legal boundaries honest.

## Current State

- The site copy now sells the prime configured product: BookedOnCall can answer calls, collect job details, and move qualified callers toward confirmed appointments, owner-approved booking requests, or clear callbacks based on shop setup.
- The examples page now uses a stronger customer-facing layout and a direct-booking HVAC example, plus urgent plumbing and electrical review examples.
- Roadmap integration pages still clearly state that QuickBooks, Housecall Pro, and ServiceTitan are not live integrations today.
- The public voice demo button is disabled when the voice demo is not configured, instead of inviting a known unavailable action.
- Legal pages were already published in the prior 2026-06-22 batch. They remain materially stronger website drafts, not outside-counsel approval.
- Commit `6492b2937a65dbb25e80f60d35bd6b49249e1989` deployed to production as Vercel deployment `dpl_8g3mSc3twNHb2k1PDrkAGiFx74Mt` at `https://bookedoncall-website-9wjjfqml5-bookedoncall-8233s-projects.vercel.app`, aliased to `https://www.bookedoncall.com`.
- GitHub checks passed for commit `6492b29`: `Security` and `Verify Content`.

## Routes Evaluated

All 40 sitemap routes were covered by local journey, SEO, and visual layout checks:

`/`, `/product`, `/features`, `/how-it-works`, `/pricing`, `/login`, `/sign-up`, `/industries`, `/for/plumbers`, `/for/hvac`, `/for/electricians`, `/for/painters`, `/for/flooring`, `/for/landscaping`, `/for/roofing`, `/for/general-home-services`, `/integrations`, `/integrations/jobber`, `/integrations/google-calendar`, `/integrations/email`, `/integrations/text-sms`, `/integrations/quickbooks`, `/integrations/housecall-pro`, `/integrations/servicetitan`, `/resources`, `/demo-calls`, `/examples`, `/compare/answering-service-vs-receptionist-vs-ai-receptionist`, `/compare/ai-receptionist-vs-voicemail`, `/compare/missed-calls-for-home-service-businesses`, `/compare/after-hours-call-answering-for-hvac`, `/compare/after-hours-call-answering-for-plumbers`, `/faq`, `/about`, `/privacy`, `/terms`, `/call-handling-notice`, `/sms-terms`, `/dpa`, `/contact`.

## Files Changed

- `config/public-site-contract.json`: strengthened positioning from owner-approved paths only to confirmed appointments, booking requests, or callbacks based on setup.
- `config/marketing.ts`: aligned FAQ, homepage/product flow, resources, vertical summaries, and roadmap cards with the configured prime-product stance.
- `app/examples/page.tsx`: replaced the conservative first example with direct booking after owner-approved rules; retained urgent escalation and manual review examples.
- `app/page.tsx`, `app/product/page.tsx`, `app/features/page.tsx`, `app/how-it-works/page.tsx`, `app/industries/page.tsx`, `components/marketing/UseCasePage.tsx`: tightened customer-facing booking language around configured behavior.
- `app/integrations/jobber/page.tsx`, `app/integrations/quickbooks/page.tsx`, `app/integrations/housecall-pro/page.tsx`, `app/integrations/servicetitan/page.tsx`: removed internal "current flow" tone while preserving roadmap honesty.
- `app/demo-calls/page.tsx`, `components/marketing/VapiDemoCallPreview.tsx`: made demo status and disabled state clearer when the live voice demo is unavailable.
- `scripts/verify-journeys.mjs`: updated `/examples` journey snippets for the revised examples page.

## Commands Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- `npm run verify:journeys -- --json-out=artifacts/website-journeys/2026-06-22-prime-copy-audit.json`
- `npm run verify:seo`
- `npm run verify:visual-layout -- --routes=/,/product,/features,/how-it-works,/pricing,/login,/for/plumbers,/for/hvac,/for/electricians,/for/painters,/for/flooring,/for/landscaping,/for/roofing,/for/general-home-services,/integrations,/integrations/jobber,/integrations/google-calendar,/integrations/email,/integrations/text-sms,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/resources,/demo-calls,/examples,/compare/ai-receptionist-vs-voicemail,/compare/missed-calls-for-home-service-businesses,/faq,/about,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa,/contact,/industries,/sign-up,/compare/answering-service-vs-receptionist-vs-ai-receptionist,/compare/after-hours-call-answering-for-hvac,/compare/after-hours-call-answering-for-plumbers --json-out=artifacts/reviews/2026-06-22-prime-copy-visual-layout.json --screenshot-dir=artifacts/screenshots/prime-copy-review-2026-06-22`
- `npm run verify:homepage-hero`
- `npm run verify:runtime`
- `npm run verify:security`
- `npm run security:secrets`
- `git diff --check`
- `vercel inspect https://bookedoncall-website-9wjjfqml5-bookedoncall-8233s-projects.vercel.app`
- `curl -I https://www.bookedoncall.com/examples`
- `curl -s https://www.bookedoncall.com/examples | rg -n "HVAC no-cool call with direct booking turned on|Appointment booked with owner visibility|After setup is reviewed"`
- `curl -s https://www.bookedoncall.com/ | rg -n "moves qualified callers toward confirmed appointments|No-cool diagnostic booked|books or routes the call"`
- `npm run verify:visual-layout -- --origin=https://www.bookedoncall.com --routes=/,/examples,/features,/how-it-works,/demo-calls,/integrations,/integrations/quickbooks,/integrations/housecall-pro,/integrations/servicetitan,/pricing,/privacy,/terms,/call-handling-notice,/sms-terms,/dpa --json-out=artifacts/reviews/2026-06-22-prime-copy-live-visual-layout.json --screenshot-dir=artifacts/screenshots/prime-copy-live-review-2026-06-22`
- `npm run verify:homepage-hero -- --origin=https://www.bookedoncall.com`
- `npm run verify:production-leads -- --origin https://www.bookedoncall.com`

## Proof Level

Repo proof, local production-mode website proof, and live deployed website visual proof for the focused route set. The local checks cover source, build, runtime, route crawl, SEO, and browser visual layout. The live checks cover deployed HTML, Vercel aliasing, focused visual layout, homepage hero layout, and synthetic lead form guards.

This is not live voice proof, provider proof, customer-data proof, legal approval, revenue readiness, or full launch readiness. The production lead check was synthetic only and did not execute a real lead send.

## Remaining Risks And Gaps

- True self-serve purchase/configure/go-live remains gated by the app/checkout/onboarding path. The website still routes new customers to setup request when `selfServeCheckout` is false.
- Public legal pages are materially better and published, but outside-counsel review is still separate and not proven here.
- Live voice demo availability depends on production environment configuration and provider readiness. The website now handles unavailable state honestly.
- The duplicated scratch files `docs/handoffs/2026-06-22-launch-legal-diligence 2.md` and `docs/legal/2026-06-19-launch-legal-review 2.md` remain untracked and were intentionally not staged.

## Next Prompt

Continue the first-paid-customer launch path from the app/onboarding side: turn `selfServeCheckout` on only when the app checkout/onboarding path is verified, then rerun website start-setup journeys against the live app path.

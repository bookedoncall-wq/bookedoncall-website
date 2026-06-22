<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BookedOnCall Website Operator Rules

This file applies to the BookedOnCall public website repository. Mechanical checks, schemas, runtime behavior, and deployed output are authoritative over this prose.

## Source Of Truth

- Use `/Users/david/Documents/bookedoncall-v2/AGENTS.md` as the current product and proof constitution. The website must not make claims that exceed V2's current proof posture.
- Use `config/public-site-contract.json` as the website's public claim contract for positioning, contacts, plan terms, integrations, legal update date, and self-serve checkout state.
- Keep the marketing website and V2 app separate codebases. The website sells and explains the product; V2 owns authenticated setup, product brain, onboarding, billing, provider proof, and operator workflows.
- Treat legal pages as public launch drafts until outside counsel approves them. Better disclosure may be deploy-worthy, but it is not legal approval.

## Public Claim Boundaries

- Do not claim booked, priced, accepted, dispatched, serviceable, self-serve checkout-ready, provider-ready, or launch-ready outcomes unless the V2 app proof and website contract support that exact claim.
- Customer-facing copy must avoid internal proof language, provider names, stale readiness labels, or proof-ladder jargon unless a buyer needs the provider name to connect or manage an integration.
- Direct booking copy must stay owner-approved by default unless the configured service, service area, scheduling provider, and owner opt-in are all explicit.
- Planned integrations must stay visibly planned. Do not imply QuickBooks, Housecall Pro, ServiceTitan, or any other roadmap item is live or self-serve unless `config/public-site-contract.json` and V2 proof both say so.
- If `featureFlags.selfServeCheckout` is false, primary buying CTAs should route to the lead/setup path, not app checkout.

## Start Here

1. Confirm the repo root and run `git status --short --branch`.
2. Read this file, the relevant Next.js guide under `node_modules/next/dist/docs/`, `config/public-site-contract.json`, and the closest existing page/component before editing.
3. For product, launch, billing, legal, provider, or self-serve claims, check V2 repo truth before changing copy.
4. For customer-facing visual work, run a browser or production-mode visual check when the page is runnable.

## Common Commands

- Fast public contract checks: `npm run verify:content`, `npm run check:public-truth`, and `npm run lint`.
- Build and route proof: `npm run build`, then `npm run verify:runtime`, `npm run verify:journeys`, `npm run verify:seo`, and `npm run verify:visual-layout`.
- Security and closeout: `npm run security:secrets` and `git diff --check`.
- Lead-path proof when signup/contact changes: `npm run verify:production-leads`.

## Definition Of Done

- Preserve proof boundaries: website repo proof, deployed website proof, provider proof, live voice proof, app proof, billing proof, customer-data proof, and legal approval are separate.
- Validate every changed public claim against the public contract or V2 truth.
- After material website changes, write a concise handoff in `docs/handoffs/` with goal, files changed, commands run, proof level, validation not run, risks, and next prompt.
- Do not stage or revert unrelated dirty work. If deploying, include the legal draft boundary and verify the exact deployed website output after deployment.

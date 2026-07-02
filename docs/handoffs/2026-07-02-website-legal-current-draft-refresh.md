# 2026-07-02 Website Legal Current-Draft Refresh

## Goal

Publish the current launch legal draft posture on the public website while keeping legal approval, app proof, provider proof, billing proof, customer-data proof, live voice proof, and launch readiness separate.

## Current State

- Public legal contract version is now `6` with legal `lastUpdated` set to `2026-07-02`.
- Privacy, Terms, Call Handling Notice, SMS Terms, and DPA copy now align more closely with the V2 launch legal template pack around owner-review defaults, caller fallback paths, service-request SMS scope, marketing-off-by-default posture, and legal-hold/deletion exceptions.
- The public pages remain launch drafts pending counsel/legal review. This batch does not approve legal posture or clear paid go-live.

## Files Changed

- `config/public-site-contract.json`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/call-handling-notice/page.tsx`
- `app/sms-terms/page.tsx`
- `app/dpa/page.tsx`
- `docs/legal/2026-06-19-launch-legal-review.md`

## Commands Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run security:secrets`
- `git diff --check`
- `npm run build`
- `npm run verify:runtime`
- `npm run verify:seo`
- `npm run verify:journeys`
- `npm run verify:visual-layout -- --routes=/privacy,/terms,/call-handling-notice,/sms-terms,/dpa --json-out=artifacts/reviews/2026-07-02-legal-refresh-visual-layout.json --screenshot-dir=artifacts/screenshots/2026-07-02-legal-refresh`

## Proof Level

Local website repo proof plus local production-mode website route, SEO, journey, and visual-layout proof for the changed legal routes.

This is not deployed website proof, outside-counsel approval, legal compliance proof, provider proof, live voice proof, app proof, billing proof, customer-data proof, revenue readiness, public self-serve readiness, or launch readiness.

## Validation Not Run

- No production deployment verification yet.
- No outside counsel/legal approval.
- No app checkout, live call, provider, customer-data, or billing proof.

## Risks

- Counsel may still require changes to call recording/AI notice, SMS consent and STOP/HELP handling, subscription renewal/cancellation language, Google Limited Use wording, subprocessor notice, dispute terms, or privacy request operations.
- The website now publishes stronger draft terms, but the V2 app still must enforce acceptance capture, recording/SMS notice behavior, owner-review defaults, cancellation/support paths, retention/deletion workflows, and direct-booking authority before those workflows can be relied on broadly.

## Next Prompt

Continue website or V2 launch work from the current repo head. If deploying this website change, verify the exact deployed public legal pages after deployment and keep legal approval separate from deployed website proof.

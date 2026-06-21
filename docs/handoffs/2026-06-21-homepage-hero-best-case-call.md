# 2026-06-21 Homepage Hero Best-Case Call

## Goal

Make the homepage hero showcase BookedOnCall's expected best-case customer experience instead of a transactional internal workflow sample.

## Current State

- Rewrote the homepage right-side call card around an HVAC no-cool caller who wants help as soon as possible.
- The assistant now probes for safety/heat risk, confirms the system is blowing warm air, books the next available 8 to 10 a.m. diagnostic window, and flags same-day owner review.
- Reframed the hero headline and supporting copy around a phone assistant that sounds like it works for the shop.
- Removed the clipped duplicate desktop card eyebrow after visual review.

## Files Changed

- `app/page.tsx`

## Validation Run

- `npm run verify:content`
- `npm run check:public-truth`
- `npm run lint`
- `npm run build`
- Production-mode local browser screenshot checks at `http://127.0.0.1:3058/` using installed Chrome for desktop, iPhone-width, and Android-width viewports.

## Screenshot Evidence

- `artifacts/screenshots/home-hero-desktop-safety-escalation-current.png`
- `artifacts/screenshots/home-hero-iphone-safety-escalation-current.png`
- `artifacts/screenshots/home-hero-android-safety-escalation-current.png`

## Results

- Content and public-truth checks passed.
- Lint and production build passed.
- Browser checks found no console errors, no horizontal overflow, visible desktop card title, present safety probe, present booked slot, present same-day owner-review flag, no stale passive-copy phrase, no old transactional workflow phrase, and no internal provider/demo wording.

## Proof Level

Website local production-mode browser proof only. This does not prove deployed production website state, live voice behavior, provider booking, calendar writes, customer data handling, checkout readiness, or launch readiness.

## Next Prompt

Continue website conversion cleanup by reviewing `/demo-calls`, `/examples`, and the vertical pages against the same standard: show expected customer value and realistic best-case calls, avoid internal proof/provider language, and verify desktop/mobile production-mode screenshots before deployment.

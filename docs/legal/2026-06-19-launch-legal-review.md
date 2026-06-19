# BookedOnCall Launch Legal Review Packet

Date: 2026-06-19

Status: counsel-review draft. This packet is drafting support for outside counsel and operator planning. It is not legal advice and does not prove legal compliance, provider readiness, production readiness, customer-data readiness, or launch readiness.

## Executive Summary

The public website legal surface now has a stronger launch baseline:

- Terms of Service: owner responsibilities, AI/automation limits, call recording and transcription notices, calendar/booking limits, SMS/email consent, no emergency/life-safety reliance, regulated-use exclusions, billing/overages/cancellation, third-party service limits, warranty disclaimer, liability cap, indemnity, governing law.
- Privacy Policy: account/setup/caller/billing/log data categories, AI-assisted processing, cookies/analytics, disclosures, retention posture, rights requests, state privacy notice, controller/processor split.
- Data Processing Addendum: processor/service-provider terms, Customer Personal Data scope, instructions, service-provider restrictions, security measures, subprocessors, assistance, deletion/return, audits, transfers, regulated-data exclusion.
- Call Handling Notice: public caller-facing explanation for AI-assisted calls, recording/transcription, owner review, booking limits, emergency limits, privacy.
- SMS Terms: service-message categories, consent, STOP/HELP, message frequency, carrier charges, delivery limits, privacy.

Best current posture: stronger than a generic startup placeholder, but outside counsel must review before paid go-live, especially recording consent, TCPA/texting, state privacy, billing/cancellation, and subprocessor language.

## Product Assumptions Reflected In Drafts

- BookedOnCall is a B2B service for trades and home-service businesses.
- Customers configure business rules: services, hours, service area, pricing ranges, escalation rules, calendars, and owner-review behavior.
- BookedOnCall may answer inbound calls and support callback or booking paths based on customer setup.
- Calls may be recorded, transcribed, summarized, analyzed, and reviewed where enabled or needed to provide and support the service.
- Direct booking is not a blanket promise. Owner-approved requests are the safer default unless the customer explicitly enables direct booking and required setup/provider proof exists.
- Texting is treated as transactional/service support unless a later reviewed marketing program is approved.
- No HIPAA/PHI, emergency dispatch, life-safety, healthcare, legal, financial, employment, credit, housing, insurance, education, or other high-impact eligibility use is allowed without a separate written agreement.
- Website lead forms and public demo should not collect provider credentials, production secrets, real customer records, or unnecessary sensitive data.

## Source-Backed Legal Drivers

- FTC AI/data posture: FTC guidance and enforcement messaging emphasize that businesses remain accountable for consumer data used in algorithms and that machine learning is not a license to break the law.
  Source: https://www.ftc.gov/business-guidance/blog/2023/06/hey-alexa-what-are-you-doing-my-data
- TCPA/robotext/robocall consent and revocation: 47 CFR 64.1200 covers artificial/prerecorded voice, consent, and revocation. It recognizes STOP/QUIT/END/REVOKE/OPT OUT/CANCEL/UNSUBSCRIBE replies and requires revocation requests to be honored within a reasonable time not exceeding 10 business days.
  Source: https://www.ecfr.gov/current/title-47/chapter-I/part-64/subpart-L/section-64.1200
- FCC AI voice position: FCC has treated AI-generated voice technologies as falling within TCPA artificial/prerecorded voice restrictions.
  Source: https://www.fcc.gov/document/fcc-confirms-tcpa-applies-ai-technologies-generate-human-voices
- FTC CAN-SPAM guidance: commercial email requires accurate headers, non-deceptive subject lines, opt-out notice, prompt opt-out honoring, and accountability for vendors.
  Source: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- HIPAA boundary: HHS describes covered entities/business associates and written business-associate contract requirements for protected health information. BookedOnCall should not accept PHI unless a deliberate HIPAA posture and BAA are approved.
  Source: https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html

## C-Suite Review

### CEO

Assessment: The current public legal surface is good enough to reduce obvious trust and diligence gaps before launch, but not enough to launch without counsel review and product proof. The biggest business risk is not only lawsuit exposure; it is losing owner trust because the product did something legally or operationally surprising on a live call.

Pre-launch decisions:

1. Launch only for trades/home-service businesses that do not require HIPAA, emergency dispatch, or regulated professional advice.
2. Use owner-approved booking requests as default until a specific account has reviewed calendar setup, provider write proof, and owner opt-in.
3. Treat texting as transactional/service follow-up only at launch.
4. Keep public demo sample-only and prohibit real customer data in demo.
5. Require legal page acceptance in checkout or signup before charging.

### Chief Legal Counsel

Assessment: The drafts are conservative and directionally strong. Remaining legal review is still mandatory because call recording, TCPA, state privacy, AI disclosure, cancellation, and limitation-of-liability enforceability vary by jurisdiction and transaction type.

Counsel review list:

1. Confirm Colorado governing law and venue.
2. Confirm liability cap and indemnity enforceability for small-business customers.
3. Confirm month-to-month cancellation and overage billing language.
4. Confirm no-arbitration posture or add arbitration/class-waiver if desired.
5. Confirm AI/call recording disclosure language for all-party-consent states.
6. Confirm TCPA/SMS terms and whether A2P/10DLC program language needs to be public.
7. Confirm CCPA/CPA/state privacy notice scope and rights-process language.
8. Confirm DPA processor/service-provider language and whether a named subprocessor list is required before GDPR-risk customers.
9. Confirm HIPAA/PHI exclusion and vertical screening language.
10. Confirm whether website analytics creates "sale/share" or targeted-advertising opt-out obligations.

### Chief Product Officer

Assessment: Legal posture requires product behavior, not just policy text. The product must make it hard for owners to accidentally rely on unsafe configurations.

Required product actions before paid go-live:

1. Add a required Terms/Privacy acceptance step to checkout or first app setup.
2. Add a recording/AI-assistant notice configuration to every call flow, with a default announcement.
3. Add an account-level toggle for stricter consent handling when a business operates in all-party-consent jurisdictions.
4. Make owner-approved booking requests the default; require explicit direct-booking opt-in.
5. Add pricing-range toggle and prevent final-price quotes unless a service-specific fixed price is configured.
6. Add emergency escalation defaults per vertical and force owner review of those defaults during onboarding.
7. Add public-demo warning and demo prompt controls that reject real customer data and real booking actions.

### Chief Technology Officer

Assessment: The site legal pages now align with the existing app proof philosophy. The pre-launch technical gap is turning legal obligations into enforced app gates, logs, and provider checks.

Required technical actions before paid go-live:

1. Persist acceptance of Terms, Privacy, SMS Terms if texting is enabled, and DPA/order terms where applicable.
2. Store acceptance timestamp, user/account/business scope, legal version/date, IP/user-agent if appropriate, and source surface.
3. Prevent production SMS sends unless consent status, sender setup, opt-out handling, and rate limiting are recorded.
4. Prevent production call recording/transcription unless the call notice posture is configured for the account.
5. Add customer-data deletion/export request intake and audit trail before real customer data launch.
6. Add subprocessor/category registry for support and counsel review.

### Chief Security And Privacy Officer

Assessment: The Privacy/DPA language fits the repo's redaction and support-privacy intent. The remaining risk is operational: if support/export/deletion is not ready, the public privacy rights language becomes hard to execute.

Required security/privacy actions before paid go-live:

1. Document request intake for privacy, deletion, export, and support review.
2. Define response owner, response targets, verification process, and escalation backup.
3. Confirm logs and provider artifacts redact phone numbers, addresses, raw transcripts, secrets, and raw provider payloads unless deliberately retained.
4. Define default retention classes in the product/admin docs, not only in code.
5. Create incident-notice runbook with legal review triggers.

### Chief Revenue Officer / Marketing

Assessment: Public copy should keep selling value, but it must not sell unproved automation. Missed-call value claims are fine when framed as a business rationale, not a guarantee.

Required revenue/marketing actions before paid go-live:

1. Avoid "guaranteed booking," "never miss a job," "fully automated," or "emergency response" claims.
2. Keep examples clearly framed as sample/best-case flows.
3. Align pricing page, checkout, invoice, Terms, and cancellation language before first charge.
4. Keep SMS/email described as supported follow-up, not marketing blast infrastructure.

### Chief Operations Officer

Assessment: Legal posture depends on a one-person operator being able to execute support, deletion, incident, billing, and opt-out workflows without direct SQL or provider-dashboard guesswork.

Required operations actions before paid go-live:

1. Create one operator checklist for first customer setup that includes legal pages accepted, recording notice configured, SMS consent reviewed, calendar mode selected, booking mode selected, emergency rules reviewed, and test call passed.
2. Create one cancellation/refund/payment-failure checklist.
3. Create one privacy/export/deletion checklist.
4. Create one incident/escalation checklist.

## Product Changes Recommended Before Launch

P0 before any paid customer:

1. Legal acceptance gate in app or checkout.
2. Default AI/recording/transcription announcement in call flow.
3. SMS consent and STOP/HELP handling gate before any outbound customer text.
4. Owner-approved booking as default, with direct booking disabled until explicit opt-in and calendar proof.
5. Emergency escalation default review in onboarding.
6. Pricing quote guard: ranges only unless fixed prices are explicitly configured.
7. Privacy/export/deletion support intake path with an auditable owner.
8. Public checkout billing disclosure: price, included minutes, overages, taxes/fees, cancellation, refund posture.

P1 before scaling beyond founder-managed pilots:

1. Named subprocessor list and change-notice process.
2. State privacy request dashboard or structured operator packet.
3. Formal A2P/10DLC registration evidence and sender compliance packet.
4. Customer-specific retention settings and export self-service.
5. Accessibility review of all legal and signup pages with keyboard/focus checks.
6. Incident response tabletop including customer notification and provider contact trees.

## Outside Counsel Questions

1. Do the Terms need arbitration, class-action waiver, jury waiver, or small-claims carveout?
2. Should month-to-month cancellation require in-app cancellation, email notice, or both?
3. Should prepaid monthly fees remain non-refundable except where required by law, or should first-month refunds be offered commercially?
4. Does the AI/call notice need to be verbal at the beginning of every call in all launch states?
5. Do all-party-consent states require stricter account-level defaults than the current public notice posture?
6. Does transactional SMS for appointment/callback follow-up require separate written consent in the intended launch workflows?
7. Should BookedOnCall prohibit customers from uploading any health-adjacent information, or is the current PHI exclusion sufficient?
8. Does the DPA need SCCs, UK addendum, or named subprocessor appendix before accepting non-U.S. customers?
9. Does the public website analytics setup trigger cookie banner, targeted advertising opt-out, or "sale/share" disclosures?
10. Are Colorado AI or other state AI laws relevant to this specific product scope at launch, or only future high-risk/consumer decision workflows?

## Current Public Pages Updated

- `/terms`
- `/privacy`
- `/dpa`
- `/call-handling-notice`
- `/sms-terms`

## Proof Boundary

This packet and the public page updates are website repo proof and public website draft proof after deployment. They do not prove outside-counsel approval, legal compliance, call-flow implementation, SMS provider compliance, recording consent compliance, production app acceptance capture, customer-data readiness, billing readiness, provider readiness, or launch readiness.

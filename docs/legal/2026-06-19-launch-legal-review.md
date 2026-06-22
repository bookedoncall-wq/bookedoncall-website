# BookedOnCall Launch Legal Review Packet

Date: 2026-06-22

Status: counsel-review draft. This packet is drafting support for outside counsel and operator planning. It is not legal advice and does not prove legal compliance, outside-counsel approval, provider readiness, production readiness, customer-data readiness, billing readiness, live voice readiness, or launch readiness.

## Executive Summary

The public legal surface was refreshed for first paid customer diligence while preserving the current launch boundary: BookedOnCall may educate, capture setup interest, and support founder-managed pilot preparation, but public self-serve, live customer-data use, live billing, direct calendar booking, and live call routing still require their owning product and evidence gates.

Public pages updated or re-reviewed:

- `/terms`: electronic acceptance/clickwrap posture, subscription renewal, cancellation path, overages, taxes, refunds, payment recovery, feature activation, connected-account permissions, and stricter call-recording fallback language.
- `/privacy`: request workflow, verification, appeal path, state privacy notices, sensitive/regulated data exclusions, Google API Services User Data Policy / Limited Use language, and connected-calendar revocation.
- `/dpa`: service-provider/processor posture, Google-data restriction language, subprocessor categories, account-specific subprocessor information, and material subprocessor change-notice posture.
- `/call-handling-notice`: clearer AI-assisted call, recording/transcription consent, alternate-path language, booking limits, emergency limits, and privacy route.
- `/sms-terms`: consent scope, marketing consent not a purchase condition, STOP/HELP, broader revocation wording, and ten-business-day TCPA opt-out timing.

Best current posture: stronger than placeholder startup legal text and suitable for counsel review. It is not sufficient to charge a customer or route live customer calls without counsel approval plus product proof for acceptance capture, recording notice behavior, SMS consent/opt-out, billing cancellation, retention/deletion, and one-person support operations.

## Assumptions

- BookedOnCall is launching as a B2B service for trades and home-service businesses, not a consumer emergency service, healthcare service, financial/legal advice service, or high-risk eligibility system.
- Customers configure business rules: services, hours, service area, pricing ranges, escalation rules, calendars, booking mode, owner-review behavior, notices, and fallback paths.
- Owner-approved booking requests remain the safer default until an account explicitly enables direct booking and required calendar/provider/customer-specific proof exists.
- Texting is transactional/service follow-up unless a separate reviewed marketing SMS program is approved.
- Website lead forms and public demos must not collect provider credentials, production secrets, real customer records, or unnecessary sensitive data.
- Public legal pages are launch drafts for counsel review; product behavior must enforce the duties described in the pages.

## Official Sources Reviewed

- FCC Declaratory Ruling FCC 24-17 on AI-generated voices under TCPA artificial/prerecorded voice restrictions: https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf
- FCC/Federal TCPA revocation and artificial/prerecorded voice rules, 47 CFR 64.1200: https://www.ecfr.gov/current/title-47/section-64.1200
- FCC consumer guide on robocalls/texts and AI-generated voice calls: https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts
- FTC Advertising and Marketing guidance: https://www.ftc.gov/business-guidance/advertising-marketing
- FTC CAN-SPAM business guide: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- FTC Negative Option Rule May 9, 2025 statement: https://www.ftc.gov/legal-library/browse/cases-proceedings/public-statements/statement-commission-regarding-negative-option-rule
- FTC 2026 Negative Option Rule ANPR noting Eighth Circuit vacatur and reinstatement of the prior 1973 rule: https://www.ftc.gov/system/files/ftc_gov/pdf/p064202negativeoptionruleanprm.pdf
- California Automatic Renewal Law, Business and Professions Code Article 9: https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=9.&chapter=1.&division=7.&lawCode=BPC&part=3.&title=
- California CCPA/CPRA overview from the California Attorney General: https://oag.ca.gov/privacy/ccpa
- Colorado Privacy Act information from the Colorado Attorney General: https://coag.gov/resources/colorado-privacy-act/
- Colorado SB24-205 Consumer Protections for Artificial Intelligence: https://leg.colorado.gov/bills/sb24-205
- Google API Services User Data Policy: https://developers.google.com/terms/api-services-user-data-policy
- Google Workspace API Services User Data and Developer Policy / Limited Use disclosure: https://developers.google.com/workspace/workspace-api-user-data-developer-policy
- FTC Protecting Personal Information guidance: https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business
- Representative all-party recording statutes for counsel spot check: California Penal Code 632, Florida Statutes 934.03, Washington RCW 9.73.030, Pennsylvania 18 Pa.C.S. 5704.
- WCAG 2.2 accessibility standard for legal/signup page review: https://www.w3.org/TR/WCAG22/

## Issue List And Current Patch Response

1. Electronic acceptance and clickwrap
   - Current response: Terms now cover acceptance by click/check controls, checkout/order forms, setup approval, continued use after updates, and electronic acceptance records.
   - Counsel review: confirm whether signup/checkout must use separate checkbox text, scrollwrap, downloadable terms, or acceptance copy for Colorado and target launch states.

2. Subscription renewal, cancellation, refunds, taxes, overages, and payment recovery
   - Current response: Terms now say subscriptions renew automatically unless otherwise agreed, identify monthly advance billing, arrears overages, support/email or account cancellation paths, non-refund posture except where required, and payment-failure remedies.
   - Counsel review: confirm compliance with California automatic renewal requirements, state auto-renewal laws, current federal negative-option posture after the Eighth Circuit vacatur, and B2B-vs-consumer scope.

3. TCPA, AI voice, and robocall posture
   - Current response: Call notice and Terms disclose AI-assisted calls and recording/transcription. SMS Terms include revocation and STOP/HELP language.
   - Counsel review: confirm inbound-call AI notice requirements, outbound callback/text consent, whether prior express written consent is required for any launch workflow, and whether any voice-call opt-out mechanism is needed before outbound calls.

4. Call recording and transcription consent
   - Current response: Call notice now says continuing after a recording/transcription notice may be treated as consent where permitted, and that stricter states or account settings may require more. It also points callers to alternate paths if they do not want to continue.
   - Counsel review: approve the default announcement wording and decide whether all launch accounts should default to an announcement-only, all-party-consent, or no-recording-until-confirmed posture.

5. SMS consent, STOP/HELP, and revocation handling
   - Current response: SMS Terms now distinguish service texts from marketing texts, keep marketing consent non-conditional, support STOP/HELP, recognize other clear revocation wording, and target no later than ten business days for TCPA opt-outs.
   - Counsel review: confirm whether service/callback texts require written consent in the intended launch flows, whether A2P/10DLC terms must be public, and what final opt-out confirmation copy is allowed.

6. FTC advertising, AI claims, and substantiation
   - Current response: Public pages avoid internal proof language and avoid claims such as guaranteed booking, emergency response, public self-serve readiness, or fully automated outcomes.
   - Counsel review: confirm marketing claims, demo examples, pricing copy, and missed-call benchmark use before paid ads or broad launch.

7. Privacy rights, verification, appeals, retention, and deletion
   - Current response: Privacy now gives a clearer request intake path, verification limits, appeal route, state privacy framing, and sensitive/regulated data exclusions.
   - Counsel review: approve the request workflow, response targets, appeal process, authorized-agent process, retention classes, deletion exceptions, and whether a cookie/targeted-advertising opt-out is required for current analytics.

8. Google Calendar and Google API Limited Use
   - Current response: Privacy and DPA now include Google API Services User Data Policy / Limited Use language and state that Google user data is not sold, used for advertising, or used to train general AI models.
   - Counsel review: approve exact privacy-policy wording for OAuth verification and decide whether a dedicated Google API disclosure page is needed.

9. DPA, subprocessors, and change notice
   - Current response: DPA now lists subprocessor categories, says not every category applies to every customer, references customer-enabled integrations such as Google Calendar or Jobber, and adds account-specific subprocessor information plus material change-notice posture.
   - Counsel review: decide whether a named public subprocessor appendix is required before first customer signature, and approve objection/termination rights for material subprocessor changes.

10. Colorado AI Act relevance
   - Current response: Terms prohibit high-impact eligibility/professional use without a separate written agreement. The product is positioned as call intake and owner workflow support, not consequential decision automation.
   - Counsel review: confirm whether launch scope is outside high-risk consequential-decision use, and approve any required consumer AI interaction disclosure under Colorado SB24-205 or other state AI laws.

11. Accessibility of legal/signup pages
   - Current response: Legal copy is rendered in structured headings and standard links. Existing repo visual/browser checks should verify no clipping/overlap on desktop and mobile.
   - Counsel/operator review: complete keyboard, focus-visible, contrast, form label, screen-reader smoke, and mobile tap-target review before public self-serve launch.

## Product Changes Required Before Paid Go-Live

P0 before any paid customer:

1. Capture Terms and Privacy acceptance in checkout or first app setup, including version/date, account/business scope, user, timestamp, and source surface.
2. Capture SMS Terms acceptance or consent evidence before any outbound customer text workflow.
3. Implement and test default AI/recording/transcription announcement in every enabled call flow.
4. Add an account-level stricter consent setting or alternate no-recording path for all-party-consent jurisdictions.
5. Keep owner-approved booking as default; require explicit direct-booking opt-in plus customer-specific calendar/provider proof.
6. Prevent final-price quotes unless fixed service-specific prices are configured; otherwise keep price language to ranges or owner review.
7. Add emergency escalation defaults and force owner review during onboarding.
8. Implement privacy/export/deletion/support intake with owner, backup, verification, audit trail, and response targets.
9. Align checkout, invoice, pricing page, Terms, cancellation flow, refund posture, and overage copy before first charge.

P1 before scaling beyond founder-managed pilots:

1. Publish or attach a named subprocessor appendix and material-change workflow.
2. Complete A2P/10DLC sender compliance packet and SMS delivery/opt-out drill.
3. Add structured state privacy request packet or dashboard.
4. Complete retention/deletion drill, including backup and provider-reference behavior.
5. Complete legal/signup accessibility review across keyboard, focus, contrast, labels, screen reader, and mobile.
6. Complete incident response tabletop with customer notification, provider escalation, and pause-lever steps.

## Outside Counsel Yes/No Questions

1. Are the Terms, Privacy Policy, DPA, Call Handling Notice, and SMS Terms acceptable as launch drafts for a narrow B2B trades pilot?
2. Should the Terms include arbitration, class-action waiver, jury waiver, small-claims carveout, or a different dispute structure?
3. Is Colorado governing law and venue acceptable for the first paid pilot and target states?
4. Is the subscription renewal/cancellation/refund language adequate for the first charge, especially for California or other automatic-renewal states?
5. Does every AI-assisted call need a verbal AI notice, recording notice, or both at the start of the call?
6. Should all-party-consent states default to stricter confirmation or no recording/transcription until affirmative consent is captured?
7. Is transactional callback/appointment SMS covered by existing consent flows, or is separate written consent required before any first-customer text?
8. Does the current website analytics/lead capture setup trigger cookie banner, targeted-advertising opt-out, sale/share, or universal opt-out mechanism duties?
9. Is the Google Limited Use wording sufficient for Google Calendar OAuth review?
10. Does the DPA need SCCs, a UK addendum, a named subprocessor appendix, or customer objection rights before accepting any non-U.S. customer?
11. Is Colorado AI Act consumer-interaction disclosure relevant to this launch scope, and if yes, what exact caller-facing disclosure is required?
12. Are the regulated-use exclusions broad enough for home-service calls that may contain health-adjacent, emergency, insurance, or financing details?

## What Counsel Should Approve

- The five public legal pages as launch drafts for a founder-managed B2B pilot.
- The default call announcement and fallback/alternate-path language.
- The SMS consent, STOP/HELP, revocation, and final confirmation approach.
- The subscription renewal, checkout acceptance, cancellation, refund, taxes, and overage terms.
- The privacy request workflow, appeal wording, retention/deletion posture, and sensitive-data exclusions.
- The Google API Limited Use wording and whether a separate Google disclosure page is needed.
- The DPA service-provider/processor restrictions, subprocessor categories, change-notice process, and any required appendix.
- The public marketing claim boundary for first paid pilot and self-serve growth.

## Current Public Pages Updated

- `/terms`
- `/privacy`
- `/dpa`
- `/call-handling-notice`
- `/sms-terms`

## Proof Boundary

This packet and the public page updates are website repo proof after local validation and public website draft proof only after deployment. They do not prove outside-counsel approval, legal compliance, call-flow implementation, SMS provider compliance, A2P/10DLC readiness, recording consent compliance, production app acceptance capture, live Stripe billing readiness, customer-data readiness, provider readiness, phone go-live, live voice quality, public self-serve readiness, or launch readiness.

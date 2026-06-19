import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "BookedOnCall terms for website access, subscriptions, AI-assisted call handling, customer setup, connected tools, billing, and responsible use.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <LegalPageShell
      currentPath="/terms"
      title="Terms of Service"
      description="These terms govern use of the BookedOnCall website, customer app, AI-assisted call handling, setup services, connected tools, billing, and support."
      summaryItems={[
        {
          title: "Owners control the business rules",
          body:
            "You remain responsible for your services, service area, hours, pricing guidance, emergency rules, booking rules, calendars, and customer communications.",
        },
        {
          title: "AI helps, but does not replace judgment",
          body:
            "BookedOnCall is designed to answer calls, collect details, and support next steps. AI, telephony, speech recognition, calendars, and other tools can still make mistakes.",
        },
        {
          title: "No emergency or regulated-use reliance",
          body:
            "The service is not an emergency dispatch line, life-safety system, medical service, legal service, financial service, or high-risk decision system.",
        },
        {
          title: "Billing and cancellation terms matter",
          body:
            "Plan price, included minutes, overages, taxes, cancellation, and payment recovery are governed by these terms and any checkout, order form, or written agreement.",
        },
      ]}
    >
      <LegalSection title="1. Scope and acceptance">
        <p>
          These Terms of Service govern access to bookedoncall.com, the BookedOnCall customer app, setup support, APIs, call handling,
          connected tools, and related services provided by BookedOnCall (collectively, the <strong>Service</strong>).
        </p>
        <p>
          By accessing or using the Service, creating an account, submitting a setup request, starting a subscription, or allowing calls
          to route through BookedOnCall, you agree to these Terms. If you use the Service for a company or other legal entity, you
          represent that you have authority to bind that entity, and <strong>you</strong> includes that entity.
        </p>
      </LegalSection>

      <LegalSection title="2. Accounts, authority, and accurate setup">
        <p>
          You must provide accurate account, business, billing, service-area, hours, phone, calendar, integration, and setup information
          and keep it current. You are responsible for all activity under your account and for the people, contractors, administrators,
          connected accounts, phone numbers, and calendars you authorize.
        </p>
        <p>
          BookedOnCall may rely on the setup information you provide. If your service area, hours, pricing guidance, emergency rules,
          schedule, calendar availability, phone forwarding, or fallback contact path is wrong or outdated, caller outcomes may also be
          wrong or delayed.
        </p>
      </LegalSection>

      <LegalSection title="3. What the Service does">
        <p>
          BookedOnCall is an AI-assisted phone and intake service for trades and home-service businesses. Depending on your selected plan,
          setup, and connected tools, the Service may answer inbound calls, disclose that callers are speaking with an assistant, collect
          caller details, transcribe or summarize calls, identify service-area or emergency issues, route callers to a configured next
          step, create owner review notes, support callback requests, offer available appointment paths, or send supported follow-up
          communications.
        </p>
        <p>
          Some features require setup, owner approval, connected accounts, provider availability, or additional review before they can be
          used. A feature shown on the website, in examples, or in a demo is not active for your business unless it is included in your
          plan and turned on for your account.
        </p>
      </LegalSection>

      <LegalSection title="4. AI, automation, and human oversight">
        <p>
          The Service uses AI-assisted systems and third-party infrastructure, including telephony, speech processing, messaging,
          scheduling, authentication, payment, hosting, and other tools. These systems can misunderstand callers, produce incomplete
          transcripts, classify urgency incorrectly, offer incomplete availability, fail to complete an action, delay a notification, or
          become unavailable.
        </p>
        <p>
          You remain responsible for reviewing call summaries, booking requests, customer communications, pricing guidance, escalation
          rules, and final operational decisions. BookedOnCall does not guarantee that any call, lead, appointment, emergency, quote,
          message, calendar entry, or integration result will be error-free or uninterrupted.
        </p>
      </LegalSection>

      <LegalSection title="5. Calls, recording, transcription, and notices">
        <p>
          Calls handled through the Service may be monitored, recorded, transcribed, summarized, analyzed, or stored where enabled or
          where needed to provide, secure, support, or improve the Service. Callers should be told when they are interacting with an
          assistant and when a call may be recorded or transcribed.
        </p>
        <p>
          You are responsible for providing legally sufficient notices and obtaining any legally required consents for calls, recordings,
          transcriptions, texts, emails, and other communications involving your customers, leads, employees, contractors, or callers. If
          your business needs a stricter notice or consent process, you must configure that requirement with BookedOnCall before relying
          on the Service.
        </p>
      </LegalSection>

      <LegalSection title="6. Booking, calendars, service areas, and pricing">
        <p>
          Booking and scheduling behavior depends on your setup, your connected calendar or scheduling tool, and your rules. You are
          responsible for confirming that your availability, blackout periods, service-area limits, job durations, technician coverage,
          emergency handling, and owner-approval settings match how your business actually works.
        </p>
        <p>
          Unless you expressly enable direct booking and the required setup has been reviewed, BookedOnCall may treat appointment times as
          requests, holds, or owner-review items rather than confirmed jobs. Pricing guidance should be treated as an estimate or range
          unless your written setup clearly authorizes a specific quoted price for a specific service.
        </p>
      </LegalSection>

      <LegalSection title="7. Text messages, email, and customer communications">
        <p>
          If you use BookedOnCall to send or support text messages, emails, reminders, confirmations, or callback communications, you are
          responsible for ensuring the recipients have given any consent required by law and for honoring opt-out requests. BookedOnCall
          may block or limit messaging if required consent, sender setup, opt-out handling, or abuse controls are not in place.
        </p>
        <p>
          Texting terms for messages sent by or through BookedOnCall are available at{" "}
          <a href="/sms-terms" className="font-semibold text-slate-900 underline underline-offset-4">
            /sms-terms
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="8. Emergency and safety limits">
        <p>
          The Service is not a 911 service, emergency dispatch service, medical or safety hotline, alarm system, hazardous-condition
          monitor, or life-safety system. You may not rely on BookedOnCall as the only path for gas leaks, fire, medical emergencies,
          active electrical hazards, violence, flooding, or any situation requiring immediate human or emergency response.
        </p>
        <p>
          You must provide appropriate emergency instructions for your business and maintain human fallback procedures for urgent calls,
          after-hours coverage, and safety-sensitive situations.
        </p>
      </LegalSection>

      <LegalSection title="9. Regulated-use limits">
        <p>
          Unless BookedOnCall signs a separate written agreement that expressly allows it, you may not use the Service to process
          protected health information, provide medical diagnosis or treatment, provide legal or financial advice, make employment,
          housing, credit, insurance, education, or other high-impact eligibility decisions, or make decisions that legally require a
          licensed professional or human review.
        </p>
        <p>
          BookedOnCall does not provide professional, legal, financial, medical, insurance, tax, dispatch, or emergency advice. You are
          responsible for determining whether your use of the Service is appropriate for your industry and jurisdiction.
        </p>
      </LegalSection>

      <LegalSection title="10. Customer data and service data">
        <p>
          As between you and BookedOnCall, you retain rights in the business information, caller information, connected-system data, and
          other content you provide or make available through the Service (<strong>Customer Data</strong>). You grant BookedOnCall the
          rights needed to host, store, transmit, transform, redact, analyze, and otherwise process Customer Data to provide, secure,
          support, troubleshoot, bill for, and improve the Service.
        </p>
        <p>
          BookedOnCall may create aggregated, de-identified, diagnostic, security, and usage information that does not identify you or
          individual callers and may use it to operate and improve the Service.
        </p>
      </LegalSection>

      <LegalSection title="11. Fees, billing, taxes, overages, and cancellation">
        <p>
          Plan fees, included minutes, usage charges, setup fees, taxes, and overage rates are described in the pricing page, checkout
          flow, order form, statement of work, or written agreement that applies to your account. Unless another written agreement says
          otherwise, self-serve subscriptions are billed monthly in advance, usage overages may be billed in arrears, and fees are stated
          in U.S. dollars.
        </p>
        <p>
          You authorize BookedOnCall and its payment processors to charge your payment method for amounts due. You are responsible for
          applicable taxes, fees, and payment processor charges other than taxes based on BookedOnCall&apos;s income.
        </p>
        <p>
          You may cancel a month-to-month self-serve subscription according to the cancellation flow made available for your account or by
          contacting support. Unless required by law or stated in a separate agreement, prepaid fees are not refundable, cancellation does
          not erase amounts already due, and service may continue through the paid period subject to these Terms and operational limits.
        </p>
        <p>
          If payment fails or an account becomes past due, BookedOnCall may pause new answering, limit usage, require payment recovery,
          or terminate access after reasonable notice where practicable.
        </p>
      </LegalSection>

      <LegalSection title="12. Third-party services and connected accounts">
        <p>
          The Service may connect to phone carriers, AI systems, calendars, CRMs, schedulers, messaging systems, payment processors,
          authentication providers, hosting services, analytics tools, and other third-party services. Those services are governed by
          their own terms and policies. BookedOnCall is not responsible for third-party outages, settings, data accuracy, permissions,
          policy changes, or fees outside BookedOnCall&apos;s control.
        </p>
        <p>
          You represent that you have the rights and permissions needed to connect any phone number, calendar, CRM, scheduler, payment
          account, email account, text sender, or other third-party account to the Service.
        </p>
      </LegalSection>

      <LegalSection title="13. Acceptable use">
        <p>You may not use the Service to:</p>
        <ul className="list-disc pl-6">
          <li>violate law, infringe rights, deceive callers, or interfere with the privacy or safety of others,</li>
          <li>send unlawful robocalls, spam, deceptive messages, or communications without required consent,</li>
          <li>submit secrets, payment-card data, regulated health data, or sensitive data unless a written agreement allows it,</li>
          <li>probe, scrape, disrupt, reverse engineer, bypass access controls, or overload the Service,</li>
          <li>use the Service to make decisions that require a licensed professional or legally required human review, or</li>
          <li>upload malware, exploit code, or malicious, abusive, or unlawful content.</li>
        </ul>
      </LegalSection>

      <LegalSection title="14. Suspension and service controls">
        <p>
          BookedOnCall may suspend, limit, throttle, or block use of the Service if we reasonably believe use creates security risk, legal
          risk, abuse, payment risk, provider risk, operational harm, or risk to callers, customers, or other users. We may also apply
          usage caps, rate limits, call limits, spend controls, or feature restrictions to protect the Service and connected systems.
        </p>
      </LegalSection>

      <LegalSection title="15. Intellectual property and feedback">
        <p>
          BookedOnCall and its licensors retain all rights in the Service, including software, designs, workflows, documentation, prompts,
          models, trademarks, trade dress, and other intellectual property, except for Customer Data and rights expressly granted to you.
        </p>
        <p>
          If you provide suggestions, feedback, or ideas, you grant BookedOnCall a worldwide, perpetual, irrevocable, royalty-free right
          to use that feedback without restriction or compensation.
        </p>
      </LegalSection>

      <LegalSection title="16. Confidentiality">
        <p>
          Each party may receive non-public business, technical, security, or commercial information from the other. The receiving party
          will use the disclosing party&apos;s confidential information only to perform under these Terms and will protect it using reasonable
          care.
        </p>
      </LegalSection>

      <LegalSection id="roadmap-and-coming-soon-statements" title="17. Roadmap, beta, and examples">
        <p>
          Website examples, demo calls, planned integrations, roadmap statements, and coming-soon descriptions are informational only.
          They do not create a warranty, delivery commitment, certification, release date, or obligation to provide a feature unless a
          signed agreement expressly says otherwise.
        </p>
        <p>
          Purchasing, renewing, or using the Service should be based on the features available in your account and plan, not anticipated
          future functionality.
        </p>
      </LegalSection>

      <LegalSection title="18. Disclaimer of warranties">
        <p>
          THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, BOOKEDONCALL DISCLAIMS
          ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, QUIET ENJOYMENT, ACCURACY, AND SYSTEM INTEGRATION.
        </p>
        <p>
          BookedOnCall does not warrant that the Service will be uninterrupted, error-free, secure, timely, or suitable for every business
          workflow, or that any carrier, model, calendar, CRM, scheduler, payment processor, messaging system, or other third-party system
          will remain available.
        </p>
      </LegalSection>

      <LegalSection title="19. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
          EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, REVENUE, GOODWILL, DATA, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF
          THE POSSIBILITY OF THOSE DAMAGES.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, BOOKEDONCALL&apos;S TOTAL LIABILITY ARISING OUT OF OR RELATING TO THE SERVICE OR THESE TERMS
          WILL NOT EXCEED THE AMOUNTS PAID OR PAYABLE BY YOU TO BOOKEDONCALL FOR THE SERVICE DURING THE TWELVE MONTHS BEFORE THE EVENT
          GIVING RISE TO THE CLAIM.
        </p>
        <p>Nothing in these Terms limits liability that cannot be limited under applicable law.</p>
      </LegalSection>

      <LegalSection title="20. Indemnification">
        <p>
          You will defend, indemnify, and hold harmless BookedOnCall and its personnel from third-party claims, damages, losses, and
          expenses arising from or relating to your Customer Data, your business operations, your connected systems, your notices and
          consents, your communications with callers, your use of the Service, your violation of law, or your breach of these Terms.
        </p>
      </LegalSection>

      <LegalSection title="21. Termination">
        <p>
          You may stop using the Service at any time, subject to any payment obligations, minimum terms, or notice periods in your
          commercial agreement. Upon termination, your right to use the Service ends, but sections that by their nature should survive
          will survive, including payment obligations, confidentiality, data rights needed for wind-down, warranty disclaimers, liability
          limits, indemnity, and dispute provisions.
        </p>
      </LegalSection>

      <LegalSection title="22. Governing law and venue">
        <p>
          These Terms are governed by the laws of {siteConfig.governingLaw}, without regard to conflict-of-law rules. Any dispute arising
          out of or relating to these Terms or the Service will be brought exclusively in the state or federal courts located in{" "}
          {siteConfig.venue}, and each party consents to that forum.
        </p>
      </LegalSection>

      <LegalSection title="23. Changes to these Terms">
        <p>
          We may update these Terms from time to time. The &quot;Last updated&quot; date above reflects the latest revision. Your continued use of
          the Service after updated Terms become effective constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="24. Contact">
        <p>
          Questions about these Terms, contractual notices, or legal requests can be sent to{" "}
          <a href={`mailto:${siteConfig.legalEmail}`} className="break-all font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.legalEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}

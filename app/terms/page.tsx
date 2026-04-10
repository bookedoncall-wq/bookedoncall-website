import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "BookedOnCall terms covering website access, subscriptions, account responsibilities, AI-assisted call handling, and use of the service.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <LegalPageShell
      currentPath="/terms"
      title="Terms of Service"
      description="These terms govern access to bookedoncall.com, the customer portal, and the BookedOnCall service, including AI-assisted call handling, connected systems, and related support."
      summaryItems={[
        {
          title: "You control operations",
          body:
            "You remain responsible for service areas, schedules, escalation rules, pricing, customer communications, and connected systems used with BookedOnCall.",
        },
        {
          title: "AI and integrations can be imperfect",
          body:
            "The service is designed to help with inbound calls and follow-up workflows, but speech recognition, automation, telephony, and third-party integrations can fail, lag, or return incomplete results.",
        },
        {
          title: "Roadmap items are not commitments",
          body:
            "Any roadmap item, planned integration, or coming-soon statement is informational only and does not create a binding obligation to deliver on a specific timeline.",
        },
        {
          title: "Commercial terms still apply",
          body:
            "Use of the service is subject to applicable fees, lawful use requirements, suspension rights, warranty disclaimers, and the liability limits described below.",
        },
      ]}
    >
      <LegalSection title="1. Scope and acceptance">
        <p>
          These Terms of Service govern your access to bookedoncall.com, any related customer portal, APIs, support channels, and the
          software, communications workflows, integrations, and AI-assisted features made available by BookedOnCall (collectively, the{" "}
          <strong>&quot;Service&quot;</strong>).
        </p>
        <p>
          By accessing or using the Service, you agree to these Terms. If you use the Service on behalf of a business or other legal
          entity, you represent that you have authority to bind that entity, and &quot;you&quot; includes that entity.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility and account responsibility">
        <p>You must provide accurate account, billing, and setup information and keep it current.</p>
        <p>
          You are responsible for all activity that occurs under your accounts, workspaces, phone numbers, integrations, API credentials,
          and operator users, including the acts and omissions of employees, contractors, and administrators with access to your
          configuration.
        </p>
      </LegalSection>

      <LegalSection title="3. Service description and limitations">
        <p>
          BookedOnCall is an AI phone assistant designed for trades and home-service businesses. Depending on your configuration, the
          Service may answer inbound calls, capture caller details, summarize conversations, transfer callers, route conversations to your
          team, schedule or reschedule work through connected tools, and send follow-up communications.
        </p>
        <p>
          The Service is not a guaranteed human answering service, emergency dispatch service, or life-safety system. You may not rely on
          BookedOnCall as the sole intake path for 911, medical emergencies, fire, gas leaks, active hazards, or other situations that
          require immediate human intervention.
        </p>
        <p>
          BookedOnCall may modify, improve, replace, or discontinue features from time to time. We may also impose reasonable usage,
          security, or operational limits to protect the Service, other customers, or third-party providers.
        </p>
      </LegalSection>

      <LegalSection title="4. AI-assisted workflows and connected systems">
        <p>
          The Service may rely on speech-to-text systems, large language models, automated tool calls, carrier networks, and third-party
          systems such as scheduling, calendar, messaging, and billing platforms. Those systems are useful but inherently imperfect and
          may produce inaccurate transcriptions, incomplete summaries, incorrect classifications, unavailable appointment options, or
          delayed follow-up actions.
        </p>
        <p>
          You remain responsible for reviewing your configuration, business rules, transfer destinations, service coverage, escalation
          paths, messaging templates, and connected-system permissions. You also remain responsible for any final operational decision to
          dispatch, quote, book, cancel, or communicate with an end customer.
        </p>
      </LegalSection>

      <LegalSection title="5. Customer responsibilities">
        <ul className="list-disc pl-6">
          <li>Configure the Service accurately, including service areas, hours, escalation instructions, transfer destinations, and booking rules.</li>
          <li>Maintain valid rights and permissions for any connected phone numbers, calendars, CRMs, schedulers, or other third-party systems.</li>
          <li>Provide legally sufficient notices and obtain any consents required for calling, texting, recording, storing, or processing communications.</li>
          <li>Review outputs, monitor follow-up work, and keep human oversight over business-critical decisions.</li>
          <li>Use the Service in compliance with applicable law, including privacy, consumer protection, marketing, communications, and employment laws.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Customer data and usage rights">
        <p>
          As between you and BookedOnCall, you retain all right, title, and interest in your customer data, business configuration,
          uploaded content, and connected-system data that you provide or make available through the Service (<strong>Customer Data</strong>).
        </p>
        <p>
          You grant BookedOnCall a non-exclusive right to host, store, transmit, redact, transform, analyze, and otherwise process
          Customer Data as necessary to provide, secure, support, troubleshoot, and improve the Service, including generating transcripts,
          summaries, diagnostic records, and usage reports, subject to our Privacy Policy and any applicable DPA.
        </p>
        <p>
          We may generate aggregated or de-identified statistics, product diagnostics, and service analytics that do not identify you or
          individual callers and use those materials to operate and improve the Service.
        </p>
      </LegalSection>

      <LegalSection title="7. Fees, billing, and payment">
        <p>
          Fees, included usage, setup charges, and overage pricing are described in your order form, checkout flow, statement of work, or
          the pricing page that applies to your plan. Unless otherwise stated, fees are charged in U.S. dollars and are non-refundable
          except as required by law.
        </p>
        <p>
          You authorize BookedOnCall and its payment processors to charge the payment method associated with your account for subscription
          fees, usage charges, taxes, and other amounts due under your plan.
        </p>
        <p>
          If payment is overdue, we may suspend new usage, disable customer-visible workflows, or terminate the Service after providing
          reasonable notice where practicable. Suspension does not waive your obligation to pay outstanding amounts.
        </p>
      </LegalSection>

      <LegalSection title="8. Acceptable use">
        <p>You may not use the Service to:</p>
        <ul className="list-disc pl-6">
          <li>Violate law, infringe rights, or interfere with the rights, privacy, or safety of others.</li>
          <li>Send unlawful robocalls, spam, deceptive messages, or communications without required consent.</li>
          <li>Probe, disrupt, reverse engineer, or bypass access controls, rate limits, safeguards, or feature restrictions.</li>
          <li>Use the Service to make autonomous decisions in contexts where a reasonable human review is required.</li>
          <li>Upload or transmit malware, exploit code, or malicious content.</li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Intellectual property and feedback">
        <p>
          BookedOnCall and its licensors retain all rights in the Service, including software, designs, prompts, models, documentation,
          trademarks, trade dress, and other intellectual property, except for Customer Data and rights expressly granted to you.
        </p>
        <p>
          If you provide suggestions, feedback, or ideas regarding the Service, you grant BookedOnCall a worldwide, perpetual,
          irrevocable, royalty-free right to use and exploit that feedback without restriction or compensation.
        </p>
      </LegalSection>

      <LegalSection title="10. Confidentiality">
        <p>
          Each party may receive non-public business, technical, security, or commercial information from the other. The receiving party
          will use the disclosing party&apos;s confidential information only for purposes of performing under these Terms and will protect it
          using reasonable care.
        </p>
        <p>
          Confidential information does not include information that is or becomes public without breach, was already known without an
          obligation of confidentiality, is lawfully received from a third party, or is independently developed without use of the
          disclosing party&apos;s confidential information.
        </p>
      </LegalSection>

      <LegalSection title="11. Suspension and termination">
        <p>
          You may stop using the Service at any time, subject to any minimum term or notice period in your commercial agreement. We may
          suspend or terminate access immediately if we reasonably believe your use creates a security risk, legal risk, payment risk, or
          operational harm to the Service or others.
        </p>
        <p>
          Upon termination, your right to use the Service ends immediately. Sections that by their nature should survive termination,
          including payment obligations, confidentiality, warranty disclaimers, liability limits, and dispute provisions, will survive.
        </p>
      </LegalSection>

      <LegalSection title="12. Disclaimer of warranties">
        <p>
          THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, BOOKEDONCALL DISCLAIMS ALL
          WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, QUIET ENJOYMENT, ACCURACY, AND SYSTEM INTEGRATION.
        </p>
        <p>
          BookedOnCall does not warrant that the Service will be uninterrupted, error-free, secure, timely, or suitable for every
          business workflow, or that any integration, carrier, model provider, or third-party system will remain available.
        </p>
      </LegalSection>

      <LegalSection title="13. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
          EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, GOODWILL, DATA, OR BUSINESS INTERRUPTION, EVEN IF ADVISED
          OF THE POSSIBILITY OF THOSE DAMAGES.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, BOOKEDONCALL&apos;S TOTAL LIABILITY ARISING OUT OF OR RELATING TO THE SERVICE OR THESE TERMS
          WILL NOT EXCEED THE AMOUNTS PAID OR PAYABLE BY YOU TO BOOKEDONCALL FOR THE SERVICE DURING THE TWELVE MONTHS BEFORE THE EVENT
          GIVING RISE TO THE CLAIM.
        </p>
        <p>Nothing in these Terms limits liability that cannot be limited under applicable law.</p>
      </LegalSection>

      <LegalSection title="14. Indemnification">
        <p>
          You will defend, indemnify, and hold harmless BookedOnCall and its personnel from third-party claims, damages, losses, and
          expenses arising from or relating to your Customer Data, your use of the Service, your violation of law, your connected systems,
          or your breach of these Terms.
        </p>
      </LegalSection>

      <LegalSection id="roadmap-and-coming-soon-statements" title="15. Roadmap, beta, and safe harbor statement">
        <p>
          The website and related materials may describe planned features, upcoming integrations, anticipated workflow improvements,
          product direction, or operational goals. These statements are forward-looking, informational only, and provided solely to help
          explain current product direction.
        </p>
        <p>
          Except where required by law, roadmap and coming-soon statements do not create a commitment, warranty, or contractual obligation
          to deliver any feature, integration, certification, timeline, performance target, or release sequence. Purchasing, renewing, or
          using the Service should not be based on anticipated future functionality.
        </p>
        <p>
          BookedOnCall may change priorities, sequencing, or delivery decisions at any time without notice, including because of customer
          feedback, vendor changes, security needs, compliance review, technical constraints, or other business considerations.
        </p>
      </LegalSection>

      <LegalSection title="16. Governing law and venue">
        <p>
          These Terms are governed by the laws of {siteConfig.governingLaw}, without regard to conflict-of-law rules. Any dispute arising
          out of or relating to these Terms or the Service will be brought exclusively in the state or federal courts located in{" "}
          {siteConfig.venue}, and each party consents to that forum.
        </p>
      </LegalSection>

      <LegalSection title="17. Changes to these Terms">
        <p>
          We may update these Terms from time to time. The &quot;Last updated&quot; date above reflects the latest revision. Your continued use of the
          Service after updated Terms become effective constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="18. Contact">
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

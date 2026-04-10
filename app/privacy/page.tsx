import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "BookedOnCall privacy information for bookedoncall.com, customer setup, AI-assisted call handling, and operation of the service.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <LegalPageShell
      currentPath="/privacy"
      title="Privacy Policy"
      description="This policy explains how BookedOnCall handles information collected through bookedoncall.com, customer onboarding, connected systems, and operation of the service."
      summaryItems={[
        {
          title: "We collect what is needed to run the service",
          body:
            "That can include contact details, business setup information, call records, caller intake details, transcripts, summaries, connected-system metadata, billing details, and website usage logs.",
        },
        {
          title: "Service providers help us operate",
          body:
            "We use third-party infrastructure and service providers for hosting, communications, payments, authentication, AI processing, and connected workflows when customers enable them.",
        },
        {
          title: "Retention is purpose-based",
          body:
            "We retain information for as long as needed to provide the service, secure it, support customers, resolve disputes, and comply with law or contractual requirements.",
        },
        {
          title: "Rights depend on jurisdiction",
          body:
            "Depending on where you are located and your relationship to the data, you may be able to request access, correction, deletion, portability, or objection to certain processing.",
        },
      ]}
    >
      <LegalSection title="1. Scope of this policy">
        <p>
          This Privacy Policy applies to bookedoncall.com, related pages and forms, customer onboarding, the BookedOnCall service, and our
          handling of information in support, billing, operations, and connected workflows.
        </p>
        <p>
          It does not override a separate customer agreement, DPA, or other written contract. If a separate agreement controls a specific
          processing relationship, that agreement will govern to the extent of any conflict.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>We may collect or receive the following categories of information:</p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Contact and account details</strong>, such as names, business names, email addresses, phone numbers, billing contacts,
            and user login information.
          </li>
          <li>
            <strong>Business setup information</strong>, such as services offered, service areas, hours, escalation rules, pricing
            guidance, dispatch preferences, transfer destinations, and connected integration settings.
          </li>
          <li>
            <strong>Call and messaging records</strong>, such as caller phone numbers, addresses, job details, call audio or recordings if
            enabled, transcripts, summaries, call outcome metadata, and related follow-up records.
          </li>
          <li>
            <strong>Payment and commercial records</strong>, such as subscription details, invoices, usage data, and payment processor
            metadata.
          </li>
          <li>
            <strong>Technical and usage data</strong>, such as IP addresses, browser type, device information, request logs, timestamps,
            error reports, and security telemetry.
          </li>
          <li>
            <strong>Connected-system data</strong>, such as calendar availability, scheduling identifiers, CRM references, message delivery
            statuses, or other integration outputs when a customer enables those systems.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Sources of information">
        <p>We collect information directly from you, automatically from your use of the website or service, and from third parties such as:</p>
        <ul className="list-disc pl-6">
          <li>callers and message recipients who interact with a customer&apos;s configured workflows,</li>
          <li>your connected systems and integration partners,</li>
          <li>payment processors, authentication providers, and communications providers, and</li>
          <li>service providers that help us secure, host, and support the platform.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. How we use information">
        <p>We use information as needed to:</p>
        <ul className="list-disc pl-6">
          <li>provide, operate, secure, and support the Service,</li>
          <li>answer calls, route conversations, summarize interactions, and perform configured follow-up workflows,</li>
          <li>maintain accounts, billing, authentication, and customer support,</li>
          <li>monitor performance, detect abuse, debug failures, and improve reliability and safety,</li>
          <li>comply with legal obligations, enforce agreements, and protect rights and safety, and</li>
          <li>communicate with customers, prospects, and authorized users about the Service.</li>
        </ul>
        <p>
          Where applicable data protection law requires a legal basis, we generally rely on performance of a contract, legitimate
          interests, legal obligations, and consent where required.
        </p>
      </LegalSection>

      <LegalSection title="5. AI, telephony, and call handling">
        <p>
          BookedOnCall is built around AI-assisted call handling and related workflows. That means information you or your callers provide
          may be processed by telephony providers, speech systems, large language model providers, scheduling systems, messaging systems,
          and other infrastructure required to provide the configured workflow.
        </p>
        <p>
          Customers are responsible for configuring lawful notices, recording disclosures, consent flows, and human review processes
          appropriate to their business. BookedOnCall does not guarantee that every automated classification, transcript, or summary will
          be complete or error-free.
        </p>
      </LegalSection>

      <LegalSection title="6. How we disclose information">
        <p>We may disclose information:</p>
        <ul className="list-disc pl-6">
          <li>to service providers and subprocessors that help operate hosting, security, authentication, payments, communications, AI processing, and support,</li>
          <li>to customer-authorized integrations or downstream systems when the customer enables those connections,</li>
          <li>to comply with law, legal process, or lawful requests from public authorities,</li>
          <li>to enforce contracts, respond to claims, or protect rights, property, safety, or security, and</li>
          <li>in connection with a financing, merger, acquisition, reorganization, or sale of assets, subject to customary confidentiality safeguards.</li>
        </ul>
        <p>
          We do not disclose customer service data to unrelated third parties for their own independent marketing use.
        </p>
      </LegalSection>

      <LegalSection title="7. Retention">
        <p>
          We retain information for as long as reasonably necessary to provide the Service, maintain security and audit records, satisfy
          contractual commitments, resolve disputes, comply with legal obligations, and enforce our agreements. Retention periods vary by
          data type, account status, product configuration, and applicable law.
        </p>
        <p>
          We may also retain limited backup, log, and security data for a longer period where needed for disaster recovery, fraud
          prevention, incident investigation, or legal compliance.
        </p>
      </LegalSection>

      <LegalSection title="8. Security">
        <p>
          We use administrative, technical, and organizational measures designed to protect information appropriate to the nature of the
          data and the risks presented. No method of transmission, storage, or processing is completely secure, and we cannot guarantee
          absolute security.
        </p>
      </LegalSection>

      <LegalSection title="9. Rights and choices">
        <p>
          Depending on applicable law and your relationship to the information, you may have rights to request access, correction,
          deletion, restriction, portability, or objection to certain processing. You may also have the right to appeal a denial where
          local law provides that option.
        </p>
        <p>
          We may need to verify your identity, authority, and the scope of the request before acting on it. Some requests may be limited
          where the information is needed to provide the Service, protect security, comply with law, or establish, exercise, or defend
          legal claims.
        </p>
      </LegalSection>

      <LegalSection title="10. International processing">
        <p>
          BookedOnCall and its service providers may process information in the United States and other countries where we or our
          providers operate. Those locations may have data protection laws that differ from those in your jurisdiction.
        </p>
        <p>
          Where required, we use contractual, technical, and organizational safeguards designed to support lawful cross-border processing.
        </p>
      </LegalSection>

      <LegalSection title="11. Children&apos;s privacy">
        <p>
          The Service is designed for business use and is not directed to children. We do not knowingly collect personal information from
          children in circumstances where such collection is prohibited by law.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot; date above. Material changes
          may also be communicated through the website, the customer portal, or other reasonable means.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact">
        <p>
          Privacy questions, rights requests, and service data inquiries can be sent to{" "}
          <a href={`mailto:${siteConfig.privacyEmail}`} className="font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.privacyEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}

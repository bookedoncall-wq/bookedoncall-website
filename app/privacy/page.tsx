import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "BookedOnCall privacy information for website visitors, setup requests, owners, callers, AI-assisted calls, recordings, messages, connected tools, and support.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <LegalPageShell
      currentPath="/privacy"
      title="Privacy Policy"
      description="This policy explains how BookedOnCall collects, uses, discloses, retains, and protects information through the website, customer app, AI-assisted call handling, connected tools, support, and billing."
      summaryItems={[
        {
          title: "We collect what the service needs",
          body:
            "That can include account details, setup details, caller intake, call metadata, recordings or transcripts when enabled, summaries, connected-tool metadata, billing records, and website logs.",
        },
        {
          title: "Calls may involve AI and recording",
          body:
            "When a business uses BookedOnCall, caller information may be processed by AI-assisted call handling, speech, telephony, scheduling, messaging, and support systems.",
        },
        {
          title: "Owners control customer workflows",
          body:
            "Our customers decide how their business uses the service, including service rules, notices, consent posture, connected tools, and caller follow-up.",
        },
        {
          title: "Rights depend on role and location",
          body:
            "Depending on applicable law, you may request access, correction, deletion, portability, restriction, objection, opt-out, or appeal, subject to verification and legal limits.",
        },
      ]}
    >
      <LegalSection title="1. Scope">
        <p>
          This Privacy Policy applies to bookedoncall.com, the BookedOnCall customer app, setup and contact forms, AI-assisted call
          handling, connected tools, support, billing, and related operations.
        </p>
        <p>
          This policy does not replace a separate written customer agreement, Data Processing Addendum, or other contract. If a separate
          agreement governs a specific processing relationship, that agreement controls to the extent of any conflict.
        </p>
      </LegalSection>

      <LegalSection title="2. Our role">
        <p>
          For website visitors, prospects, account administration, billing, security, fraud prevention, and legal compliance, BookedOnCall
          generally acts as an independent business or controller. For personal information that a customer routes through the Service for
          that customer&apos;s business, BookedOnCall generally acts as a service provider or processor on the customer&apos;s behalf.
        </p>
        <p>
          If you are a caller or end customer of a business that uses BookedOnCall, that business is usually responsible for deciding why
          and how your information is processed. You may contact that business directly for questions about its services, notices,
          appointments, prices, or legal basis for contacting you.
        </p>
      </LegalSection>

      <LegalSection title="3. Information we collect">
        <p>We may collect or receive these categories of information:</p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Contact and account details:</strong> names, business names, email addresses, phone numbers, billing contacts, login
            details, account roles, and support contacts.
          </li>
          <li>
            <strong>Business setup information:</strong> trade, services offered, service areas, hours, emergency rules, escalation paths,
            pricing guidance, dispatch preferences, fallback contacts, calendars, connected tools, and caller instructions.
          </li>
          <li>
            <strong>Call and message information:</strong> caller names, callback numbers, job addresses, requested services, job details,
            urgency signals, call metadata, recordings if enabled, transcripts, summaries, outcomes, notes, and follow-up status.
          </li>
          <li>
            <strong>Connected-tool metadata:</strong> calendar availability, scheduling identifiers, CRM references, message delivery
            status, authentication status, integration settings, and related workflow records.
          </li>
          <li>
            <strong>Billing and commercial records:</strong> plan, subscription status, invoices, payment processor metadata, usage
            records, included minutes, overage data, taxes, credits, and support records.
          </li>
          <li>
            <strong>Website, device, and security data:</strong> IP address, browser and device details, pages viewed, referring pages,
            timestamps, form submissions, cookies or similar technologies, logs, error reports, abuse signals, and security telemetry.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Sources of information">
        <p>We collect information directly from you, automatically from your use of the website or Service, and from sources such as:</p>
        <ul className="list-disc pl-6">
          <li>customers, callers, leads, and message recipients who interact with configured workflows,</li>
          <li>customer-authorized calendars, CRMs, schedulers, phone systems, messaging systems, and other connected tools,</li>
          <li>payment processors, authentication providers, telephony providers, AI and speech providers, hosting providers, and support tools, and</li>
          <li>public or business sources that help us respond to sales, support, security, or legal requests.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. How we use information">
        <p>We use information to:</p>
        <ul className="list-disc pl-6">
          <li>provide, operate, secure, monitor, troubleshoot, and support the Service,</li>
          <li>answer calls, disclose assistant behavior, capture job details, summarize conversations, and route next steps,</li>
          <li>support callback, owner-review, scheduling, messaging, and connected-tool workflows selected by customers,</li>
          <li>maintain accounts, authentication, billing, subscriptions, usage limits, and customer support,</li>
          <li>detect abuse, investigate incidents, debug failures, prevent fraud, enforce agreements, and protect rights and safety,</li>
          <li>improve reliability, product quality, analytics, training, and operational processes, and</li>
          <li>comply with law and respond to lawful requests.</li>
        </ul>
        <p>
          Where applicable law requires a legal basis, we generally rely on performance of a contract, legitimate interests, legal
          obligations, consent where required, and documented customer instructions for processor activities.
        </p>
      </LegalSection>

      <LegalSection title="6. AI-assisted call handling">
        <p>
          BookedOnCall is built around AI-assisted call handling. Information provided by owners, callers, and connected systems may be
          processed by telephony, speech, AI, scheduling, messaging, hosting, analytics, support, and security systems needed to provide
          the selected workflow.
        </p>
        <p>
          We use human review, redaction, logs, and support processes where appropriate, but automated classifications, transcripts,
          summaries, and suggested next steps may be incomplete or incorrect. Customers remain responsible for notices, consent,
          configuration, business decisions, and human review appropriate to their business.
        </p>
      </LegalSection>

      <LegalSection title="7. Cookies and analytics">
        <p>
          We may use cookies, tags, pixels, local storage, analytics tools, and similar technologies to operate the website, remember
          preferences, understand traffic, measure marketing performance, secure the Service, and improve user experience.
        </p>
        <p>
          You can use browser settings to limit cookies. Some website or Service features may not work properly if cookies or similar
          technologies are blocked.
        </p>
      </LegalSection>

      <LegalSection title="8. How we disclose information">
        <p>We may disclose information:</p>
        <ul className="list-disc pl-6">
          <li>to service providers and subprocessors that help with hosting, security, authentication, payments, communications, AI processing, analytics, and support,</li>
          <li>to customer-authorized tools such as calendars, schedulers, CRMs, messaging systems, or billing systems,</li>
          <li>to customers and authorized users of an account, including call summaries, caller details, setup status, and support records,</li>
          <li>to comply with law, legal process, regulator requests, subpoenas, or lawful public authority requests,</li>
          <li>to enforce agreements, recover amounts owed, investigate abuse, respond to claims, or protect rights, property, safety, and security, and</li>
          <li>in connection with financing, merger, acquisition, reorganization, bankruptcy, or sale of assets, subject to reasonable safeguards.</li>
        </ul>
        <p>
          We do not sell customer service data for money. We also do not disclose customer service data to unrelated third parties for
          their own independent marketing use. If future advertising or analytics practices require an opt-out under applicable law, we
          will provide the required notice and control.
        </p>
      </LegalSection>

      <LegalSection title="9. Retention">
        <p>
          We retain information for as long as reasonably necessary to provide the Service, maintain security and audit records, support
          customers, resolve disputes, comply with law, enforce agreements, and support backup or disaster recovery. Retention periods vary
          by data type, account status, product configuration, customer agreement, and applicable law.
        </p>
        <p>
          Unless a customer agreement or product setting says otherwise, our default goal is to keep normalized call records, summaries,
          and workflow history only as long as needed for customer review and service operation; keep raw provider payloads and temporary
          support artifacts for shorter periods where practical; and retain limited billing, security, audit, deletion, and legal records
          as needed for compliance and dispute protection.
        </p>
      </LegalSection>

      <LegalSection title="10. Security">
        <p>
          We use administrative, technical, and organizational measures designed to protect information appropriate to the nature of the
          data and the risks presented. Measures may include access controls, authentication, encryption in transit, logging, monitoring,
          redaction, vendor review, backups, and incident response processes.
        </p>
        <p>
          No method of transmission, storage, or processing is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="11. Your choices and rights">
        <p>
          Depending on your location and relationship to the information, you may have rights to request access, correction, deletion,
          portability, restriction, objection, opt-out of certain processing, or appeal of a denied request. You may also be able to opt
          out of marketing communications or text messages by following instructions in those messages.
        </p>
        <p>
          We may need to verify your identity, authority, account relationship, and request scope before acting. Some requests may be
          limited where information is needed to provide the Service, protect security, comply with law, honor another person&apos;s rights,
          complete a transaction, maintain audit records, or establish, exercise, or defend legal claims.
        </p>
      </LegalSection>

      <LegalSection title="12. California, Colorado, and other state privacy notices">
        <p>
          Some U.S. state privacy laws provide additional rights and notice requirements. We use the categories above to describe the
          personal information we collect, the sources of that information, the purposes of use, and the categories of recipients.
        </p>
        <p>
          You may submit privacy requests using the contact below. We will not discriminate against you for exercising rights that apply
          to you. Authorized-agent requests must include proof of authority and may require direct verification with the individual.
        </p>
      </LegalSection>

      <LegalSection title="13. International processing">
        <p>
          BookedOnCall and its service providers may process information in the United States and other countries where we or our
          providers operate. Those locations may have data protection laws that differ from those in your jurisdiction.
        </p>
        <p>
          Where required, we use contractual, technical, and organizational safeguards designed to support lawful cross-border processing.
        </p>
      </LegalSection>

      <LegalSection title="14. Children">
        <p>
          The Service is designed for business use and is not directed to children. We do not knowingly collect personal information from
          children in circumstances where such collection is prohibited by law.
        </p>
      </LegalSection>

      <LegalSection title="15. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot; date above. Material changes
          may also be communicated through the website, customer app, or other reasonable means.
        </p>
      </LegalSection>

      <LegalSection title="16. Contact">
        <p>
          Privacy questions, rights requests, and service data inquiries can be sent to{" "}
          <a href={`mailto:${siteConfig.privacyEmail}`} className="break-all font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.privacyEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}

import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Data Processing Addendum",
  description:
    "BookedOnCall data processing addendum covering customer data, security measures, subprocessors, and processor obligations.",
  path: "/dpa",
})

export default function DpaPage() {
  return (
    <LegalPageShell
      currentPath="/dpa"
      title="Data Processing Addendum"
      description="This DPA is intended to support customer review of BookedOnCall as a processor of customer personal data in connection with the service."
      summaryItems={[
        {
          title: "Controller / processor split",
          body:
            "Customers generally act as controllers for the business and caller data they submit or route through the service. BookedOnCall acts as a processor when handling that data on the customer’s behalf.",
        },
        {
          title: "Processing is instruction-bound",
          body:
            "BookedOnCall processes customer personal data to provide the service, maintain security, support customers, and comply with documented instructions and applicable law.",
        },
        {
          title: "Security and subprocessors matter",
          body:
            "BookedOnCall uses security measures appropriate to the service and may engage subprocessors for infrastructure, communications, authentication, AI processing, and other operational needs.",
        },
        {
          title: "Deletion and assistance are included",
          body:
            "The DPA covers deletion or return at the end of service, breach notification, and reasonable assistance with data subject requests and other controller obligations.",
        },
      ]}
    >
      <LegalSection title="1. Scope and incorporation">
        <p>
          This Data Processing Addendum (<strong>DPA</strong>) applies to the extent BookedOnCall processes Customer Personal Data on behalf
          of a customer in connection with the Service and applicable data protection law requires such terms.
        </p>
        <p>
          This DPA forms part of the applicable customer agreement with BookedOnCall, including the Terms of Service or any order form,
          statement of work, or other written commercial agreement. If there is a conflict between this DPA and the underlying agreement
          with respect to data protection matters, this DPA controls to that extent.
        </p>
      </LegalSection>

      <LegalSection title="2. Roles">
        <p>
          As between the parties, the customer acts as the controller or business for Customer Personal Data processed through the Service,
          and BookedOnCall acts as a processor or service provider solely on the customer&apos;s behalf, except to the extent BookedOnCall acts
          as an independent controller for account management, billing, security, fraud prevention, legal compliance, or other processing
          that is outside the scope of customer instructions.
        </p>
      </LegalSection>

      <LegalSection title="3. Processing details">
        <p>Subject matter: AI-assisted call handling, call routing, summaries, scheduling support, messaging workflows, account support, and related service operations.</p>
        <p>Duration: For the term of the customer&apos;s use of the Service, plus any limited retention period required for backups, legal compliance, security, or dispute resolution.</p>
        <p>Nature and purpose: Receiving, storing, organizing, redacting, transmitting, analyzing, and otherwise processing data needed to provide the Service and support the customer&apos;s configured workflows.</p>
        <p>Categories of data subjects: Customer personnel, callers, leads, customers, prospects, vendors, and other individuals whose data the customer submits or routes through the Service.</p>
        <p>Categories of personal data: Contact details, call metadata, caller intake details, service addresses, job descriptions, communication content, transcripts, summaries, recordings if enabled, integration identifiers, and related workflow records.</p>
      </LegalSection>

      <LegalSection title="4. Customer instructions">
        <p>
          BookedOnCall will process Customer Personal Data only on the customer&apos;s documented instructions, including the customer&apos;s
          configuration of the Service, support requests, written directions, and the underlying agreement, unless otherwise required by
          applicable law. If BookedOnCall believes an instruction violates applicable law, BookedOnCall may notify the customer and
          suspend the affected processing.
        </p>
        <p>
          The customer is responsible for ensuring that its instructions, configuration, notices, consents, and use of the Service comply
          with applicable data protection law.
        </p>
      </LegalSection>

      <LegalSection title="5. Confidentiality">
        <p>
          BookedOnCall will ensure that personnel authorized to process Customer Personal Data are subject to confidentiality obligations
          and receive appropriate access limitations for the role they perform.
        </p>
      </LegalSection>

      <LegalSection title="6. Security measures">
        <p>
          BookedOnCall will implement and maintain reasonable administrative, technical, and organizational measures designed to protect
          Customer Personal Data against unauthorized or unlawful processing and against accidental loss, destruction, damage, alteration,
          or disclosure.
        </p>
        <p>Those measures are designed to include, as appropriate to the service and risk:</p>
        <ul className="list-disc pl-6">
          <li>access controls and least-privilege practices,</li>
          <li>authentication and credential management,</li>
          <li>encryption in transit and other network protections where appropriate,</li>
          <li>service logging, monitoring, and incident investigation support,</li>
          <li>backup and recovery controls appropriate to the platform, and</li>
          <li>change-management and vendor management processes appropriate to the service.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Security incidents">
        <p>
          BookedOnCall will notify the customer without undue delay after becoming aware of a confirmed security incident involving
          Customer Personal Data processed under this DPA. BookedOnCall may provide information in phases as it becomes available and will
          take reasonable steps to investigate, contain, and mitigate the incident.
        </p>
      </LegalSection>

      <LegalSection title="8. Subprocessors">
        <p>
          The customer authorizes BookedOnCall to use subprocessors that are reasonably required to operate the Service, including
          providers for hosting, storage, authentication, communications, AI processing, payments, analytics, and customer-authorized
          integrations.
        </p>
        <p>
          BookedOnCall will remain responsible for the performance of its subprocessors to the extent required by applicable law and will
          impose data protection obligations on subprocessors that are materially protective of Customer Personal Data.
        </p>
      </LegalSection>

      <LegalSection title="9. Assistance with controller obligations">
        <p>
          Taking into account the nature of processing and the information available to BookedOnCall, BookedOnCall will provide
          commercially reasonable assistance to help the customer respond to data subject requests, regulator inquiries, security reviews,
          and other controller obligations under applicable data protection law.
        </p>
        <p>
          Where the request requires substantial time or expense beyond standard support, BookedOnCall may charge reasonable fees for that
          assistance.
        </p>
      </LegalSection>

      <LegalSection title="10. Deletion and return">
        <p>
          Upon termination or expiration of the Service, BookedOnCall will delete or return Customer Personal Data in its possession or
          control, unless retention is required by law, necessary for security or audit purposes, or maintained in backups and archives
          subject to ordinary retention and access controls.
        </p>
      </LegalSection>

      <LegalSection title="11. Audit and information rights">
        <p>
          Upon reasonable written request, BookedOnCall will make available information reasonably necessary to demonstrate compliance with
          this DPA. If that information is insufficient, the parties may cooperate on a reasonable audit process that is limited in scope,
          scheduled in advance, and subject to confidentiality, security, and operational safeguards.
        </p>
      </LegalSection>

      <LegalSection title="12. International transfers">
        <p>
          If Customer Personal Data is transferred across borders in circumstances where applicable law requires a transfer mechanism, the
          parties will cooperate in good faith to implement an appropriate mechanism and reasonable supplementary measures where needed.
        </p>
      </LegalSection>

      <LegalSection title="13. Liability and order of precedence">
        <p>
          Liability under this DPA is subject to the liability limitations and exclusions in the underlying agreement, unless applicable
          law requires otherwise. This DPA supplements, and does not replace, any broader confidentiality, security, or commercial terms in
          the underlying agreement.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <p>
          DPA questions, diligence requests, and processor-related inquiries can be sent to{" "}
          <a href={`mailto:${siteConfig.legalEmail}`} className="font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.legalEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}

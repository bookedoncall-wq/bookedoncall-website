import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Data Processing Addendum",
  description:
    "BookedOnCall data processing addendum for customer personal data, security measures, subprocessors, deletion, assistance, and international transfers.",
  path: "/dpa",
})

export default function DpaPage() {
  return (
    <LegalPageShell
      currentPath="/dpa"
      title="Data Processing Addendum"
      description="This DPA supports customer diligence when BookedOnCall processes personal data for a customer through AI-assisted call handling, setup, connected tools, support, and billing."
      summaryItems={[
        {
          title: "Customer instructions control",
          body:
            "Customers generally decide why and how caller and business data is processed. BookedOnCall processes that data to provide the service and follow documented instructions.",
        },
        {
          title: "Call data is in scope",
          body:
            "The DPA covers caller details, call metadata, transcripts, summaries, recordings if enabled, connected-tool metadata, and workflow records processed for the customer.",
        },
        {
          title: "Subprocessors support operations",
          body:
            "BookedOnCall may use subprocessors for hosting, authentication, communications, AI and speech processing, payments, analytics, support, and customer-authorized integrations.",
        },
        {
          title: "Deletion and assistance are included",
          body:
            "The DPA covers security incidents, reasonable assistance, deletion or return, audit information, and international transfer cooperation.",
        },
      ]}
    >
      <LegalSection title="1. Scope and incorporation">
        <p>
          This Data Processing Addendum (<strong>DPA</strong>) applies to the extent BookedOnCall processes Customer Personal Data on
          behalf of a customer in connection with the Service and applicable data protection law requires data processing terms.
        </p>
        <p>
          This DPA forms part of the applicable customer agreement with BookedOnCall, including the Terms of Service, order form,
          statement of work, or other written commercial agreement. If this DPA conflicts with the underlying agreement on data protection
          matters, this DPA controls to that extent.
        </p>
      </LegalSection>

      <LegalSection title="2. Definitions">
        <p>
          <strong>Customer Personal Data</strong> means personal data, personal information, or similar regulated information that a
          customer submits to the Service or causes the Service to process on the customer&apos;s behalf.
        </p>
        <p>
          <strong>Data Protection Laws</strong> means privacy, data protection, and data security laws that apply to the parties and the
          processing at issue, which may include U.S. state privacy laws, GDPR-like laws, and other similar laws.
        </p>
        <p>
          Terms such as controller, processor, business, service provider, personal data, personal information, process, and subprocessor
          have the meanings given to them under applicable Data Protection Laws.
        </p>
      </LegalSection>

      <LegalSection title="3. Roles">
        <p>
          As between the parties, the customer is the controller or business for Customer Personal Data processed through the Service, and
          BookedOnCall is the processor or service provider acting on the customer&apos;s behalf, except where BookedOnCall processes
          information as an independent controller for account administration, billing, security, fraud prevention, legal compliance, or
          other processing outside the customer&apos;s instructions.
        </p>
      </LegalSection>

      <LegalSection title="4. Processing details">
        <p>
          <strong>Subject matter:</strong> AI-assisted call handling, call routing, summaries, scheduling support, messaging support,
          account setup, customer app access, billing, support, security, and related service operations.
        </p>
        <p>
          <strong>Duration:</strong> the term of the customer&apos;s use of the Service, plus limited retention needed for backups, security,
          audit, legal compliance, dispute resolution, and wind-down.
        </p>
        <p>
          <strong>Nature and purpose:</strong> collecting, receiving, recording, transcribing, storing, organizing, redacting, analyzing,
          transmitting, deleting, and otherwise processing data needed to provide and support the Service.
        </p>
        <p>
          <strong>Data subjects:</strong> customer personnel, callers, leads, prospects, customers, vendors, service recipients, and other
          individuals whose data the customer submits or routes through the Service.
        </p>
        <p>
          <strong>Personal data categories:</strong> contact details, call metadata, callback numbers, service addresses, job details,
          communication content, recordings if enabled, transcripts, summaries, urgency or service classifications, connected-tool
          identifiers, billing metadata, and workflow records.
        </p>
      </LegalSection>

      <LegalSection title="5. Customer instructions and compliance">
        <p>
          BookedOnCall will process Customer Personal Data only on documented customer instructions, including the customer&apos;s account
          setup, product configuration, support requests, written directions, and the underlying agreement, unless applicable law requires
          otherwise. If BookedOnCall believes an instruction violates applicable law, BookedOnCall may notify the customer and suspend the
          affected processing.
        </p>
        <p>
          The customer is responsible for the lawfulness of its instructions, service configuration, caller notices, recording consent,
          text-message consent, employee or contractor notices, connected-tool permissions, and use of the Service.
        </p>
      </LegalSection>

      <LegalSection title="6. Service provider restrictions">
        <p>
          To the extent U.S. state privacy laws apply, BookedOnCall will not sell Customer Personal Data, retain, use, or disclose
          Customer Personal Data outside the business purposes of providing the Service, or combine Customer Personal Data with personal
          information from other sources except as permitted by applicable law and the customer agreement.
        </p>
        <p>
          Where Google API or Workspace data is processed for a customer-authorized integration, BookedOnCall will use and transfer that
          data only for the disclosed Service purpose and in accordance with the Google API Services User Data Policy, including Limited
          Use requirements where applicable.
        </p>
      </LegalSection>

      <LegalSection title="7. Confidentiality and personnel">
        <p>
          BookedOnCall will ensure that personnel authorized to process Customer Personal Data are subject to confidentiality obligations
          and access limitations appropriate to their role.
        </p>
      </LegalSection>

      <LegalSection title="8. Security measures">
        <p>
          BookedOnCall will implement and maintain reasonable administrative, technical, and organizational measures designed to protect
          Customer Personal Data against unauthorized or unlawful processing and accidental loss, destruction, damage, alteration, or
          disclosure.
        </p>
        <p>Those measures are designed to include, as appropriate to the Service and risk:</p>
        <ul className="list-disc pl-6">
          <li>access controls, authentication, and least-privilege practices,</li>
          <li>credential management and separation of development and production secrets,</li>
          <li>encryption in transit and other network protections where appropriate,</li>
          <li>logging, monitoring, redaction, and incident investigation support,</li>
          <li>backup, recovery, retention, and deletion controls appropriate to the platform, and</li>
          <li>change-management, vendor review, and support-access processes appropriate to the Service.</li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Security incidents">
        <p>
          BookedOnCall will notify the customer without undue delay after becoming aware of a confirmed security incident involving
          Customer Personal Data processed under this DPA. Notice may be provided in phases as information becomes available. BookedOnCall
          will take reasonable steps to investigate, contain, mitigate, and document the incident.
        </p>
      </LegalSection>

      <LegalSection title="10. Subprocessors">
        <p>
          The customer authorizes BookedOnCall to use subprocessors reasonably required to operate the Service. Subprocessor categories
          may include hosting and cloud infrastructure, database and storage, authentication, payment processing, email delivery, text
          messaging, telephony and voice, AI and speech processing, analytics, security, logging, support, and customer-authorized
          calendar, scheduling, CRM, or billing integrations.
        </p>
        <p>
          Not every category applies to every customer. A provider is used only when needed for the Service, selected support operations,
          or an integration or feature enabled for the customer&apos;s account. Customer-authorized integrations may include services such as
          Google Calendar or Jobber when the customer connects or approves that workflow.
        </p>
        <p>
          BookedOnCall will remain responsible for subprocessor performance to the extent required by applicable law and will impose data
          protection obligations on subprocessors that are materially protective of Customer Personal Data.
        </p>
        <p>
          Upon request, BookedOnCall will provide commercially reasonable information about current subprocessor categories and any
          specific subprocessors required for the customer&apos;s enabled Service configuration. BookedOnCall may update subprocessors from
          time to time and will provide reasonable notice of material subprocessor changes through the website, customer app, email, or
          another reasonable channel where required by the customer agreement or applicable law.
        </p>
      </LegalSection>

      <LegalSection title="11. Assistance with rights requests and compliance">
        <p>
          Taking into account the nature of processing and the information available to BookedOnCall, BookedOnCall will provide
          commercially reasonable assistance to help the customer respond to data subject requests, regulator inquiries, security reviews,
          data protection impact assessments, and other controller obligations under applicable Data Protection Laws.
        </p>
        <p>
          Where assistance requires substantial time or expense beyond standard support, BookedOnCall may charge reasonable fees.
        </p>
      </LegalSection>

      <LegalSection title="12. Deletion and return">
        <p>
          Upon termination or expiration of the Service, BookedOnCall will delete or return Customer Personal Data in its possession or
          control according to the customer agreement, unless retention is required by law, necessary for security or audit purposes,
          needed to resolve disputes, or maintained in backups or archives subject to ordinary retention and access controls.
        </p>
        <p>
          Deletion or return may be paused or narrowed when a legal hold, security investigation, billing dispute, required recordkeeping
          obligation, or other lawful exception applies. BookedOnCall will keep retained data limited to the scope reasonably needed for
          that exception.
        </p>
      </LegalSection>

      <LegalSection title="13. Audit and information rights">
        <p>
          Upon reasonable written request, BookedOnCall will make available information reasonably necessary to demonstrate compliance
          with this DPA. If that information is insufficient, the parties may cooperate on a reasonable audit process that is limited in
          scope, scheduled in advance, and subject to confidentiality, security, and operational safeguards.
        </p>
      </LegalSection>

      <LegalSection title="14. International transfers">
        <p>
          If Customer Personal Data is transferred across borders in circumstances where applicable law requires a transfer mechanism, the
          parties will cooperate in good faith to implement an appropriate mechanism and reasonable supplementary measures where needed.
        </p>
      </LegalSection>

      <LegalSection title="15. Regulated data">
        <p>
          The Service is not designed for protected health information or other highly regulated data unless BookedOnCall signs a
          separate written agreement that expressly permits that processing. Customers must not submit protected health information,
          payment-card data, government identification numbers, or other sensitive regulated data unless the parties have agreed in
          writing to the required safeguards.
        </p>
      </LegalSection>

      <LegalSection title="16. Liability and order of precedence">
        <p>
          Liability under this DPA is subject to the liability limitations and exclusions in the underlying agreement, unless applicable
          law requires otherwise. This DPA supplements and does not replace broader confidentiality, security, or commercial terms in the
          underlying agreement.
        </p>
      </LegalSection>

      <LegalSection title="17. Contact">
        <p>
          DPA questions, diligence requests, and processor-related inquiries can be sent to{" "}
          <a href={`mailto:${siteConfig.legalEmail}`} className="break-all font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.legalEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}

import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Data Processing Agreement",
  description: "BookedOnCall Data Processing Agreement. How we handle data processing on behalf of our customers.",
  alternates: { canonical: `${siteConfig.url}/dpa` },
}

export default function DpaPage() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Data Processing Agreement</h1>
          <p className="text-sm text-slate-500">Last updated: March 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-700">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Scope and Purpose</h2>
            <p className="leading-relaxed">
              This Data Processing Agreement (&quot;DPA&quot;) forms part of the Terms of Service between BookedOnCall (&quot;Processor,&quot; &quot;we,&quot; &quot;us&quot;) and the customer (&quot;Controller,&quot; &quot;you&quot;) who subscribes to the BookedOnCall platform.
            </p>
            <p className="leading-relaxed mt-3">
              This DPA applies to all personal data that BookedOnCall processes on your behalf in connection with providing the Service, including but not limited to caller information, call recordings, transcripts, appointment details, and any data accessed through third-party integrations you have authorized.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Roles and Responsibilities</h2>
            <p className="leading-relaxed">
              You are the Controller of the personal data processed through the Service. You determine the purposes and means of processing. BookedOnCall acts as a Processor, processing personal data only on your documented instructions and solely for the purpose of providing the Service.
            </p>
            <p className="leading-relaxed mt-3">
              You are responsible for ensuring that you have a lawful basis for providing personal data to BookedOnCall, including obtaining any necessary consents from callers for call recording and AI-assisted processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Processing Details</h2>

            <h3 className="text-lg font-semibold text-slate-800 mt-5 mb-2">Categories of Data Subjects</h3>
            <p className="leading-relaxed">
              Callers to your business number, your employees or team members with account access, and third-party contacts referenced in scheduling or job management systems you have connected.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-5 mb-2">Types of Personal Data</h3>
            <p className="leading-relaxed">
              Names, phone numbers, addresses, email addresses, voice recordings, call transcripts, appointment and scheduling information, service requests, and any other information callers voluntarily provide during calls.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-5 mb-2">Processing Activities</h3>
            <p className="leading-relaxed">
              Receiving and answering inbound voice calls, transcribing call audio, qualifying leads, scheduling appointments, sending SMS confirmations, synchronizing data with connected third-party services (Jobber, Google Calendar), and generating call summaries and reports.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Sub-Processors</h2>
            <p className="leading-relaxed">
              BookedOnCall uses the following sub-processors to deliver the Service:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600">
              <li><strong>Twilio:</strong> Voice call handling, telephony infrastructure, and SMS delivery.</li>
              <li><strong>Google Cloud / Cloud infrastructure:</strong> Hosting, compute, and data storage.</li>
              <li><strong>Jobber:</strong> Job management data synchronization (only when you authorize the integration).</li>
              <li><strong>Google Calendar:</strong> Scheduling data synchronization (only when you authorize the integration).</li>
            </ul>
            <p className="leading-relaxed mt-4">
              We will inform you of any intended changes to sub-processors with reasonable advance notice. You may object to a new sub-processor by contacting us within 14 days of notification. If we cannot reasonably accommodate your objection, you may terminate the affected Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
            <p className="leading-relaxed">
              BookedOnCall implements appropriate technical and organizational measures to protect personal data against unauthorized access, alteration, disclosure, or destruction. These measures include encryption in transit (TLS) and at rest, access controls, regular security reviews, and employee training on data protection obligations.
            </p>
            <p className="leading-relaxed mt-3">
              In the event of a personal data breach, BookedOnCall will notify you without undue delay (and in any event within 72 hours of becoming aware of the breach) and provide sufficient information to enable you to meet your own breach notification obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Retention and Deletion</h2>
            <p className="leading-relaxed">
              BookedOnCall retains personal data processed on your behalf for the duration of the Service agreement and as needed to fulfill the purposes described in this DPA. Retention periods for specific data types (call recordings, transcripts, account data) depend on your enabled features, your configuration preferences, and applicable legal requirements.
            </p>
            <p className="leading-relaxed mt-3">
              Upon termination of the Service, BookedOnCall will delete or return all personal data processed on your behalf within a reasonable period, unless retention is required by applicable law. You may request deletion of specific records at any time through your account dashboard or by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Subject Rights</h2>
            <p className="leading-relaxed">
              BookedOnCall will assist you in responding to requests from data subjects exercising their rights under applicable data protection laws, including rights of access, rectification, erasure, restriction, portability, and objection. We will promptly inform you of any data subject request we receive directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Audits and Compliance</h2>
            <p className="leading-relaxed">
              BookedOnCall will make available to you all information reasonably necessary to demonstrate compliance with this DPA. Upon reasonable request and with reasonable advance notice, BookedOnCall will permit and contribute to audits conducted by you or an auditor you appoint, provided such audits do not unreasonably disrupt our operations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. International Transfers</h2>
            <p className="leading-relaxed">
              If personal data is transferred outside the jurisdiction in which it was collected, BookedOnCall will ensure that appropriate safeguards are in place, such as Standard Contractual Clauses or other legally recognized transfer mechanisms, to provide an adequate level of protection for the data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact</h2>
            <p className="leading-relaxed">
              For questions about this DPA or to exercise any rights described herein, please contact us at{" "}
              <a href="mailto:privacy@bookedoncall.com" className="text-amber-600 hover:underline">
                privacy@bookedoncall.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </section>
  )
}

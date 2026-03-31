import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "BookedOnCall Privacy Policy — how we collect, use, and protect your data.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
}

export default function PrivacyPage() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-slate-500">Last updated: March 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-700">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              BookedOnCall (&quot;BookedOnCall,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI phone answering and appointment booking platform (the &quot;Service&quot;).
            </p>
            <p className="leading-relaxed mt-3">
              By using the Service, you consent to the practices described in this policy. If you do not agree with this policy, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Data We Collect</h2>
            <p className="leading-relaxed">We collect the following types of information:</p>

            <h3 className="text-lg font-semibold text-slate-800 mt-5 mb-2">Account Information</h3>
            <p className="leading-relaxed">
              When you create an account, we collect your name, email address, business name, phone number, service area, and billing information. This is necessary to provide and bill for the Service.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-5 mb-2">Call Data</h3>
            <p className="leading-relaxed">
              The Service records and transcribes inbound calls handled on your behalf. This includes the caller&apos;s phone number, the content of the conversation, any information provided by the caller (name, address, service requested), and the outcome of the call (booked, escalated, declined, etc.).
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-5 mb-2">Integration Data</h3>
            <p className="leading-relaxed">
              If you connect third-party services like Jobber or Google Calendar, we access data from those platforms as authorized by you — including calendar availability and existing job records.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-5 mb-2">Usage Data</h3>
            <p className="leading-relaxed">
              We automatically collect data about how you interact with our platform, including IP addresses, browser type, pages visited, features used, and session duration. This data is used to improve the Service and troubleshoot issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Data</h2>
            <p className="leading-relaxed">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600">
              <li>Provide, operate, and improve the Service</li>
              <li>Process payments and manage your subscription</li>
              <li>Answer calls and book appointments on your behalf</li>
              <li>Send you service-related SMS notifications and email summaries</li>
              <li>Respond to support requests and communications</li>
              <li>Monitor and analyze usage patterns to improve features</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraudulent or abusive activity</li>
            </ul>
            <p className="leading-relaxed mt-4">
              We do not sell your personal data or your callers&apos; data to third parties. We do not use call recordings or transcripts to train AI models for parties other than BookedOnCall.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your account data for as long as your account is active. After account closure, we retain data for up to 90 days before permanent deletion, unless a longer period is required by law.
            </p>
            <p className="leading-relaxed mt-3">
              Call recordings and transcripts are retained for 12 months by default and are accessible from your dashboard. You can delete individual call records at any time. After account closure, all call data is deleted within 90 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Third-Party Services</h2>
            <p className="leading-relaxed">
              BookedOnCall integrates with and relies on the following third-party service providers:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600">
              <li><strong>Twilio</strong> — Voice call handling and SMS delivery. Twilio processes call audio and metadata on our behalf.</li>
              <li><strong>Jobber</strong> — Job management integration. We access Jobber data only as explicitly authorized by you.</li>
              <li><strong>Google Calendar</strong> — Availability checking and appointment creation. We access Calendar data only as explicitly authorized via OAuth.</li>
              <li><strong>Stripe</strong> — Payment processing. We do not store payment card details; they are handled by Stripe.</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Each third-party provider has its own privacy policy. We encourage you to review those policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Caller Privacy</h2>
            <p className="leading-relaxed">
              When BookedOnCall answers a call on your behalf, the caller is speaking with an AI-powered automated service. Calls are recorded and transcribed to provide you with call summaries and to improve service quality.
            </p>
            <p className="leading-relaxed mt-3">
              <strong className="text-slate-900">Important — Call Recording Consent:</strong> U.S. states have different laws regarding call recording consent. Some states (including California, Connecticut, Florida, Illinois, Maryland, Massachusetts, Montana, New Hampshire, Pennsylvania, and Washington) require <strong>all-party consent</strong>, meaning every person on the call must be informed that the call is being recorded. Other states require only one-party consent. <strong>You are responsible for ensuring compliance with the call recording and AI disclosure laws in your state and the states where your callers are located.</strong>
            </p>
            <p className="leading-relaxed mt-3">
              BookedOnCall provides a configurable disclosure option at the start of calls. We strongly recommend enabling this disclosure, especially if you operate in or receive calls from two-party consent states. Failure to comply with applicable consent laws may result in legal liability for you as the business operator. BookedOnCall is not responsible for your compliance with local recording consent or AI disclosure requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights</h2>
            <p className="leading-relaxed">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
              <li><strong>Portability:</strong> Request a machine-readable copy of your data to transfer to another provider.</li>
              <li><strong>Objection:</strong> Object to certain types of processing, including direct marketing.</li>
            </ul>
            <p className="leading-relaxed mt-4">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:privacy@bookedoncall.com" className="text-amber-600 hover:underline">
                privacy@bookedoncall.com
              </a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Security</h2>
            <p className="leading-relaxed">
              We implement industry-standard technical and organizational measures to protect your data, including encryption in transit (TLS), encryption at rest, access controls, and regular security reviews. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a notice in your account dashboard. Your continued use of the Service after such changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-600 space-y-1">
              <p><strong className="text-slate-900">BookedOnCall</strong></p>
              <p>Email: <a href="mailto:privacy@bookedoncall.com" className="text-amber-600 hover:underline">privacy@bookedoncall.com</a></p>
              <p>Website: <a href="https://bookedoncall.com" className="text-amber-600 hover:underline">bookedoncall.com</a></p>
            </div>
          </section>

        </div>
      </div>
    </section>
  )
}

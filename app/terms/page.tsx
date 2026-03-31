import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "BookedOnCall Terms of Service. Read our terms before using the platform.",
  alternates: { canonical: `${siteConfig.url}/terms` },
}

export default function TermsPage() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-slate-500">Last updated: March 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-700">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using the BookedOnCall platform, website, or any related services (collectively, the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            <p className="leading-relaxed mt-3">
              BookedOnCall (&quot;BookedOnCall,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) reserves the right to modify these Terms at any time. We will provide notice of material changes by updating the &quot;Last updated&quot; date above. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Services</h2>
            <p className="leading-relaxed">
              BookedOnCall provides an AI-powered voice answering and appointment booking service designed for small trades businesses. The Service includes inbound call answering, lead qualification, appointment scheduling, SMS notifications, and integrations with third-party services including but not limited to Jobber, Google Calendar, and Twilio.
            </p>
            <p className="leading-relaxed mt-3">
              We reserve the right to modify, suspend, or discontinue any portion of the Service at any time with reasonable notice. We will not be liable for any modification, suspension, or discontinuation of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Account Registration</h2>
            <p className="leading-relaxed">
              To use the Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
            <p className="leading-relaxed mt-3">
              You must be at least 18 years old and have the legal authority to enter into these Terms on behalf of yourself or the business entity you represent. By creating an account, you represent and warrant that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Payment and Billing</h2>
            <p className="leading-relaxed">
              BookedOnCall offers subscription plans billed on a monthly basis. By subscribing, you authorize us to charge your payment method on a recurring basis. All fees are stated in US dollars and are non-refundable except as expressly set forth in these Terms.
            </p>
            <p className="leading-relaxed mt-3">
              If you exceed the included call minutes in your plan, overage charges will be billed at the rate specified in your plan at the end of each billing period. We provide usage-based alerts at projected threshold levels (typically at 50% and 80% of your included minutes) via your dashboard, email, and/or SMS to help you manage usage. These alerts are operational guidance and may not reflect final reconciled billing amounts.
            </p>
            <p className="leading-relaxed mt-3">
              If payment fails, we reserve the right to suspend your account until payment is received. We will attempt to notify you before suspension occurs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cancellation Policy</h2>
            <p className="leading-relaxed">
              You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of your current billing period. You will retain access to the Service until the end of the paid period. We do not provide refunds for partial months.
            </p>
            <p className="leading-relaxed mt-3">
              BookedOnCall may terminate or suspend your account if you violate these Terms or engage in fraudulent, abusive, or illegal activity. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Acceptable Use</h2>
            <p className="leading-relaxed">You agree not to use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600">
              <li>Violate any applicable federal, state, local, or international laws or regulations</li>
              <li>Transmit any unlawful, harmful, fraudulent, or deceptive content</li>
              <li>Impersonate any person or entity, or falsely represent your affiliation with a person or entity</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Attempt to gain unauthorized access to any portion of the Service or its related systems</li>
              <li>Use the Service for any purpose other than legitimate business call answering and scheduling</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Third-Party Integrations</h2>
            <p className="leading-relaxed">
              The Service integrates with third-party platforms including Jobber, Google Calendar, and Twilio. Your use of these third-party services is governed by their respective terms of service and privacy policies. BookedOnCall is not responsible for the availability, accuracy, or conduct of any third-party services.
            </p>
            <p className="leading-relaxed mt-3">
              By connecting third-party integrations, you authorize BookedOnCall to access and interact with those services on your behalf within the scope of the permissions you grant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by applicable law, BookedOnCall shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the Service.
            </p>
            <p className="leading-relaxed mt-3">
              BookedOnCall&apos;s total liability to you for all claims arising from or related to these Terms or the Service shall not exceed the amount you paid to BookedOnCall in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied. BookedOnCall does not warrant that the Service will be uninterrupted, error-free, or completely secure.
            </p>
            <p className="leading-relaxed mt-3">
              Without limiting the foregoing, BookedOnCall does not guarantee: (a) that every inbound call will be successfully answered or that all bookings will be completed without issue; (b) continuous or guaranteed uptime of the Service; (c) that emergency calls will be detected or escalated in every case; or (d) that the Service is a substitute for human judgment, a live receptionist, or professional emergency response. The Service is an AI-powered automation tool and should be used as one component of your business communication strategy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States and the state in which BookedOnCall is incorporated or registered at the time any dispute arises. The specific governing jurisdiction will be updated in these Terms upon formal incorporation. Any disputes arising under these Terms shall be resolved in the courts of the applicable jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@bookedoncall.com" className="text-amber-600 hover:underline">
                legal@bookedoncall.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </section>
  )
}

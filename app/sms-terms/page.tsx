import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "SMS Terms",
  description:
    "BookedOnCall SMS terms for text messages, consent, opt-out, HELP, message frequency, carrier charges, delivery limits, and privacy.",
  path: "/sms-terms",
})

export default function SmsTermsPage() {
  return (
    <LegalPageShell
      currentPath="/sms-terms"
      title="SMS Terms"
      description="These SMS Terms explain what to expect when you receive or opt into text messages from BookedOnCall or from a business using BookedOnCall."
      summaryItems={[
        {
          title: "Messages support service follow-up",
          body:
            "Texts may include setup messages, callback follow-up, appointment confirmations, reminders, service updates, support, billing, or account notices.",
        },
        {
          title: "Consent matters",
          body:
            "Businesses using BookedOnCall are responsible for having the consent required to text their customers, callers, employees, and contacts.",
        },
        {
          title: "You can opt out",
          body:
            "Reply STOP to opt out of supported SMS programs. Reply HELP for help where supported. Message and data rates may apply.",
        },
        {
          title: "Delivery is not guaranteed",
          body:
            "Carriers, phone settings, filtering, outages, and incorrect numbers can delay or prevent message delivery.",
        },
      ]}
    >
      <LegalSection title="1. Scope">
        <p>
          These SMS Terms apply to text messages sent by BookedOnCall and to messages sent by or for businesses that use BookedOnCall to
          support call handling, callback, appointment, setup, support, billing, or account workflows.
        </p>
      </LegalSection>

      <LegalSection title="2. Message types">
        <p>
          Depending on the account and workflow, messages may include setup instructions, verification, callback follow-up, appointment
          confirmations, reminders, scheduling updates, service updates, owner alerts, support responses, payment or billing notices,
          opt-out confirmations, and other service-related communications.
        </p>
        <p>
          BookedOnCall is not designed to send unrelated marketing blasts through customer accounts. Customers may not use BookedOnCall to
          send spam, deceptive messages, or messages without required consent.
        </p>
      </LegalSection>

      <LegalSection title="3. Consent and customer responsibility">
        <p>
          By providing a mobile number and opting into a text workflow, you authorize the applicable sender to send text messages to that
          number using automated or non-automated technology. Consent to receive marketing texts is not a condition of purchasing goods or
          services.
        </p>
        <p>
          Businesses that use BookedOnCall are responsible for collecting and documenting the consent required to text their customers,
          callers, employees, contractors, and other contacts, and for honoring opt-out requests.
        </p>
      </LegalSection>

      <LegalSection title="4. Opt-out and help">
        <p>
          Reply STOP to opt out of supported SMS programs. After you opt out, you may receive one final text confirming the opt-out.
          Reply HELP for help where supported. You may also contact{" "}
          <a href={`mailto:${siteConfig.supportEmail}`} className="break-all font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.supportEmail}
          </a>
          .
        </p>
        <p>
          Opting out of one SMS program may not opt you out of every communication from a business, especially where separate numbers,
          accounts, legal notices, or transactional communications are involved.
        </p>
      </LegalSection>

      <LegalSection title="5. Frequency, charges, and delivery">
        <p>
          Message frequency varies by account, workflow, and your interaction with the business. Message and data rates may apply. Mobile
          carriers are not liable for delayed or undelivered messages.
        </p>
        <p>
          Delivery is not guaranteed. Messages may be delayed or blocked by carriers, filtering systems, device settings, incorrect
          numbers, outages, or other conditions outside BookedOnCall&apos;s control.
        </p>
      </LegalSection>

      <LegalSection title="6. Privacy">
        <p>
          We handle information related to SMS according to the{" "}
          <a href="/privacy" className="font-semibold text-slate-900 underline underline-offset-4">
            Privacy Policy
          </a>
          . We do not sell SMS opt-in information for money or disclose it to unrelated third parties for their own independent marketing
          use.
        </p>
      </LegalSection>

      <LegalSection title="7. Changes">
        <p>
          We may update these SMS Terms from time to time. The &quot;Last updated&quot; date above reflects the latest revision. Continued use of
          SMS after changes become effective means you accept the updated terms.
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}

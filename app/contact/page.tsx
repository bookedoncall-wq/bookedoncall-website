import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Contact",
  description: "How to contact BookedOnCall for sales, support, privacy, legal, and DPA requests.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <LegalPageShell
      currentPath="/contact"
      title="Contact"
      description="Use the routes below to reach BookedOnCall for sales, support, privacy, and legal requests."
      summaryItems={[
        {
          title: "General and sales",
          body: `For product questions, demos, pricing, and commercial discussions, contact ${siteConfig.email}.`,
        },
        {
          title: "Customer support",
          body: `For account support, configuration questions, and operational help, contact ${siteConfig.supportEmail}.`,
        },
        {
          title: "Privacy requests",
          body: `For privacy rights requests, deletion inquiries, and data handling questions, contact ${siteConfig.privacyEmail}.`,
        },
        {
          title: "Legal and DPA",
          body: `For legal notices, vendor diligence, security questionnaires, and DPA requests, contact ${siteConfig.legalEmail}.`,
        },
      ]}
    >
      <LegalSection title="1. General and sales">
        <p>
          Product questions, demos, commercial inquiries, and general contact requests can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Customer support">
        <p>
          Existing customers who need help with setup, account access, integrations, billing questions, or operational issues can contact{" "}
          <a href={`mailto:${siteConfig.supportEmail}`} className="font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="3. Privacy">
        <p>
          Privacy rights requests, deletion requests, and questions about how BookedOnCall handles personal information can be sent to{" "}
          <a href={`mailto:${siteConfig.privacyEmail}`} className="font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.privacyEmail}
          </a>
          .
        </p>
        <p>
          To help us route the request quickly, include the business name, your role, the email address or phone number associated with
          the request, and the specific action you are requesting.
        </p>
      </LegalSection>

      <LegalSection title="4. Legal and DPA requests">
        <p>
          Legal notices, contract reviews, DPA requests, procurement paperwork, security questionnaires, and diligence requests can be
          sent to{" "}
          <a href={`mailto:${siteConfig.legalEmail}`} className="font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.legalEmail}
          </a>
          .
        </p>
        <p>
          If you are sending a formal notice, include your legal name, company name, reply contact details, the governing agreement if
          known, and any relevant deadline or requested response.
        </p>
      </LegalSection>

      <LegalSection title="5. Website and service locations">
        <p>
          Website:{" "}
          <a href={siteConfig.url} className="font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.url}
          </a>
        </p>
        <p>
          Customer app:{" "}
          <a href={siteConfig.appUrl} className="font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.appUrl}
          </a>
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}

import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/config/site"

export const metadata = buildPageMetadata({
  title: "Call Handling Notice",
  description:
    "BookedOnCall call handling notice for AI-assisted calls, recording, transcription, summaries, owner review, emergency limits, and caller choices.",
  path: "/call-handling-notice",
})

export default function CallHandlingNoticePage() {
  return (
    <LegalPageShell
      currentPath="/call-handling-notice"
      title="Call Handling Notice"
      description="This notice explains what callers, owners, and prospects should expect when a business uses BookedOnCall to answer or support calls."
      summaryItems={[
        {
          title: "Callers may speak with an assistant",
          body:
            "BookedOnCall helps businesses answer calls with an AI-assisted voice experience that collects details and routes the next step.",
        },
        {
          title: "Calls may be recorded or transcribed",
          body:
            "Calls may be monitored, recorded, transcribed, summarized, and reviewed where enabled or needed to provide and support the service.",
        },
        {
          title: "Businesses still make business decisions",
          body:
            "BookedOnCall can collect details and support booking or callback paths, but the business remains responsible for dispatch, pricing, service decisions, and customer follow-up.",
        },
        {
          title: "Not for emergencies",
          body:
            "BookedOnCall is not an emergency line, 911 service, safety hotline, or substitute for immediate human response.",
        },
      ]}
    >
      <LegalSection title="1. What callers may experience">
        <p>
          When you call a business that uses BookedOnCall, you may speak with an AI-assisted voice assistant instead of a human
          receptionist. The assistant may ask for your name, callback number, address, service need, urgency, preferred timing, and other
          details the business has configured for its call flow.
        </p>
        <p>
          Depending on the business&apos;s setup, the assistant may help request a callback, offer available appointment paths, route urgent
          items for owner review, or summarize the call for the business.
        </p>
        <p>
          If a caller prefers not to continue with the assistant, the business may configure BookedOnCall to take a message, request an
          owner callback, or route the caller to another contact path selected by the business.
        </p>
      </LegalSection>

      <LegalSection title="2. Recording, transcription, and summaries">
        <p>
          Calls may be monitored, recorded, transcribed, summarized, analyzed, or stored where enabled or where needed to provide,
          secure, support, troubleshoot, or improve the service. Call details may be shared with the business you contacted so it can
          follow up, schedule work, review quality, or handle support.
        </p>
        <p>
          If a call announcement or other notice says the call may be recorded or transcribed, continuing the call after that notice may
          be treated as consent where permitted by law. Some states, customers, or call flows may require stricter consent before
          recording or transcription can continue.
        </p>
        <p>
          If you do not want to continue with an AI-assisted, recorded, or transcribed call, you may hang up and contact the business
          through another path it provides. The business controls its own notices, consent requirements, fallback process, and customer
          follow-up.
        </p>
      </LegalSection>

      <LegalSection title="3. Booking and follow-up limits">
        <p>
          An appointment time, service window, price range, or next step discussed during a call may require owner confirmation, calendar
          review, payment review, or additional business approval. The business remains responsible for final dispatch, pricing, work
          acceptance, service-area decisions, customer communications, and any changes to appointments or jobs.
        </p>
      </LegalSection>

      <LegalSection title="4. Emergency and safety limits">
        <p>
          BookedOnCall is not a 911 service, emergency dispatch service, safety hotline, medical service, alarm system, or life-safety
          system. For emergencies, active hazards, gas leaks, fire, medical issues, violence, or situations requiring immediate help, call
          emergency services or the appropriate emergency number directly.
        </p>
      </LegalSection>

      <LegalSection title="5. Privacy and rights">
        <p>
          BookedOnCall handles information according to the{" "}
          <a href="/privacy" className="font-semibold text-slate-900 underline underline-offset-4">
            Privacy Policy
          </a>
          . If you are a caller for a business that uses BookedOnCall, that business usually controls the call workflow and may be the
          best first contact for service questions, appointment issues, pricing, notices, and privacy requests tied to that business.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p>
          Questions about this notice can be sent to{" "}
          <a href={`mailto:${siteConfig.legalEmail}`} className="break-all font-semibold text-slate-900 underline underline-offset-4">
            {siteConfig.legalEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}

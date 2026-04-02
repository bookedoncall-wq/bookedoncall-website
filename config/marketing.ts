export const faqEntries = [
  {
    question: "Does BookedOnCall always book appointments automatically?",
    answer:
      "No. Booking depends on the business configuration. BookedOnCall can capture leads and callbacks in every setup, and it can book when the business has enabled scheduling and connected a supported availability source."
  },
  {
    question: "What integrations are supported today?",
    answer:
      "BookedOnCall supports Jobber and Google Calendar integrations when the business connects and configures those accounts. The exact read and write behavior depends on the chosen scheduling provider and business settings."
  },
  {
    question: "What happens if a job is outside the service area or needs manual review?",
    answer:
      "The system can collect the caller details, flag the issue, and route the case for human follow-up instead of promising a booking that the business has not configured or approved."
  },
  {
    question: "What happens after checkout?",
    answer:
      "Checkout happens on the app domain. From there, the owner creates or signs in to an account, enters business basics, and lands in the dashboard with the starter service catalog and subscription attached."
  },
  {
    question: "How are extra minutes billed?",
    answer:
      "Plans include a monthly minute allowance. Additional minutes are billed at the published per-minute rate for the selected plan."
  }
] as const

export const homepageHighlights = [
  {
    title: "Answer missed calls without hiring a live receptionist",
    body: "BookedOnCall picks up inbound calls, asks structured intake questions, and records what happened in the owner dashboard."
  },
  {
    title: "Capture callbacks even when a job cannot be booked immediately",
    body: "If a request needs manual review, service-area confirmation, or human approval, the system can collect the contact details and hand the case back cleanly."
  },
  {
    title: "Use the integrations you already run",
    body: "Jobber and Google Calendar can be connected for supported scheduling flows instead of forcing a brand-new back office stack."
  }
] as const

export const workflowSteps = [
  {
    title: "A caller reaches your business number",
    body: "Your forwarded line rings into BookedOnCall instead of voicemail so inbound demand is captured while your team is on a job."
  },
  {
    title: "The assistant qualifies the request",
    body: "The system asks for the caller name, callback number, job details, and any intake data required by the configured service."
  },
  {
    title: "Availability is checked when scheduling is enabled",
    body: "BookedOnCall can check the configured provider and either offer a supported slot or capture a callback if the workflow needs a human."
  },
  {
    title: "The owner dashboard becomes the source of record",
    body: "Call summaries, booking outcomes, integration status, and business settings all live on the app side instead of being guessed from the marketing site."
  }
] as const

export const useCasePages = {
  plumbers: {
    title: "AI call answering for plumbing businesses",
    summary:
      "BookedOnCall helps plumbing companies catch emergency calls, after-hours callbacks, and routine booking requests without making promises the team has not configured.",
    bullets: [
      "Capture leak, clog, water heater, and diagnostic calls while crews are on site.",
      "Route emergency language for human review instead of relying on generic marketing promises.",
      "Use Jobber or Google Calendar scheduling when the plumbing business has connected and enabled that workflow."
    ]
  },
  hvac: {
    title: "AI call answering for HVAC companies",
    summary:
      "BookedOnCall helps HVAC shops answer heating and cooling calls, collect structured intake, and route maintenance or diagnostic work into the configured booking flow.",
    bullets: [
      "Handle tune-up, no-heat, and no-cool calls with structured intake.",
      "Collect callback details when the request needs dispatch review or manual slot confirmation.",
      "Start from a seeded HVAC starter service catalog in the owner dashboard."
    ]
  },
  electricians: {
    title: "AI call answering for electrical contractors",
    summary:
      "BookedOnCall helps electrical businesses answer inbound demand, qualify scope, and route riskier jobs toward manual review when that is the safer workflow.",
    bullets: [
      "Collect project details for panel, outlet, lighting, and troubleshooting calls.",
      "Avoid overpromising on emergency dispatch or job type support the business has not configured.",
      "Use the same owner dashboard to review leads, integrations, and business settings."
    ]
  }
} as const

export const integrationPages = {
  jobber: {
    title: "BookedOnCall + Jobber",
    summary:
      "BookedOnCall can use Jobber as a connected scheduling system for supported businesses. The business still owns how scheduling, follow-up, and manual review rules are configured.",
    bullets: [
      "Use Jobber-backed availability when the business selects Jobber as the scheduling provider.",
      "Keep connected-account state visible in the owner dashboard.",
      "Avoid claiming universal write-through behavior when a workflow still requires pending sync or human review."
    ]
  },
  "google-calendar": {
    title: "BookedOnCall + Google Calendar",
    summary:
      "BookedOnCall can check Google Calendar availability and write back supported bookings when a business has connected a supported calendar account.",
    bullets: [
      "Read availability from the configured Google Calendar connection.",
      "Use the owner dashboard to review integration readiness and current posture.",
      "Keep fallback callback capture available for flows that are not safe to auto-book."
    ]
  }
} as const

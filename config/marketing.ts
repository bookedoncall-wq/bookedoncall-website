export const faqEntries = [
  {
    question: "What is the difference between Starter and Pro?",
    answer:
      "Starter gives you the core product: answered calls, callback capture, booking when enabled, and call summaries after every conversation. Pro adds more included minutes and more control over how the assistant sounds and introduces itself."
  },
  {
    question: "Does BookedOnCall always book appointments automatically?",
    answer:
      "No. BookedOnCall books jobs only when scheduling is turned on and the request fits the rules you want it to follow. It can still capture the lead and send the call back to your team when a person should decide."
  },
  {
    question: "What integrations are supported today?",
    answer:
      "BookedOnCall works with Jobber and Google Calendar so it can fit into the scheduling tools many home-service teams already use."
  },
  {
    question: "What happens if a job is outside the service area or needs manual review?",
    answer:
      "BookedOnCall can still collect the customer details and send the call back to your team for review instead of forcing a booking."
  },
  {
    question: "What happens after checkout?",
    answer:
      "After checkout, you create your account, add your business details, and finish setup. Pro customers can also choose the assistant voice, name, greeting, and behavior."
  },
  {
    question: "How are extra minutes billed?",
    answer:
      "Plans include a monthly minute allowance. Additional minutes are billed at the published per-minute rate for the selected plan."
  }
] as const

export const homepageHighlights = [
  {
    title: "Stop losing jobs to voicemail",
    body: "BookedOnCall answers the calls your team misses and gathers the basics before the lead goes cold."
  },
  {
    title: "Book what you want booked",
    body: "When the call fits your rules and connected calendar, BookedOnCall can offer an appointment on the spot."
  },
  {
    title: "Keep using the tools you already know",
    body: "Connect Jobber or Google Calendar so BookedOnCall fits the way your business already schedules work."
  }
] as const

export const workflowSteps = [
  {
    title: "A customer calls your business",
    body: "BookedOnCall answers when your team cannot get to the phone."
  },
  {
    title: "The assistant gets the basics",
    body: "Caller name, callback number, address, and job details are collected so your team is not starting from scratch."
  },
  {
    title: "BookedOnCall checks the next step",
    body: "When scheduling is connected, it can offer an appointment. If not, it captures a clean callback for your team."
  },
  {
    title: "Your team gets the result",
    body: "Every call ends with a clear summary, a booked appointment, or a callback request."
  }
] as const

export const useCasePages = {
  plumbers: {
    title: "AI call answering for plumbing businesses",
    summary:
      "BookedOnCall helps plumbing businesses answer leak, clog, and water-heater calls while the crew is busy, then book the job or capture a callback.",
    bullets: [
      "Catch emergency and routine plumbing calls while the team is on site.",
      "Gather the customer details your office needs before calling back.",
      "Use Jobber or Google Calendar if you want BookedOnCall to offer appointments."
    ]
  },
  hvac: {
    title: "AI call answering for HVAC companies",
    summary:
      "BookedOnCall helps HVAC companies answer no-heat, no-cool, tune-up, and diagnostic calls without sending customers to voicemail.",
    bullets: [
      "Handle tune-up, no-heat, and no-cool calls with clear intake.",
      "Collect symptoms, address, and callback details before dispatch steps in.",
      "Offer appointments when your calendar is connected, or send the call back for follow-up."
    ]
  },
  electricians: {
    title: "AI call answering for electrical contractors",
    summary:
      "BookedOnCall helps electrical contractors answer new calls, qualify the work, and send risky or complex jobs back for human review when needed.",
    bullets: [
      "Collect project details for panel, outlet, lighting, and troubleshooting calls.",
      "Send higher-risk work back to your team instead of forcing a bad booking.",
      "Keep new leads organized so your office can move quickly."
    ]
  }
} as const

export const integrationPages = {
  jobber: {
    title: "BookedOnCall + Jobber",
    summary:
      "Connect BookedOnCall to Jobber so new calls can flow into the scheduling process your team already uses.",
    bullets: [
      "Check availability through Jobber when you want BookedOnCall to offer appointment times.",
      "Keep your office on the same tools it already uses every day.",
      "Fall back to a clean callback handoff when a job still needs a person."
    ]
  },
  "google-calendar": {
    title: "BookedOnCall + Google Calendar",
    summary:
      "Connect BookedOnCall to Google Calendar so callers can be offered supported appointment times when you want them to be.",
    bullets: [
      "Check availability against your connected calendar.",
      "Offer supported appointment times without changing the way your team schedules work.",
      "Keep callback capture available for jobs that still need a human decision."
    ]
  }
} as const

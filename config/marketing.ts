export const faqEntries = [
  {
    question: "What is the difference between Starter and Pro?",
    answer:
      "Starter gives you the core product: answered calls, callback capture, booking when enabled, and clear summaries with the next step. Pro adds more included minutes and more control over how the assistant sounds and introduces itself."
  },
  {
    question: "Does BookedOnCall always book appointments automatically?",
    answer:
      "No. BookedOnCall books jobs only when scheduling is turned on and the request fits the rules you want it to follow. It can still capture the lead and send the call back to you when a person should decide."
  },
  {
    question: "What integrations are supported today?",
    answer:
      "BookedOnCall works with Jobber and Google Calendar so it can fit into the scheduling tools many home-service businesses already use."
  },
  {
    question: "What happens if a job is outside the service area or needs manual review?",
    answer:
      "BookedOnCall can still collect the customer details and send the call back to you for review instead of forcing a booking."
  },
  {
    question: "What happens after I choose a plan?",
    answer:
      "Send us your details through the form and we will follow up. We will talk through your trade, scheduling setup, and how you want calls handled. Pro customers can also choose the assistant voice, name, greeting, and behavior."
  },
  {
    question: "How are extra minutes billed?",
    answer:
      "Plans include a monthly minute allowance. Additional minutes are billed at the published per-minute rate for the selected plan."
  },
  {
    question: "How long does setup take?",
    answer:
      "Setup usually takes one call to go over your preferences and a short configuration step. Most businesses are live within a day or two."
  },
  {
    question: "Can BookedOnCall handle emergency or urgent calls?",
    answer:
      "BookedOnCall can flag calls that sound urgent based on what the caller describes, like a burst pipe or no heat in winter. It can mark those calls for fast follow-up, but it does not replace your own emergency protocols."
  },
  {
    question: "Do I need to change my phone number?",
    answer:
      "No. You keep your existing business number. BookedOnCall answers the calls you cannot get to, either by forwarding or as a backup after a set number of rings."
  },
  {
    question: "What happens if the caller speaks Spanish?",
    answer:
      "BookedOnCall currently handles English calls. Spanish-language support is on the roadmap but is not available today."
  },
  {
    question: "Can I try BookedOnCall before committing?",
    answer:
      "We are not offering a self-serve free trial right now, but we are happy to walk you through a demo call so you can hear how it sounds for your trade before you decide."
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. BookedOnCall is billed monthly with no long-term commitment. You can cancel anytime."
  },
  {
    question: "How does BookedOnCall compare to a live answering service?",
    answer:
      "A traditional answering service uses human operators who follow a script. BookedOnCall uses AI to handle the call, collect details, and route the next step. The trade-off is cost: live services often charge $1-2 per minute or more. BookedOnCall includes minutes in the plan at a lower per-minute rate, and the assistant is available around the clock without staffing limitations."
  },
  {
    question: "What information does the assistant collect on each call?",
    answer:
      "The assistant collects the caller's name, callback number, service address, and a description of the work needed. Depending on your setup, it can also ask about urgency, property type, and preferred scheduling windows."
  }
] as const

export const homepageHighlights = [
  {
    title: "Stop losing jobs to voicemail",
    body: "BookedOnCall answers the calls you miss and gathers the basics before the lead goes cold."
  },
  {
    title: "Sound buttoned-up even when the crew is busy",
    body: "Give callers a fast, professional first response even when nobody can stop mid-job to answer the phone."
  },
  {
    title: "Keep using the tools you already know",
    body: "Connect Jobber or Google Calendar so BookedOnCall fits the way your business already schedules work."
  }
] as const

export const homepageTrustPoints = [
  {
    title: "Built from a real trades problem",
    body: "BookedOnCall was built because too many good trades businesses lose work simply because nobody can answer the phone while the job is getting done.",
  },
  {
    title: "Made for owner-operators and growing shops",
    body: "Whether you're a one-person operation or a growing crew, BookedOnCall helps you look professional without paying for a full front desk.",
  },
  {
    title: "Practical over flashy",
    body: "The goal is simple: answer more calls, capture better details, and help you move faster on real work.",
  },
  {
    title: "No long-term contracts",
    body: "BookedOnCall is billed monthly. No annual commitments, no setup fees, no cancellation penalties. If it works for your business, you keep it.",
  },
] as const

export const comingSoonProofItems = [
  {
    title: "Audio call demos",
    body: "Recorded examples by trade so people can hear how BookedOnCall sounds on plumbing, HVAC, electrical, and other home-service calls.",
  },
  {
    title: "Customer proof",
    body: "Before-and-after results showing how real businesses use BookedOnCall to answer more calls, capture more leads, and keep work from slipping to voicemail.",
  },
  {
    title: "Trade case studies",
    body: "Short breakdowns of how different shops set up scheduling, callbacks, and follow-up for the kinds of calls they get every day.",
  },
] as const

export const workflowSteps = [
  {
    title: "A customer calls your business",
    body: "BookedOnCall answers when you cannot get to the phone."
  },
  {
    title: "The assistant gets the basics",
    body: "Caller name, callback number, address, and job details are collected so you are not starting from scratch."
  },
  {
    title: "BookedOnCall checks the next step",
    body: "When scheduling is connected, it can offer an appointment. If not, it captures a clean callback for you."
  },
  {
    title: "You get the result",
    body: "You get a clear summary, a booked appointment, or a callback request."
  }
] as const

export const useCasePages = {
  plumbers: {
    label: "Plumbers",
    navLabel: "For Plumbers",
    path: "/for/plumbers",
    title: "AI call answering for plumbing businesses",
    summary:
      "BookedOnCall helps plumbing businesses answer leak, clog, and water-heater calls while the crew is busy, then book the job or capture a callback.",
    cardSummary: "Handle leak, drain, and water-heater calls without sending customers to voicemail.",
    commonCalls: [
      "Leak, clog, water-heater, and sewer-line calls that need a fast first response.",
      "Routine plumbing jobs where the customer wants to know if you can get them on the schedule.",
      "After-hours calls where you still want the customer details captured cleanly."
    ],
    reasons: [
      "Catch emergency and routine plumbing calls while the crew is on site.",
      "Gather the customer details you need before calling back.",
      "Offer appointments when your scheduling setup allows it."
    ],
    trustCopy:
      "Plumbing calls are often urgent. When water is going where it should not, people do not want to hear voicemail. BookedOnCall helps you sound responsive even when everyone is already in the field.",
    ctaTitle: "Ready to set up plumbing call coverage?",
    ctaBody: "Choose a plan and make sure the next plumbing call gets answered."
  },
  hvac: {
    label: "HVAC",
    navLabel: "For HVAC",
    path: "/for/hvac",
    title: "AI call answering for HVAC companies",
    summary:
      "BookedOnCall helps HVAC companies answer no-heat, no-cool, tune-up, and diagnostic calls without sending customers to voicemail.",
    cardSummary: "Handle no-cool, no-heat, tune-up, and diagnostic calls with a better first response.",
    commonCalls: [
      "No-cool, no-heat, tune-up, and diagnostic calls that come in while your techs are already on jobs.",
      "Seasonal rush calls where customers want to know when someone can come out.",
      "After-hours issues where you want to capture symptoms, address, and callback details right away."
    ],
    reasons: [
      "Handle tune-up, no-heat, and no-cool calls with clear intake.",
      "Collect symptoms, address, and callback details before the next step.",
      "Offer appointments when your calendar is connected, or send the call back for follow-up."
    ],
    trustCopy:
      "HVAC calls can be high-pressure and time-sensitive, especially in peak summer and winter weeks. BookedOnCall helps your business sound steady and responsive when demand jumps and you are stretched thin.",
    ctaTitle: "Need better HVAC call coverage?",
    ctaBody: "Choose a plan and make sure heating and cooling calls get answered the first time."
  },
  electricians: {
    label: "Electricians",
    navLabel: "For Electricians",
    path: "/for/electricians",
    title: "AI call answering for electrical contractors",
    summary:
      "BookedOnCall helps electrical contractors answer new calls, qualify the work, and send risky or complex jobs back for human review when needed.",
    cardSummary: "Qualify electrical jobs clearly and send risky or unusual work back for human review.",
    commonCalls: [
      "Panel, outlet, lighting, troubleshooting, and service-upgrade calls that need better intake.",
      "Jobs where safety, scope, or pricing questions mean a person should make the final call.",
      "New-customer inquiries where the office needs clear notes before calling back."
    ],
    reasons: [
      "Collect project details for panel, outlet, lighting, and troubleshooting calls.",
      "Send higher-risk work back to you instead of forcing a bad booking.",
      "Keep new leads organized so you can move quickly."
    ],
    trustCopy:
      "Electrical work often needs a little more judgment before anything gets promised. BookedOnCall helps you capture the right details, keep the customer moving, and hand the job back for human review when that is the right call.",
    ctaTitle: "Ready to set up electrical call handling?",
    ctaBody: "Choose a plan and give new electrical leads a better first response."
  },
  painters: {
    label: "Painters",
    navLabel: "For Painters",
    path: "/for/painters",
    title: "AI call answering for painting businesses",
    summary:
      "BookedOnCall helps painting businesses answer estimate requests, project inquiries, and callback needs without losing leads to voicemail.",
    cardSummary: "Handle estimate requests and painting inquiries while the crew is on site or in the middle of a project.",
    commonCalls: [
      "Interior and exterior painting estimate requests from homeowners who want a quick response.",
      "Questions about timelines, project scope, and callback follow-up while you are out working.",
      "New leads that need to be captured clearly before you or an estimator calls back."
    ],
    reasons: [
      "Catch estimate requests while painters are on ladders, in prep, or on active projects.",
      "Collect address, project details, and callback information before the lead cools off.",
      "Keep the pipeline moving even when the first step is a callback, not an instant booking."
    ],
    trustCopy:
      "Painting businesses win work by being responsive, organized, and easy to deal with. BookedOnCall helps you make that strong first impression even when the whole crew is in the field.",
    ctaTitle: "Need better coverage for painting leads?",
    ctaBody: "Choose a plan and make sure estimate requests do not disappear into voicemail."
  },
  flooring: {
    label: "Flooring",
    navLabel: "For Flooring",
    path: "/for/flooring",
    title: "AI call answering for flooring contractors",
    summary:
      "BookedOnCall helps flooring contractors answer installation, replacement, and repair calls without letting new leads slip past the office.",
    cardSummary: "Capture flooring installs, replacements, and repair requests with a more professional first response.",
    commonCalls: [
      "Hardwood, tile, vinyl, carpet, and repair calls that come in while you are on install.",
      "Measurement and estimate requests where you need clean notes before following up.",
      "Customers comparing contractors and deciding who actually answers the phone."
    ],
    reasons: [
      "Catch flooring leads while the crew is on install and cannot stop to answer.",
      "Collect room details, surface type, address, and callback information up front.",
      "Make it easier to follow up fast with the right context."
    ],
    trustCopy:
      "A lot of flooring work starts with an estimate request. If the first call goes unanswered, that customer may never call back. BookedOnCall helps you keep those opportunities alive.",
    ctaTitle: "Ready for better flooring lead coverage?",
    ctaBody: "Choose a plan and make it easier to respond quickly to new flooring inquiries."
  },
  landscaping: {
    label: "Landscapers",
    navLabel: "For Landscapers",
    path: "/for/landscaping",
    title: "AI call answering for landscaping businesses",
    summary:
      "BookedOnCall helps landscaping businesses answer maintenance, cleanup, irrigation, and project calls while the crew is outside doing the work.",
    cardSummary: "Handle maintenance, cleanup, irrigation, and project calls without missing new business.",
    commonCalls: [
      "Maintenance, cleanup, irrigation, and install calls that come in while your crew is on route.",
      "Seasonal spikes where homeowners are calling several companies at once.",
      "Project inquiries that need to be captured clearly before you follow up."
    ],
    reasons: [
      "Catch landscaping calls while the crew is driving between jobs or already on site.",
      "Collect property details, service needs, and callback info before the customer moves on.",
      "Keep routine jobs moving while still handing larger project decisions back to you."
    ],
    trustCopy:
      "Landscaping businesses spend most of the day away from the phone. BookedOnCall helps you stay responsive without forcing someone to stop mid-route just to catch the next lead.",
    ctaTitle: "Need better landscaping call coverage?",
    ctaBody: "Choose a plan and make sure maintenance and project calls get a faster first response."
  },
  "general-home-services": {
    label: "General Home Services",
    navLabel: "For General Home Services",
    path: "/for/general-home-services",
    title: "AI call answering for general home-service businesses",
    summary:
      "BookedOnCall helps home-service businesses answer new calls, capture the job details, and route the next step without losing good leads to voicemail.",
    cardSummary: "A better first response for handyman, repair, install, and general home-service calls.",
    commonCalls: [
      "Handyman, repair, install, and general service inquiries that come in while you are already booked out in the field.",
      "Calls that need a quick first response and a clean callback instead of a long voicemail.",
      "New-customer inquiries where you need the basics before deciding on the next step."
    ],
    reasons: [
      "Catch new calls while you are out working instead of tied to the phone.",
      "Collect the details you need before calling the customer back.",
      "Keep your process simple without replacing the tools and habits your business already uses."
    ],
    trustCopy:
      "A lot of growing home-service businesses are too busy to answer every call and too small to hire a dedicated receptionist. BookedOnCall is built for that middle ground.",
    ctaTitle: "Need a better way to answer new service calls?",
    ctaBody: "Choose a plan and make sure new home-service leads get a better first response."
  }
} as const

export const useCaseOrder = [
  "plumbers",
  "hvac",
  "electricians",
  "painters",
  "flooring",
  "landscaping",
  "general-home-services",
] as const

export const integrationPages = {
  jobber: {
    title: "BookedOnCall + Jobber",
    summary:
      "Connect BookedOnCall to Jobber so new calls can flow into the scheduling process you already use.",
    bullets: [
      "Check availability through Jobber when you want BookedOnCall to offer appointment times.",
      "Keep your business on the same tools it already uses every day.",
      "Fall back to a clean callback handoff when a job still needs a person."
    ]
  },
  "google-calendar": {
    title: "BookedOnCall + Google Calendar",
    summary:
      "Connect BookedOnCall to Google Calendar so callers can be offered supported appointment times when you want them to be.",
    bullets: [
      "Check availability against your connected calendar.",
      "Offer supported appointment times without changing the way you schedule work.",
      "Keep callback capture available for jobs that still need a human decision."
    ]
  }
} as const

export const faqEntries = [
  {
    question: "What is the difference between Starter and Pro?",
    answer:
      "Starter gives you the core product: answered calls, callback capture, booking when enabled, and clear summaries with the next step. Pro adds more included minutes and more control over how the assistant sounds and introduces itself."
  },
  {
    question: "Which plan should I start with?",
    answer:
      "Starter is the right starting point for many owner-operators and smaller shops. Pro makes more sense if you want more included minutes and more control over the caller experience from day one."
  },
  {
    question: "Does BookedOnCall always book appointments automatically?",
    answer:
      "No. BookedOnCall books jobs only when scheduling is turned on and the request fits the rules you want it to follow. It can still capture the lead and send the call back to you when a person should decide."
  },
  {
    question: "What integrations are supported today?",
    answer:
      "BookedOnCall supports Jobber, Google Calendar, and customer text messaging when those workflows are configured for your business. QuickBooks is roadmap-only. Housecall Pro and ServiceTitan can be reviewed for assisted pilots when the customer can provide the required provider access, but they are not available as live self-serve integrations today."
  },
  {
    question: "What happens if a job is outside the service area or needs your approval?",
    answer:
      "BookedOnCall can still collect the customer details and send the call back to you for review instead of forcing a booking."
  },
  {
    question: "What happens after I choose a plan?",
    answer:
      "If self-serve checkout is enabled, you move straight into secure checkout and app onboarding. If not, we use your details to guide the right setup path before sending you into the app."
  },
  {
    question: "How are extra minutes billed?",
    answer:
      "Plans include a monthly minute allowance. Extra minutes are billed at the published per-minute rate for your plan. If you keep running well past the included minutes, we'll usually recommend the next tier instead of leaving you on the wrong plan."
  },
  {
    question: "How long does setup take?",
    answer:
      "Setup usually takes one call to go over your preferences and a short configuration step. Timing depends on phone forwarding, scheduling connections, and your first private test call."
  },
  {
    question: "Can BookedOnCall handle emergency or urgent calls?",
    answer:
      "BookedOnCall can flag calls that sound urgent based on what the caller describes, like a burst pipe or no heat in winter. It can mark those calls for fast follow-up, but it doesn't replace your own emergency protocols."
  },
  {
    question: "Do I need to change my phone number?",
    answer:
      "No. You keep your existing business number. BookedOnCall answers the calls you can't get to, either by forwarding or as a backup after a set number of rings."
  },
  {
    question: "What if the caller asks to continue in another supported language?",
    answer:
      "BookedOnCall starts in English by default so it doesn't switch languages by accident. If a caller clearly asks to continue in another supported language, the assistant can switch and keep the call moving. English is still the primary default today."
  },
  {
    question: "Can I try BookedOnCall before committing?",
    answer:
      "There is no free trial right now, but we can walk you through example calls and get you to a private test call before any live number points at BookedOnCall."
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "Standard public plans are monthly unless a separate order form or written agreement says otherwise. Cancellation and renewal terms follow the plan or agreement that applies to your account."
  },
  {
    question: "How does BookedOnCall compare to a live answering service?",
    answer:
      "A traditional answering service uses human operators who follow a script. BookedOnCall uses AI to handle the call, collect details, and route the next step. Live services usually cost materially more per minute, while BookedOnCall keeps pricing simpler with included minutes and a published overage rate."
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
    title: "Sound buttoned-up even when you're busy",
    body: "Give callers a fast, professional first response even when nobody can stop mid-job to answer the phone."
  },
  {
    title: "Keep using the tools you already know",
    body: "Keep Jobber, Google Calendar, and customer text messaging in the flow when those workflows are configured for your business."
  }
] as const

export const homepageTrustPoints = [
  {
    title: "Made for owner-operators",
    body: "Useful for a one-person shop or a growing business that needs help catching calls without adding a full front desk.",
  },
  {
    title: "Built around field reality",
    body: "It's built around what actually happens in the trades: the phone rings while you're driving, quoting, or already on a job.",
  },
  {
    title: "Practical over flashy",
    body: "The goal is simple: answer more calls, capture clean details, and make the next step easier.",
  },
  {
    title: "Month-to-month and easy to try",
    body: "Standard public plans are monthly with a clear setup path. Keep it if it helps, and review any separate written terms before you start.",
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
    body: "BookedOnCall answers when you can't get to the phone, so the lead doesn't drop into voicemail."
  },
  {
    title: "The assistant confirms the core details",
    body: "Caller name, callback number, service address, and the job details are captured first so your team has something usable right away."
  },
  {
    title: "BookedOnCall checks the next step",
    body: "If scheduling is connected and the request fits your setup, it can move toward a booking. If not, it captures the lead and lines up the right callback or follow-up."
  },
  {
    title: "You get the result",
    body: "You get a clear summary, a booked appointment, or a follow-up request with context."
  }
] as const

export const productFlowSteps = [
  {
    title: "Pick up right away",
    body: "BookedOnCall picks up when you can't get to the phone, whether you're in the truck, on a ladder, or already inside the next job."
  },
  {
    title: "Confirm the core details",
    body: "It gets the problem, callback number, service address, and the details your team needs before deciding the next step."
  },
  {
    title: "Route the job the right way",
    body: "If the request fits your rules and your schedule is connected, it can move toward a booking. If not, it comes back to your team with a clear callback handoff."
  },
] as const

export const afterCallArtifacts = [
  {
    title: "Call summary",
    body: "Who called, what they need, and the clearest next step."
  },
  {
    title: "Booking path",
    body: "If scheduling is connected and the request fits, the call can move toward a confirmed slot."
  },
  {
    title: "Callback handoff",
    body: "Out-of-area jobs, approval-only work, and other edge cases still come back with clear details."
  },
] as const

export const resourceHighlights = [
  {
    title: "Example calls",
    href: "/examples",
    description: "Start here to hear how a plumbing, HVAC, or electrical call can move from first question to clear next step."
  },
  {
    title: "AI receptionist vs voicemail",
    href: "/compare/ai-receptionist-vs-voicemail",
    description: "See what changes when callers get a real first response instead of a voicemail box."
  },
  {
    title: "AI, receptionist, or answering service?",
    href: "/compare/answering-service-vs-receptionist-vs-ai-receptionist",
    description: "Compare the tradeoffs on cost, control, and call quality before you choose a coverage model."
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Check what Starter and Pro include, what extra minutes cost, and which plan fits your shop."
  },
] as const

export const useCasePages = {
  plumbers: {
    label: "Plumbers",
    navLabel: "For Plumbers",
    path: "/for/plumbers",
    title: "AI call answering for plumbing businesses",
    summary:
      "BookedOnCall helps plumbing businesses answer leak, clog, and water-heater calls while you're busy on other jobs, then book the job or capture a callback.",
    cardSummary: "Handle leak, drain, and water-heater calls without sending customers to voicemail.",
    commonCalls: [
      "Leak, clog, water-heater, and sewer-line calls that need a fast first response.",
      "Routine plumbing jobs where the customer wants to know if you can get them on the schedule.",
      "After-hours calls where you still want the customer details captured cleanly."
    ],
    reasons: [
      "Catch emergency and routine plumbing calls while you're already tied up on another job.",
      "Gather the customer details you need before calling back.",
      "Offer appointments when your scheduling setup allows it."
    ],
    trustCopy:
      "Plumbing calls are often urgent. When water is going where it shouldn't, people don't want to hear voicemail. BookedOnCall helps you sound responsive even when everyone is already in the field.",
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
      "HVAC calls can be high-pressure and time-sensitive, especially in peak summer and winter weeks. BookedOnCall helps your business sound steady and responsive when demand jumps and you're stretched thin.",
    ctaTitle: "Need better HVAC call coverage?",
    ctaBody: "Choose a plan and make sure heating and cooling calls get answered the first time."
  },
  electricians: {
    label: "Electricians",
    navLabel: "For Electricians",
    path: "/for/electricians",
    title: "AI call answering for electrical contractors",
    summary:
      "BookedOnCall helps electrical contractors answer new calls, qualify the work, and send risky or complex jobs back to your team when needed.",
    cardSummary: "Qualify electrical jobs clearly and send risky or unusual work back to your team.",
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
      "Electrical work often needs a little more judgment before anything gets promised. BookedOnCall helps you capture the right details, keep the customer moving, and hand the job back to your team when that is the right call.",
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
    cardSummary: "Handle estimate requests and painting inquiries while you're on site or in the middle of a project.",
    commonCalls: [
      "Interior and exterior painting estimate requests from homeowners who want a quick response.",
      "Questions about timelines, project scope, and callback follow-up while you're out working.",
      "New leads that need to be captured clearly before you or an estimator calls back."
    ],
    reasons: [
      "Catch estimate requests while painters are on ladders, in prep, or on active projects.",
      "Collect address, project details, and callback information before the lead cools off.",
      "Keep the pipeline moving even when the first step is a callback, not an instant booking."
    ],
    trustCopy:
      "Painting businesses win work by being responsive, organized, and easy to deal with. BookedOnCall helps you make that strong first impression even when everyone is already in the field.",
    ctaTitle: "Need better coverage for painting leads?",
    ctaBody: "Choose a plan and make sure estimate requests don't disappear into voicemail."
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
      "Hardwood, tile, vinyl, carpet, and repair calls that come in while you're on install.",
      "Measurement and estimate requests where you need clean notes before following up.",
      "Customers comparing contractors and deciding who actually answers the phone."
    ],
    reasons: [
      "Catch flooring leads while you're on install and can't stop to answer.",
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
      "BookedOnCall helps landscaping businesses answer maintenance, cleanup, irrigation, and project calls while you're outside doing the work.",
    cardSummary: "Handle maintenance, cleanup, irrigation, and project calls without missing new business.",
    commonCalls: [
      "Maintenance, cleanup, irrigation, and install calls that come in while you're already on route.",
      "Seasonal spikes where homeowners are calling several companies at once.",
      "Project inquiries that need to be captured clearly before you follow up."
    ],
    reasons: [
      "Catch landscaping calls while you're driving between jobs or already on site.",
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
      "Handyman, repair, install, and general service inquiries that come in while you're already booked out in the field.",
      "Calls that need a quick first response and a clear follow-up instead of a long voicemail.",
      "New-customer inquiries where you need the basics before deciding on the next step."
    ],
    reasons: [
      "Catch new calls while you're out working instead of tied to the phone.",
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
      "Send the call back with clear details when a job still needs a person."
    ],
    outcomeCards: [
      "BookedOnCall can move supported jobs toward a booking when your Jobber calendar is connected.",
      "Your team can keep using the same scheduling process instead of learning a new back office.",
      "Jobs that still need your approval come back with clear details instead of messy voicemail."
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
    ],
    outcomeCards: [
      "BookedOnCall can check the calendar before offering supported appointment times.",
      "You keep the scheduling workflow you already know instead of moving to a new system.",
      "If a person should decide, the call still comes back with clear details for follow-up."
    ]
  },
  "text-sms": {
    title: "BookedOnCall + Text / SMS",
    summary:
      "Use customer text messaging for supported follow-up, confirmations, and callback communication after the call.",
    bullets: [
      "Send supported customer follow-up texts after the call when messaging is enabled.",
      "Keep confirmations, callback updates, and simple next-step communication in a channel customers already check.",
      "Use messaging to support the handoff, not to force the whole job to be solved over text."
    ],
    outcomeCards: [
      "Customers can receive supported follow-up texts once the call has the details your team needs.",
      "Your team still gets the summary and decides what should move toward booking, callback, or manual review.",
      "Messaging stays aligned with your configured workflow instead of turning into a separate office process."
    ]
  },
  quickbooks: {
    title: "BookedOnCall + QuickBooks",
    summary:
      "QuickBooks is the next targeted integration on the roadmap for customer context and cleaner office follow-up, but it is not live today.",
    bullets: [
      "The planned first step is read-only customer context, not a write-heavy accounting workflow inside the call path.",
      "The goal is better office follow-up with clearer customer history when the business has usable QuickBooks data.",
      "Roadmap items are directional and may change as the product and implementation priorities evolve."
    ],
    outcomeCards: [
      "Planned: better customer context for repeat callers and office follow-up.",
      "Planned: a narrow first release that adds signal without making QuickBooks a hard dependency for every call.",
      "Current status: not available in BookedOnCall today."
    ]
  },
  "housecall-pro": {
    title: "BookedOnCall + Housecall Pro",
    summary:
      "Housecall Pro can be reviewed for an assisted pilot when an eligible shop can provide owner-approved API access, but it is not live in BookedOnCall today.",
    bullets: [
      "The practical first path is a Housecall Pro MAX-plan customer-admin review, using owner-approved API key or webhook access only after secure credential handling is ready.",
      "The first safe workflow is callback handoff or owner-reviewed job creation that respects the customer's existing Housecall Pro process.",
      "Provider access, tenant-specific credentials, contract tests, smoke evidence, and pilot workflow review are required before any launch claim.",
      "Roadmap items are directional and may change as provider access, customer demand, and launch priorities evolve."
    ],
    outcomeCards: [
      "Assisted review: gather plan eligibility, admin owner, desired handoff behavior, and API/webhook access path before any credential collection.",
      "Required before launch: provider-backed sandbox or tenant proof, current-head smoke evidence, and manual workflow review.",
      "Current status: not available in BookedOnCall today."
    ]
  },
  servicetitan: {
    title: "BookedOnCall + ServiceTitan",
    summary:
      "ServiceTitan can be reviewed for named customers with tenant-admin API participation, but it requires access, workflow mapping, and provider proof before it can become a launch integration.",
    bullets: [
      "The practical first path is a tenant-private or pilot-specific review where a ServiceTitan admin confirms tenant ID, scopes, app access, and booking-provider setup.",
      "The safest first workflow is CSR-reviewed booking intake or callback handoff. Availability-aware scheduling comes only after ServiceTitan access and scopes are approved.",
      "ServiceTitan requires tenant or partner API credentials, app keys, scopes, sandbox validation, and customer-approved booking-provider mapping.",
      "Roadmap items are directional and may change as partner access, certification, and pilot-customer requirements are confirmed."
    ],
    outcomeCards: [
      "Assisted review: gather tenant-admin owner, desired booking/callback workflow, Scheduling Pro status, and mapping requirements before any credential collection.",
      "Required before launch: ServiceTitan sandbox or tenant proof, provider smoke, release evidence, and customer workflow approval.",
      "Current status: not available in BookedOnCall today."
    ]
  }
} as const

export const roadmapDisclaimer =
  "Roadmap items and coming-soon statements are informational only, may change, and do not guarantee delivery on a specific timeline."

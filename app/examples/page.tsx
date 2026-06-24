import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  MailCheck,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
} from "lucide-react"
import { CtaBand } from "@/components/marketing/CtaBand"
import { StructuredData } from "@/components/marketing/StructuredData"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo"

type TranscriptTurn = {
  speaker: "Caller" | "BookedOnCall"
  line: string
}

type SummaryRow = {
  label: string
  value: string
}

const exampleCalls = [
  {
    id: "hvac-no-heat-after-hours",
    title: "HVAC no-heat call during a cold snap",
    trade: "HVAC",
    situation:
      "It is after hours, temperatures are dropping, and the caller has no heat. The shop wants the details captured and the owner alerted without the assistant promising a dispatch time.",
    outcome: "Emergency owner alert after hours",
    outcomeDetail:
      "BookedOnCall captures the household details, marks the call urgent, and tells the caller the owner will review it instead of pretending a tech is already on the way.",
    icon: AlertTriangle,
    transcript: [
      {
        speaker: "Caller",
        line: "Our furnace stopped working and it is supposed to get down to 12 tonight. Are you still taking calls?",
      },
      {
        speaker: "BookedOnCall",
        line: "I can get the details to the HVAC owner right away. What is your name, callback number, and service address?",
      },
      {
        speaker: "Caller",
        line: "This is Dana. The number I am calling from is best. We are on Maple Ridge Drive in Lakewood.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Dana. Is the furnace trying to turn on, or is it completely off? And is anyone in the home especially vulnerable to the cold?",
      },
      {
        speaker: "Caller",
        line: "It clicks but does not fire. My mother lives with us, so I am worried about overnight.",
      },
      {
        speaker: "BookedOnCall",
        line: "I am marking this urgent because it is no heat in freezing weather with a vulnerable occupant. I can share the sample diagnostic range, but the owner needs to review before any time is promised.",
      },
      {
        speaker: "Caller",
        line: "What is the range?",
      },
      {
        speaker: "BookedOnCall",
        line: "The sample diagnostic range is $89 to $149. That is not a repair quote. I am sending your no-heat details and callback number for urgent owner review now.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: no-heat diagnostic is recognized as an HVAC call.",
      "Urgency: freezing weather plus vulnerable occupant triggers emergency owner alert.",
      "Pricing: the assistant shares only the approved diagnostic range, not a repair quote.",
      "Outcome: no arrival time or dispatch claim is made before owner review.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Emergency owner alert after hours" },
      { label: "Priority", value: "Urgent; no heat, 12-degree forecast, vulnerable occupant in home" },
      { label: "Customer", value: "Dana; callback number captured" },
      { label: "Address", value: "Maple Ridge Drive, Lakewood" },
      { label: "Job", value: "Furnace clicks but does not fire" },
      { label: "Pricing", value: "Sample $89-$149 diagnostic range shared; no repair quote given" },
      { label: "Next step", value: "Owner should review and call back before promising timing" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Dana. Your no-heat call is marked urgent and sent to the owner for review. No appointment time has been confirmed yet.",
  },
  {
    id: "plumbing-running-toilet-booked",
    title: "Plumbing running-toilet call booked by rule",
    trade: "Plumbing",
    situation:
      "The caller has a non-emergency running toilet and wants it handled this week. This shop has reviewed rules that allow direct booking for this service when the address and schedule fit.",
    outcome: "Appointment booked from reviewed rules",
    outcomeDetail:
      "BookedOnCall confirms the issue is routine, checks that the service can be booked for this setup, and books a real available window because the rules allow it.",
    icon: CalendarCheck,
    transcript: [
      {
        speaker: "Caller",
        line: "Our hall toilet keeps running. It is not flooding, but we want it fixed this week.",
      },
      {
        speaker: "BookedOnCall",
        line: "I can help with that. What is your name, callback number, and service address?",
      },
      {
        speaker: "Caller",
        line: "Nate. Use the number I am calling from. We are on Briar Creek Lane in Plano.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Nate. Is water overflowing, leaking through the floor, or is it just the tank running?",
      },
      {
        speaker: "Caller",
        line: "Just running. We shut the valve off when it gets annoying.",
      },
      {
        speaker: "BookedOnCall",
        line: "Good, that keeps it routine. This running-toilet service is bookable for your area, and I can offer an available window.",
      },
      {
        speaker: "Caller",
        line: "Thursday morning works if you have it.",
      },
      {
        speaker: "BookedOnCall",
        line: "You are booked for Thursday morning for the running-toilet repair. The shop will receive your details and can reach out if anything changes.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: running toilet is an approved direct-bookable service for this setup.",
      "Urgency: no active flooding or damage is reported.",
      "Service area: Plano address fits the configured area.",
      "Schedule: Thursday morning is available under the reviewed booking rule.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Appointment booked from reviewed rules" },
      { label: "Priority", value: "Routine; no overflow, leak, or active water damage" },
      { label: "Customer", value: "Nate; callback number captured" },
      { label: "Address", value: "Briar Creek Lane, Plano" },
      { label: "Job", value: "Hall toilet keeps running; customer can shut off valve" },
      { label: "Scheduling", value: "Booked Thursday morning from connected availability" },
      { label: "Next step", value: "Shop receives booked job summary and can contact customer if needed" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Nate. Your running-toilet repair is booked for Thursday morning. The shop has the details and will reach out if anything changes.",
  },
  {
    id: "electrical-ev-charger-owner-review",
    title: "Electrical EV charger call with price deflected safely",
    trade: "Electrical",
    situation:
      "The caller wants a rough price for an EV charger and possible panel upgrade. The shop wants strong intake but no final price without owner review.",
    outcome: "Owner-review estimate request",
    outcomeDetail:
      "BookedOnCall gathers the charger, panel, and parking details, refuses to quote a final price, and sends a clean estimate request to the owner.",
    icon: ShieldCheck,
    transcript: [
      {
        speaker: "Caller",
        line: "I need an EV charger installed. Can you tell me what that usually costs?",
      },
      {
        speaker: "BookedOnCall",
        line: "I can take the details for the electrician. What is your name, callback number, and service address?",
      },
      {
        speaker: "Caller",
        line: "Priya. The number I am calling from is best. It is on Brookhaven Drive in Cary.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Priya. Is this for a Level 2 charger, and do you know whether your panel has open breaker space?",
      },
      {
        speaker: "Caller",
        line: "Level 2, I think. The panel looks full, so I might need an upgrade too. I just need a ballpark.",
      },
      {
        speaker: "BookedOnCall",
        line: "Because this may involve panel capacity, the owner needs to review before pricing. I do not want to give you a number that turns out wrong.",
      },
      {
        speaker: "Caller",
        line: "Fair. They can call me tomorrow afternoon.",
      },
      {
        speaker: "BookedOnCall",
        line: "I have the EV charger request, possible panel constraint, address, and tomorrow afternoon callback preference. I will send it as an owner-review estimate request.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: EV charger and possible panel upgrade are recognized as electrical estimate work.",
      "Safety/scope: panel capacity makes the call owner-review only.",
      "Pricing: caller asks for a price and the assistant safely deflects final pricing.",
      "Outcome: callback request is clear and useful without overpromising.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Owner-review estimate request" },
      { label: "Priority", value: "Normal estimate lead; no smoke, sparks, or outage reported" },
      { label: "Customer", value: "Priya; callback number captured" },
      { label: "Address", value: "Brookhaven Drive, Cary" },
      { label: "Job", value: "Level 2 EV charger; panel may be full and may need upgrade review" },
      { label: "Pricing", value: "Caller pushed for ballpark; no final price given" },
      { label: "Next step", value: "Owner callback requested tomorrow afternoon" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Priya. The shop has your EV charger and panel details for owner review. No final price or appointment is confirmed yet.",
  },
  {
    id: "painting-interior-walkthrough",
    title: "Painting interior repaint lead with walkthrough callback",
    trade: "Painting",
    situation:
      "A homeowner wants three bedrooms repainted before guests arrive. The shop wants the lead captured professionally and routed to a walkthrough instead of a fake instant quote.",
    outcome: "Walkthrough callback",
    outcomeDetail:
      "BookedOnCall sounds like a polished front desk, captures the project details, and routes the caller to a walkthrough callback.",
    icon: ClipboardList,
    transcript: [
      {
        speaker: "Caller",
        line: "We need three bedrooms repainted before family comes in two weeks. Can I get an estimate?",
      },
      {
        speaker: "BookedOnCall",
        line: "Absolutely, I can get the details to the painting team. What is your name, callback number, and project address?",
      },
      {
        speaker: "Caller",
        line: "Elena. Please use the number I am calling from. We are on Willow Bend Drive in South Austin.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Elena. Are these bedrooms walls only, or walls, ceilings, trim, and doors?",
      },
      {
        speaker: "Caller",
        line: "Walls and trim. One room has dark paint now, and we have not picked the new color.",
      },
      {
        speaker: "BookedOnCall",
        line: "That is helpful. For repaint work, the shop needs a walkthrough before pricing because prep, trim, and color changes affect the estimate.",
      },
      {
        speaker: "Caller",
        line: "That makes sense. Have someone call me today if possible.",
      },
      {
        speaker: "BookedOnCall",
        line: "I have the three bedrooms, walls and trim, dark-color repaint note, two-week deadline, and your callback request. I will send it to the shop for a walkthrough follow-up.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: interior repaint estimate is captured with room and surface details.",
      "Timing: two-week deadline is captured for owner prioritization.",
      "Pricing: no final quote is given without walkthrough.",
      "Outcome: the owner gets enough context to call back professionally.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Walkthrough callback" },
      { label: "Priority", value: "Good estimate lead; two-week guest deadline" },
      { label: "Customer", value: "Elena; callback number captured" },
      { label: "Address", value: "Willow Bend Drive, South Austin" },
      { label: "Job", value: "Three bedrooms, walls and trim; one dark-color repaint; color undecided" },
      { label: "Pricing", value: "No quote given; walkthrough needed for prep and finish review" },
      { label: "Next step", value: "Call today if possible to schedule estimate walkthrough" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Elena. The shop has your repaint details and walkthrough request. No estimate price is final until the project is reviewed.",
  },
  {
    id: "flooring-lvp-measure-request",
    title: "Flooring LVP basement estimate with measurement request",
    trade: "Flooring",
    situation:
      "The caller wants LVP in a basement and gives rough square footage. The shop allows measurement requests, but final pricing depends on site conditions.",
    outcome: "Measure request pending owner confirmation",
    outcomeDetail:
      "BookedOnCall captures square footage, current flooring, stairs, moisture concerns, and a preferred measure window without calling it a final booked install.",
    icon: CalendarCheck,
    transcript: [
      {
        speaker: "Caller",
        line: "We are looking at LVP for the basement, probably around 600 square feet. Can someone measure it?",
      },
      {
        speaker: "BookedOnCall",
        line: "I can get that to the flooring team. What is your name, callback number, and project address?",
      },
      {
        speaker: "Caller",
        line: "Marcus. The number I am calling from is best. We are near Hill Road in Boise.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Marcus. What flooring is down there now, and are there stairs, moisture, or uneven concrete concerns?",
      },
      {
        speaker: "Caller",
        line: "Old carpet. No stairs in the room, but one corner had moisture last year.",
      },
      {
        speaker: "BookedOnCall",
        line: "I have that noted. The shop can use the 600 square feet as a planning detail, but final pricing needs a measurement and moisture review.",
      },
      {
        speaker: "Caller",
        line: "Wednesday afternoon would be ideal if they can measure then.",
      },
      {
        speaker: "BookedOnCall",
        line: "I will send Wednesday afternoon as a measure request for owner confirmation. No installation or final price is confirmed yet.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: LVP basement estimate is recognized as flooring work.",
      "Structured detail: approximate square footage, current floor, stairs, and moisture are captured.",
      "Pricing: rough planning range remains non-final until measurement.",
      "Outcome: preferred measure window is sent for owner confirmation.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Measure request pending owner confirmation" },
      { label: "Priority", value: "Normal estimate lead; possible moisture review needed" },
      { label: "Customer", value: "Marcus; callback number captured" },
      { label: "Address", value: "Hill Road area, Boise" },
      { label: "Job", value: "LVP for basement, about 600 sq ft; old carpet; no stairs in room" },
      { label: "Scheduling", value: "Caller prefers Wednesday afternoon; owner must confirm measure request" },
      { label: "Next step", value: "Review moisture note before confirming measurement appointment" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Marcus. Your preferred measurement window has been sent to the shop for confirmation. No final price or installation is confirmed yet.",
  },
  {
    id: "landscaping-weekly-route-review",
    title: "Landscaping weekly maintenance lead outside the route",
    trade: "Landscaping",
    situation:
      "The caller wants weekly maintenance, but the address may be outside the crew's route. The shop still wants the lead, but not a serviceability promise.",
    outcome: "Service-area review callback",
    outcomeDetail:
      "BookedOnCall captures the recurring-service details, explains the route review, and avoids promising service until the owner checks coverage.",
    icon: ClipboardList,
    transcript: [
      {
        speaker: "Caller",
        line: "I am looking for weekly mowing and bed maintenance. Do you go out to Gardner?",
      },
      {
        speaker: "BookedOnCall",
        line: "I can take the details for the landscaping team. What is your name, callback number, and service address?",
      },
      {
        speaker: "Caller",
        line: "Riley. Use the number I am calling from. The house is off Moonlight Road in Gardner.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Riley. About how large is the yard, and are you looking for weekly mowing only or beds and trimming too?",
      },
      {
        speaker: "Caller",
        line: "About a quarter acre. Mowing, edging, trimming, and the front beds cleaned up monthly.",
      },
      {
        speaker: "BookedOnCall",
        line: "I have that. Gardner may be outside the normal weekly route, so I do not want to promise service before the owner reviews it.",
      },
      {
        speaker: "Caller",
        line: "That's fine. If they go this far, have them call me.",
      },
      {
        speaker: "BookedOnCall",
        line: "I will send the route-review callback with your yard size, weekly scope, bed work, address area, and callback number.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: recurring maintenance lead is captured with scope and frequency.",
      "Service area: route fit is checked before serviceability is claimed.",
      "Pricing: no weekly quote is given before route/property review.",
      "Outcome: caller gets a clear callback expectation instead of a false yes.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Service-area review callback" },
      { label: "Priority", value: "Recurring maintenance lead; route fit needs review" },
      { label: "Customer", value: "Riley; callback number captured" },
      { label: "Address", value: "Moonlight Road area, Gardner" },
      { label: "Job", value: "Weekly mowing, edging, trimming; monthly front-bed cleanup; quarter-acre yard" },
      { label: "Pricing", value: "No weekly price quoted; route and property review required" },
      { label: "Next step", value: "Owner should decide whether the route can support this address" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Riley. The shop has your weekly maintenance request and location for route review. No service coverage or appointment is confirmed yet.",
  },
  {
    id: "roofing-active-leak-urgent",
    title: "Roofing active leak after last night's storm",
    trade: "Roofing",
    situation:
      "The caller has water coming in after a storm. The shop wants urgency captured, but the assistant must not promise a tarp crew, insurance outcome, or arrival time.",
    outcome: "Urgent leak callback",
    outcomeDetail:
      "BookedOnCall asks the right roof-leak questions, marks the call urgent, and hands the owner the exact context needed for follow-up.",
    icon: AlertTriangle,
    transcript: [
      {
        speaker: "Caller",
        line: "We had a storm last night and now water is dripping through the ceiling in the guest room.",
      },
      {
        speaker: "BookedOnCall",
        line: "I can get this to the roofing owner quickly. What is your name, callback number, and service address?",
      },
      {
        speaker: "Caller",
        line: "Chris. The number I am calling from is best. We are on Cedar Hollow Road in Franklin.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Chris. Is water still actively dripping, and is there any electrical fixture or ceiling bulge near it?",
      },
      {
        speaker: "Caller",
        line: "It is still dripping into a bucket. No light fixture, but the drywall is getting soft.",
      },
      {
        speaker: "BookedOnCall",
        line: "I am marking this urgent for owner review. I cannot promise a tarp or arrival time from here, but I will send the active-leak details right away.",
      },
      {
        speaker: "Caller",
        line: "Please do. We just need someone to call back soon.",
      },
      {
        speaker: "BookedOnCall",
        line: "I have the active drip, storm timing, ceiling condition, address, and callback number. The shop will receive it as an urgent leak callback.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: storm-related active leak is captured as roofing work.",
      "Urgency: active drip and soft drywall trigger urgent callback.",
      "Safety: electrical fixture and ceiling-bulge questions are asked.",
      "Outcome: no tarp, dispatch, insurance, or arrival promise is made.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Urgent leak callback" },
      { label: "Priority", value: "Urgent; active interior drip after storm, soft drywall reported" },
      { label: "Customer", value: "Chris; callback number captured" },
      { label: "Address", value: "Cedar Hollow Road, Franklin" },
      { label: "Job", value: "Guest-room ceiling leak after storm; bucket catching active drip" },
      { label: "Safety", value: "No light fixture reported near leak; ceiling material softening" },
      { label: "Next step", value: "Owner should call before promising tarp, visit time, or insurance guidance" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Chris. The shop has your active roof leak details as an urgent callback. No tarp, visit time, or insurance outcome is confirmed yet.",
  },
  {
    id: "general-small-job-triage",
    title: "General home-services gate latch call with job-size triage",
    trade: "General home services",
    situation:
      "A caller asks about a small gate latch repair. The shop wants enough detail to avoid chasing a tiny-fit job unless it can be bundled or is worth a callback.",
    outcome: "Small-job triage callback",
    outcomeDetail:
      "BookedOnCall captures the job, asks whether there are other tasks to bundle, and gives the owner the context to choose the right callback instead of wasting field time.",
    icon: ClipboardList,
    transcript: [
      {
        speaker: "Caller",
        line: "Our side gate will not latch anymore. Is that too small for you?",
      },
      {
        speaker: "BookedOnCall",
        line: "I can take the details and let the owner decide the best next step. What is your name, callback number, and address?",
      },
      {
        speaker: "Caller",
        line: "Sam. Use the number I am calling from. We are near Rea Road in Charlotte.",
      },
      {
        speaker: "BookedOnCall",
        line: "Thanks, Sam. Is the latch loose, misaligned, broken, or is the post moving?",
      },
      {
        speaker: "Caller",
        line: "The gate sags and the latch misses by maybe half an inch.",
      },
      {
        speaker: "BookedOnCall",
        line: "Got it. Since this may be a small single-item repair, do you have any other handyman tasks you would want bundled into the same visit?",
      },
      {
        speaker: "Caller",
        line: "Actually yes, a loose stair handrail and two shelves we never got mounted.",
      },
      {
        speaker: "BookedOnCall",
        line: "That helps. I will send this as a small-job triage callback with the gate, handrail, and shelf details. The owner will review fit before confirming a visit or price.",
      },
    ] satisfies TranscriptTurn[],
    checks: [
      "Service: gate latch is captured without pretending every tiny job should be booked.",
      "Triage: assistant asks whether the caller has additional tasks to make the trip worthwhile.",
      "Safety: loose handrail raises the priority above a cosmetic-only job.",
      "Outcome: owner gets enough context to call back the better-fit bundled job.",
    ],
    ownerSummary: [
      { label: "Outcome", value: "Small-job triage callback" },
      { label: "Priority", value: "Review; loose stair handrail adds safety context" },
      { label: "Customer", value: "Sam; callback number captured" },
      { label: "Address", value: "Rea Road area, Charlotte" },
      { label: "Job", value: "Sagging side gate latch, loose stair handrail, two shelves to mount" },
      { label: "Pricing", value: "No final labor or trip price quoted; minimum-service-call fit needs owner review" },
      { label: "Next step", value: "Owner can skip the tiny single-item call or call back the bundled higher-value job" },
    ] satisfies SummaryRow[],
    customerFollowUp:
      "Thanks, Sam. The shop has your gate, handrail, and shelf details for review. No visit or final price is confirmed yet.",
  },
] as const

const nextSteps = [
  {
    title: "Try demo calls",
    body: "Try the live web voice demo, then review your own call setup before callers are sent to BookedOnCall.",
    href: "/demo-calls",
  },
  {
    title: "Check pricing",
    body: "See the difference between Starter and Pro, included minutes, and how setup works.",
    href: "/pricing",
  },
  {
    title: "Review integrations",
    body: "See how Jobber, Google Calendar, email summaries, and Text / SMS can fit the call flow, plus planned integrations for QuickBooks, Housecall Pro, and ServiceTitan.",
    href: "/integrations",
  },
] as const

const exampleBoundaryNotes = [
  {
    title: "Configured outcomes only",
    body: "A confirmed appointment appears only when that business has reviewed the service, coverage, scheduling permission, and booking rule for that kind of request.",
  },
  {
    title: "Owner review stays available",
    body: "Urgent, pricing-sensitive, out-of-area, unsafe, or unclear jobs come back as owner review, callback, or appointment request instead of a fake promise.",
  },
  {
    title: "Website demos stay separate",
    body: "Website demos and examples do not change calendars, send customer texts, dispatch crews, or create real customer records.",
  },
] as const

export const metadata = buildPageMetadata({
  title: "Example calls",
  description:
    "Structured example call flows for eight trades showing BookedOnCall intake, booking requests, service-area review, urgent escalation, owner summaries, and customer follow-up.",
  path: "/examples",
})

export default function ExamplesPage() {
  return (
    <>
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Example calls", path: "/examples" }])} />
      <StructuredData
        data={buildServiceSchema({
          name: "Structured BookedOnCall example calls",
          description:
            "Example call flows for eight trades businesses showing intake, direct booking, owner-approved booking requests, service-area review, callbacks, and summaries.",
          path: "/examples",
        })}
      />
      <section className="border-b border-slate-800 bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.72fr)] lg:items-end lg:gap-8">
          <div className="grid gap-4 sm:gap-5">
            <p className="w-fit rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-100 sm:px-4 sm:py-1.5 sm:text-sm">
              Examples
            </p>
            <div className="grid gap-4">
              <h1 className="max-w-4xl text-2xl font-black leading-tight text-white sm:text-5xl">
                See how calls move from intake to the right owner-approved outcome.
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-lg sm:leading-8">
                One best showcase per supported trade: emergency escalation, direct booking when rules allow, owner review, route review, measured estimates, and clean callbacks.
              </p>
              <p className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold leading-6 text-amber-100 sm:p-4 lg:hidden">
                Assumes setup is reviewed: services, coverage, scheduling permissions, alerts, and follow-up rules are in place.
              </p>
            </div>
          </div>
          <div className="hidden rounded-lg border border-white/10 bg-white/[0.04] p-5 lg:flex lg:gap-3">
            <ClipboardList className="mt-1 size-5 shrink-0 text-amber-300" />
            <div className="grid gap-1">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-100">Setup reviewed</p>
              <p className="text-sm leading-6 text-slate-300">
                These examples assume services, coverage, scheduling permissions, alerts, and follow-up rules are in place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">After setup is reviewed</p>
            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">Each example shows a different decision path.</h2>
            <p className="text-base leading-8 text-slate-600">
              The important part is not the script. It is the rule check: service fit, coverage, urgency, scheduling permission, and whether the owner wants final review.
            </p>
            <div className="grid gap-3">
              {exampleBoundaryNotes.map((note) => (
                <article key={note.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-black text-slate-950">{note.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{note.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {exampleCalls.map((call) => (
              <TrackedLink
                key={call.id}
                href={`#${call.id}`}
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "examples_outcome_index", href: `#${call.id}` }}
                className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-amber-300 hover:bg-amber-50"
              >
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">{call.trade}</span>
                <strong className="text-sm leading-5 text-slate-950">{call.outcome}</strong>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          {exampleCalls.map((call) => {
            const Icon = call.icon
            return (
              <article id={call.id} key={call.title} className="scroll-mt-24 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="grid gap-5 border-b border-slate-200 bg-white p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.66fr)] lg:items-start">
                  <div className="grid gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                        {call.trade}
                      </span>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
                        {call.outcome}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">{call.title}</h2>
                    <p className="max-w-3xl text-base leading-7 text-slate-600">{call.situation}</p>
                  </div>
                  <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 lg:sticky lg:top-24">
                    <div className="flex items-center gap-2">
                      <Icon className="size-5 text-amber-600" />
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Caller outcome</span>
                    </div>
                    <p className="text-base font-bold leading-7 text-slate-950">{call.outcomeDetail}</p>
                  </div>
                </div>

                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)]">
                  <div className="grid content-start gap-4">
                    <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-amber-600" />
                        <h3 className="text-xl font-black text-slate-950">Decision path</h3>
                      </div>
                      <ol className="grid gap-2 text-sm leading-7 text-slate-700">
                        {call.checks.map((item, index) => (
                          <li key={item} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md bg-white p-3">
                            <span className="grid size-7 place-items-center rounded-full border border-amber-200 bg-amber-50 text-xs font-black text-amber-800">
                              {index + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <details className="group overflow-hidden rounded-lg border border-slate-200 bg-white">
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-black text-slate-950 marker:hidden">
                        <span className="flex items-center gap-2">
                          <PhoneCall className="size-4 text-amber-600" />
                          View sample conversation
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-amber-700 transition group-open:rotate-90" />
                      </summary>
                      <div className="grid gap-3 border-t border-slate-200 bg-slate-50 p-4">
                        {call.transcript.map((turn, index) => (
                          <p
                            key={`${call.title}-${turn.speaker}-${index}`}
                            className={`max-w-[94%] rounded-lg px-4 py-3 text-sm leading-7 ${
                              turn.speaker === "BookedOnCall"
                                ? "border border-slate-200 bg-white text-slate-700"
                                : "justify-self-end bg-amber-100 text-amber-950"
                            }`}
                          >
                            <strong className="block text-xs uppercase tracking-[0.12em] text-slate-500">{turn.speaker}</strong>
                            {turn.line}
                          </p>
                        ))}
                      </div>
                    </details>
                  </div>

                  <div className="grid content-start gap-4">
                    <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-5">
                      <div className="flex items-center gap-2">
                        <MailCheck className="size-4 text-amber-600" />
                        <h3 className="text-xl font-black text-slate-950">Owner summary</h3>
                      </div>
                      <dl className="grid gap-3 text-sm leading-7 sm:grid-cols-2">
                        {call.ownerSummary.map((row) => (
                          <div key={row.label} className="grid gap-1 rounded-md border border-slate-200 bg-slate-50 p-3">
                            <dt className="font-bold text-slate-950">{row.label}</dt>
                            <dd className="text-slate-600">{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-start">
                      <MessageSquareText className="mt-1 size-5 shrink-0 text-amber-600" />
                      <div>
                        <h3 className="text-base font-black text-slate-950">Customer follow-up text or email</h3>
                        <p className="mt-1 text-sm leading-7 text-slate-600">{call.customerFollowUp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Why this structure matters</p>
            <h2 className="mb-4 text-3xl font-black text-slate-950">The assistant should never fake certainty.</h2>
            <p className="text-base leading-8 text-slate-600">
              A good call does not just sound polite. It knows when to request owner confirmation, when to escalate urgency, when to avoid quoting, and when to hand the job back with clean details.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Buyer path</p>
            <div className="grid gap-3">
              {nextSteps.map((step) => (
                <TrackedLink
                  key={step.title}
                  href={step.href}
                  eventName="marketing_cta_clicked"
                  eventPayload={{ placement: "examples_next_step", href: step.href }}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-amber-300 hover:bg-amber-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid gap-1">
                      <h3 className="text-lg font-black text-slate-950">{step.title}</h3>
                      <p className="text-sm leading-6 text-slate-600">{step.body}</p>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-amber-700" />
                  </div>
                </TrackedLink>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CtaBand
        title="Ready to turn example calls into your setup?"
        body="Start with the plan that fits, review the call flow, and go live only when it sounds right."
      />
    </>
  )
}

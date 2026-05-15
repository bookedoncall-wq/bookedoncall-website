export const providerSecretMessage =
  "Do not paste provider credentials, API keys, client secrets, tokens, tenant IDs, app keys, webhook signing secrets, or booking-provider tags into this public form. Tell us who can review access instead."

const providerSecretLikePatterns = [
  /\b(api[_ -]?key|client[_ -]?secret|access[_ -]?token|refresh[_ -]?token|webhook[_ -]?(?:signing[_ -]?)?secret|app[_ -]?key|private[_ -]?key)\b\s*[:=]\s*['"]?[A-Za-z0-9._~+/=-]{12,}/i,
  /\b(?:tenant[_ -]?id|booking[_ -]?provider(?:[_ -]?tag)?)\b\s*[:=]\s*['"]?[A-Za-z0-9._~+/=-]{4,}/i,
  /\bBearer\s+[A-Za-z0-9._~+/=-]{12,}/i,
  /\b(?:sk|pk)_(?:live|test)_[A-Za-z0-9]{12,}\b/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
]

const housecallProRoadmapInterest = {
  provider: "Housecall Pro",
  leadType: "Housecall Pro roadmap interest",
  title: "Share Housecall Pro interest",
  description:
    "Tell us you use Housecall Pro and which possible future BookedOnCall workflow would matter most. This is roadmap interest, not a live integration request. Do not send provider credentials through this public form.",
  include: [
    "Whether your office uses Housecall Pro today.",
    "Whether callback handoff, office-reviewed scheduling, or cleaner call notes would matter most.",
    "Which trade, call volume, or workflow would make this future integration valuable."
  ],
  placeholder:
    "Tell us how your office uses Housecall Pro today and which possible future workflow would matter most. Do not paste API keys, webhook secrets, or credentials."
} as const

const serviceTitanRoadmapInterest = {
  provider: "ServiceTitan",
  leadType: "ServiceTitan roadmap interest",
  title: "Share ServiceTitan interest",
  description:
    "Tell us you use ServiceTitan and which possible future BookedOnCall workflow would matter most. This is roadmap interest, not a live integration request. Do not send provider credentials through this public form.",
  include: [
    "Whether your office uses ServiceTitan today.",
    "Whether callback handoff, CSR-reviewed scheduling, or cleaner call notes would matter most.",
    "Which trade, team size, or dispatch workflow would make this future integration valuable."
  ],
  placeholder:
    "Tell us how your office uses ServiceTitan today and which possible future workflow would matter most. Do not paste tenant IDs, client secrets, app keys, booking-provider tags, or credentials."
} as const

export const integrationReviewCopy = {
  "housecall-pro-roadmap-interest": housecallProRoadmapInterest,
  "housecall-pro-integration-review": housecallProRoadmapInterest,
  "servicetitan-roadmap-interest": serviceTitanRoadmapInterest,
  "servicetitan-integration-review": serviceTitanRoadmapInterest
} as const

export function normalizeLeadSource(value: string | null | undefined) {
  return (value || "website-form").trim().toLowerCase()
}

export function getIntegrationReviewCopy(source: string | null | undefined) {
  return integrationReviewCopy[normalizeLeadSource(source) as keyof typeof integrationReviewCopy] || null
}

export function containsProviderSecretLikeContent(value: string) {
  return providerSecretLikePatterns.some((pattern) => pattern.test(value))
}

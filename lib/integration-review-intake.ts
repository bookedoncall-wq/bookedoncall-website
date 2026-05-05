export const providerSecretMessage =
  "Do not paste provider credentials, API keys, client secrets, tokens, tenant IDs, app keys, webhook signing secrets, or booking-provider tags into this public form. Tell us who can review access instead."

const providerSecretLikePatterns = [
  /\b(api[_ -]?key|client[_ -]?secret|access[_ -]?token|refresh[_ -]?token|webhook[_ -]?(?:signing[_ -]?)?secret|app[_ -]?key|private[_ -]?key)\b\s*[:=]\s*['"]?[A-Za-z0-9._~+/=-]{12,}/i,
  /\b(?:tenant[_ -]?id|booking[_ -]?provider(?:[_ -]?tag)?)\b\s*[:=]\s*['"]?[A-Za-z0-9._~+/=-]{4,}/i,
  /\bBearer\s+[A-Za-z0-9._~+/=-]{12,}/i,
  /\b(?:sk|pk)_(?:live|test)_[A-Za-z0-9]{12,}\b/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
]

export const integrationReviewCopy = {
  "housecall-pro-integration-review": {
    provider: "Housecall Pro",
    title: "Request Housecall Pro review",
    description:
      "Use this request to confirm whether your shop is a fit for a guided Housecall Pro review. Do not send provider credentials through this public form.",
    include: [
      "Whether your shop is on a Housecall Pro MAX plan or can confirm API/webhook eligibility.",
      "Who the owner or admin contact is for reviewing access later.",
      "Whether you want callback handoff or owner-reviewed job creation as the first workflow."
    ],
    placeholder:
      "Tell us whether you have Housecall Pro MAX/API or webhook eligibility, who can review access, and whether you want callback handoff or owner-reviewed job creation first. Do not paste API keys, webhook secrets, or credentials."
  },
  "servicetitan-integration-review": {
    provider: "ServiceTitan",
    title: "Request ServiceTitan review",
    description:
      "Use this request to confirm whether your ServiceTitan workflow is a fit for a tenant-admin guided review. Do not send provider credentials through this public form.",
    include: [
      "Whether a ServiceTitan tenant admin can participate in a review.",
      "Whether the first workflow should be callback handoff or CSR-reviewed booking intake.",
      "Whether Scheduling Pro, booking-provider setup, job types, business units, or campaign mapping matter for your workflow."
    ],
    placeholder:
      "Tell us who can review ServiceTitan access, whether you want callback handoff or CSR-reviewed booking intake first, and what workflow rules matter. Do not paste tenant IDs, client secrets, app keys, booking-provider tags, or credentials."
  }
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

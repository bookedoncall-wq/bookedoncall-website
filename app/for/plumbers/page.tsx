import { UseCasePage } from "@/components/marketing/UseCasePage"
import { useCasePages } from "@/config/marketing"
import { buildPageMetadata } from "@/lib/seo"

const content = useCasePages.plumbers

export const metadata = buildPageMetadata({
  title: "For plumbing businesses",
  description: content.summary,
  path: content.path,
})

export default function PlumbersPage() {
  return <UseCasePage crumbLabel="For plumbers" path={content.path} content={content} />
}

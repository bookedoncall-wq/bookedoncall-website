import { UseCasePage } from "@/components/marketing/UseCasePage"
import { useCasePages } from "@/config/marketing"
import { buildPageMetadata } from "@/lib/seo"

const content = useCasePages.landscaping

export const metadata = buildPageMetadata({
  title: "For landscaping businesses",
  description: content.summary,
  path: content.path,
})

export default function LandscapingPage() {
  return <UseCasePage crumbLabel="For landscaping" path={content.path} content={content} />
}

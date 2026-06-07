import { UseCasePage } from "@/components/marketing/UseCasePage"
import { useCasePages } from "@/config/marketing"
import { buildPageMetadata } from "@/lib/seo"

const content = useCasePages.roofing

export const metadata = buildPageMetadata({
  title: "For roofing companies",
  description: content.summary,
  path: content.path,
})

export default function RoofingPage() {
  return <UseCasePage crumbLabel="For roofing" path={content.path} content={content} />
}

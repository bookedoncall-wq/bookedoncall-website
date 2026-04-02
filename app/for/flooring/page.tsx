import { UseCasePage } from "@/components/marketing/UseCasePage"
import { useCasePages } from "@/config/marketing"
import { buildPageMetadata } from "@/lib/seo"

const content = useCasePages.flooring

export const metadata = buildPageMetadata({
  title: "For flooring contractors",
  description: content.summary,
  path: content.path,
})

export default function FlooringPage() {
  return <UseCasePage crumbLabel="For flooring" path={content.path} content={content} />
}

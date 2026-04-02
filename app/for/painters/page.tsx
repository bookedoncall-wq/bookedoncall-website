import { UseCasePage } from "@/components/marketing/UseCasePage"
import { useCasePages } from "@/config/marketing"
import { buildPageMetadata } from "@/lib/seo"

const content = useCasePages.painters

export const metadata = buildPageMetadata({
  title: "For painting businesses",
  description: content.summary,
  path: content.path,
})

export default function PaintersPage() {
  return <UseCasePage crumbLabel="For painters" path={content.path} content={content} />
}

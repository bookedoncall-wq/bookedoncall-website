import { UseCasePage } from "@/components/marketing/UseCasePage"
import { useCasePages } from "@/config/marketing"
import { buildPageMetadata } from "@/lib/seo"

const content = useCasePages.electricians

export const metadata = buildPageMetadata({
  title: "For electrical contractors",
  description: content.summary,
  path: content.path,
})

export default function ElectriciansPage() {
  return <UseCasePage crumbLabel="For electricians" path={content.path} content={content} />
}

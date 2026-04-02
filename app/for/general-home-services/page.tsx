import { UseCasePage } from "@/components/marketing/UseCasePage"
import { useCasePages } from "@/config/marketing"
import { buildPageMetadata } from "@/lib/seo"

const content = useCasePages["general-home-services"]

export const metadata = buildPageMetadata({
  title: "For general home-service businesses",
  description: content.summary,
  path: content.path,
})

export default function GeneralHomeServicesPage() {
  return <UseCasePage crumbLabel="For general home services" path={content.path} content={content} />
}

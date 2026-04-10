import Link from "next/link"
import { roadmapDisclaimer } from "@/config/marketing"

type RoadmapFootnoteProps = {
  className?: string
}

export function RoadmapFootnote({ className = "" }: RoadmapFootnoteProps) {
  return (
    <p className={`text-sm leading-7 text-slate-500 ${className}`.trim()}>
      <span className="font-bold text-amber-700">*</span> {roadmapDisclaimer} See{" "}
      <Link href="/terms#roadmap-and-coming-soon-statements" className="font-semibold text-amber-700 underline decoration-amber-300 underline-offset-4">
        Terms
      </Link>
      .
    </p>
  )
}

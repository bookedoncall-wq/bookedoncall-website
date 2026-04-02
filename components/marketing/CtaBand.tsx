import { buildAppStartHref, siteConfig } from "@/config/site"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

type CtaBandProps = {
  title: string
  body: string
}

export function CtaBand({ title, body }: CtaBandProps) {
  return (
    <section className="bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-4xl gap-6 text-center">
        <h2 className="text-3xl font-black text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">{body}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <TrackedLink
            href={buildAppStartHref(undefined, "website-cta-band")}
            eventName="checkout_started"
            eventPayload={{ placement: "cta_band_primary" }}
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-xl border-transparent bg-amber-500 px-6 text-white hover:bg-amber-400"
            )}
          >
            Start in app
          </TrackedLink>
          <TrackedLink
            href={`mailto:${siteConfig.email}`}
            eventName="contact_sales_clicked"
            eventPayload={{ placement: "cta_band_secondary" }}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-xl border-slate-700 bg-transparent px-6 text-white hover:bg-slate-900"
            )}
          >
            Contact sales
          </TrackedLink>
        </div>
      </div>
    </section>
  )
}

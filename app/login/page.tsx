import { ArrowRight } from "lucide-react"
import { PageIntro } from "@/components/marketing/PageIntro"
import { TrackedLink } from "@/components/marketing/TrackedLink"
import { buildLeadFormHref, customerLoginUrl, siteConfig } from "@/config/site"
import { buildPageMetadata } from "@/lib/seo"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

export const metadata = buildPageMetadata({
  title: "Customer login",
  description: "Existing customers can use the BookedOnCall app to sign in, finish onboarding, and manage their dashboard.",
  path: "/login",
})

export default function LoginPage() {
  return (
    <>
      <PageIntro
        eyebrow="Existing customers"
        title="Log in to your BookedOnCall dashboard."
        description="If you already have a BookedOnCall account, use the app to sign in, finish onboarding, or manage your business settings."
      />

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="grid gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-3">
              <h2 className="text-3xl font-black text-slate-950">Use the app for sign-in and onboarding.</h2>
              <p className="text-base leading-7 text-slate-600">
                Existing customers should use the BookedOnCall app for login, onboarding, and dashboard access. If you were sent to finish setup after checkout, the app will route you to the right place after you sign in.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={customerLoginUrl}
                eventName="marketing_cta_clicked"
                eventPayload={{ placement: "login_primary", href: customerLoginUrl }}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-xl border-transparent bg-slate-950 px-6 text-white hover:bg-slate-800"
                )}
              >
                Go to customer login
              </TrackedLink>
              <TrackedLink
                href={buildLeadFormHref(undefined, "website-login-page")}
                eventName="signup_started"
                eventPayload={{ placement: "login_secondary" }}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-xl border-slate-300 px-6 text-slate-950 hover:bg-white"
                )}
              >
                Talk to us
              </TrackedLink>
            </div>
            <p className="text-sm leading-6 text-slate-500">
              New to BookedOnCall? Start on the website. Existing customers use the app.
            </p>
          </article>

          <aside className="grid gap-4">
            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">What happens after you sign in</h2>
              <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                <li>You land in the dashboard if your account is already set up.</li>
                <li>If you are mid-onboarding, the app can send you back to finish setup.</li>
                <li>If your account has access to more than one business, you can choose the workspace you want to manage.</li>
              </ul>
            </article>

            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-black text-slate-950">Need help getting in?</h2>
              <p className="text-base leading-7 text-slate-600">
                If your onboarding link is stale or you are not sure which email was used, contact {siteConfig.email} and we will help you get back into the right account.
              </p>
              <TrackedLink
                href={buildLeadFormHref(undefined, "website-login-help")}
                eventName="signup_started"
                eventPayload={{ placement: "login_help" }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-amber-700"
              >
                Talk to us
                <ArrowRight className="size-4" />
              </TrackedLink>
            </article>
          </aside>
        </div>
      </section>
    </>
  )
}

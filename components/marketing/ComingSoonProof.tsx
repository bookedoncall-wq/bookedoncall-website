import { comingSoonProofItems } from "@/config/marketing"

type ComingSoonProofProps = {
  eyebrow?: string
  title: string
  description: string
}

export function ComingSoonProof({ eyebrow = "Coming soon", title, description }: ComingSoonProofProps) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8">
        <div className="grid gap-4 text-center">
          <p className="mx-auto w-fit rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-800">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-black text-slate-950">{title}</h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {comingSoonProofItems.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Coming soon
              </div>
              <h3 className="mb-3 text-xl font-black text-slate-950">{item.title}</h3>
              <p className="text-base leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

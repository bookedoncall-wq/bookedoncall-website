type PageIntroProps = {
  eyebrow?: string
  title: string
  description: string
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-slate-100 bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-4xl gap-5 text-center">
        {eyebrow ? (
          <p className="mx-auto w-fit rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-800">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">{title}</h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
      </div>
    </section>
  )
}

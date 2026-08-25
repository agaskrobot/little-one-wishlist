import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SignupForm } from "@/components/landing/signup-form";
import { IconGift, IconLink, IconShare, IconHeart } from "@/components/icons";
import { notFound } from "next/navigation";

const stepIcons = [IconLink, IconGift, IconShare];

export default async function LandingPage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { hero, howItWorks, why, faq } = dict.landing;

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 right-[-4rem] h-56 w-56 rounded-full bg-peach-200/60 blur-2xl animate-float-slow"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-40 left-[-3rem] h-40 w-40 rounded-full bg-sage-200/50 blur-2xl animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="relative mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-100 px-3.5 py-1.5 text-xs font-semibold text-blush-600">
              <IconHeart className="h-3.5 w-3.5" />
              {hero.eyebrow}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-ink-700 sm:text-5xl">
              {hero.title}{" "}
              <span className="text-blush-500">{hero.titleHighlight}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg">
              {hero.subtitle}
            </p>
            <a
              href="#start"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-blush-600 underline decoration-blush-300 underline-offset-4"
            >
              {hero.scrollCta}
              <span aria-hidden>↓</span>
            </a>
          </div>

          <SignupForm lang={lang} dict={dict} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6" id="how">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold text-ink-700 sm:text-3xl">
              {howItWorks.title}
            </h2>
            <p className="mt-2 text-ink-500">{howItWorks.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {howItWorks.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? IconGift;
              return (
                <div
                  key={step.title}
                  className="relative rounded-3xl bg-white p-6 shadow-softer ring-1 ring-blush-100"
                >
                  <span className="absolute -top-3 -left-1 flex h-7 w-7 items-center justify-center rounded-full bg-blush-400 text-xs font-bold text-white shadow-softer">
                    {index + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blush-50 text-blush-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink-700">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white/60 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold text-ink-700 sm:text-3xl">
              {why.title}
            </h2>
            <p className="mt-2 text-ink-500">{why.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {why.items.map((item) => (
              <div key={item.title} className="rounded-3xl bg-cream p-6">
                <h3 className="font-display text-base font-semibold text-ink-700">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-2xl font-bold text-ink-700 sm:text-3xl">
            {faq.title}
          </h2>
          <div className="mt-8 space-y-3">
            {faq.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl bg-white p-5 shadow-softer ring-1 ring-blush-100"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink-700">
                  {item.q}
                  <span className="ml-4 text-blush-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

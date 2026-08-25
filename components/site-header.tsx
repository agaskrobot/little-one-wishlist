import Link from "next/link";
import { LocaleSwitcher } from "./locale-switcher";
import { IconBabyBottle } from "./icons";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionary-type";

export function SiteHeader({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-blush-100/70 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 font-display text-lg font-bold text-ink-700"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-200 text-ink-700">
            <IconBabyBottle className="h-5 w-5" />
          </span>
          {dict.common.brand}
        </Link>
        <LocaleSwitcher currentLocale={lang} langNames={dict.common.langNames} />
      </div>
    </header>
  );
}

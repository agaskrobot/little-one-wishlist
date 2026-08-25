"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n/config";
import type { Locale } from "@/lib/types";

const FLAGS: Record<Locale, string> = {
  pl: "🇵🇱",
  en: "🇬🇧",
  es: "🇪🇸",
};

export function LocaleSwitcher({
  currentLocale,
  langNames,
}: {
  currentLocale: Locale;
  langNames: Record<Locale, string>;
}) {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/");
  segments[1] = "";

  return (
    <div className="flex items-center gap-1 rounded-full bg-white/70 p-1 shadow-softer ring-1 ring-blush-100">
      {locales.map((locale) => {
        const targetSegments = [...segments];
        targetSegments[1] = locale;
        const href = targetSegments.join("/") || "/";
        const active = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={href}
            aria-current={active ? "true" : undefined}
            title={langNames[locale]}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
              active
                ? "bg-blush-300 shadow-softer"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <span aria-hidden>{FLAGS[locale]}</span>
            <span className="sr-only">{langNames[locale]}</span>
          </Link>
        );
      })}
    </div>
  );
}

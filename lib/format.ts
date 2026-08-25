import type { Locale } from "./types";

const BCP47: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en-US",
  es: "es-ES",
};

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(BCP47[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

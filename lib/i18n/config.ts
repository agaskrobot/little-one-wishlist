import type { Locale } from "@/lib/types";

export const locales: Locale[] = ["pl", "en", "es"];
export const defaultLocale: Locale = "pl";

export const hasLocale = (value: string): value is Locale =>
  (locales as string[]).includes(value);

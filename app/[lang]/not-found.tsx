import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { IconGift } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blush-100 text-blush-400">
        <IconGift className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink-700">
        {dict.notFound.title}
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-500">
        {dict.notFound.body}
      </p>
      <Link
        href={`/${defaultLocale}`}
        className={buttonClasses("primary", "md", "mt-7")}
      >
        {dict.common.backHome}
      </Link>
    </main>
  );
}

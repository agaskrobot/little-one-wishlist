import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getWishlistByShareToken } from "@/lib/wishlist";
import { t } from "@/lib/i18n/dictionary-type";
import { PublicItemRow } from "@/components/list/public-item-row";
import { IconGift } from "@/components/icons";
import { NotFoundCard } from "@/components/not-found-card";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PublicListPage({
  params,
}: PageProps<"/[lang]/list/[shareToken]">) {
  const { lang, shareToken } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const wishlist = await getWishlistByShareToken(shareToken);
  if (!wishlist) return <NotFoundCard dict={dict} locale={lang} />;
  const pathname = `/${lang}/list/${shareToken}`;
  const header = dict.list.header;

  // Purchased items are folded into "reserved" here — guests never see
  // that a gift was purchased, only that it's no longer available.
  const available = wishlist.items.filter(
    (item) => !item.reservation && !item.purchasedAt
  );
  const reserved = wishlist.items.filter(
    (item) => item.reservation || item.purchasedAt
  );
  const sections = [
    { key: "available", label: dict.list.sections.available, items: available },
    { key: "reserved", label: dict.list.sections.reserved, items: reserved },
  ] as const;

  return (
    <main className="flex-1 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-ink-700 sm:text-3xl">
            {t(header.title, { babyName: wishlist.babyName })}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
            {header.subtitle}
          </p>
        </div>

        {wishlist.items.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-3xl bg-white/60 px-6 py-14 text-center ring-1 ring-dashed ring-blush-200">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush-50 text-blush-400">
              <IconGift className="h-6 w-6" />
            </span>
            <p className="mt-3 font-medium text-ink-600">
              {dict.list.empty.title}
            </p>
            <p className="mt-1 text-sm text-ink-400">{dict.list.empty.body}</p>
          </div>
        ) : (
          sections
            .filter((section) => section.items.length > 0)
            .map((section) => (
              <div key={section.key} className="mt-8">
                <h2 className="text-sm font-semibold text-ink-500">
                  {t(section.label, { count: String(section.items.length) })}
                </h2>
                <ul className="mt-3 space-y-3">
                  {section.items.map((item) => (
                    <PublicItemRow
                      key={item.id}
                      item={item}
                      shareToken={shareToken}
                      pathname={pathname}
                      dict={dict}
                    />
                  ))}
                </ul>
              </div>
            ))
        )}

        <p className="mt-10 text-center text-xs text-ink-300">
          {dict.list.footer}
        </p>
      </div>
    </main>
  );
}

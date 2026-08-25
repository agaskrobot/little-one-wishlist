import { notFound } from "next/navigation";
import QRCode from "qrcode";
import type { Metadata } from "next";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getWishlistByEditToken } from "@/lib/wishlist";
import { getBaseUrl } from "@/lib/url";
import { formatDate } from "@/lib/format";
import { t } from "@/lib/i18n/dictionary-type";
import { ShareDialog } from "@/components/edit/share-dialog";
import { AddItemForm } from "@/components/edit/add-item-form";
import { ItemRow } from "@/components/edit/item-row";
import { IconGift } from "@/components/icons";
import { NotFoundCard } from "@/components/not-found-card";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function EditPage({
  params,
}: PageProps<"/[lang]/edit/[editToken]">) {
  const { lang, editToken } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const wishlist = await getWishlistByEditToken(editToken);
  if (!wishlist) return <NotFoundCard dict={dict} locale={lang} />;
  const baseUrl = await getBaseUrl();
  const shareUrl = `${baseUrl}/${lang}/list/${wishlist.shareToken}`;
  const qrDataUrl = await QRCode.toDataURL(shareUrl, {
    width: 352,
    margin: 1,
    color: { dark: "#4a2c39", light: "#ffffff" },
  });
  const pathname = `/${lang}/edit/${editToken}`;

  const header = dict.edit.header;
  const itemsDict = dict.edit.items;

  return (
    <main className="flex-1 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-700 sm:text-3xl">
              {t(header.title, { babyName: wishlist.babyName })}
            </h1>
            <p className="mt-1 text-sm text-ink-400">{header.subtitle}</p>
            <p className="mt-1 text-xs text-ink-300">
              {t(header.expiresLabel, {
                date: formatDate(wishlist.expiresAt, lang),
              })}
            </p>
          </div>
          <ShareDialog
            babyName={wishlist.babyName}
            shareUrl={shareUrl}
            qrDataUrl={qrDataUrl}
            dict={dict}
          />
        </div>

        <div className="mt-3 rounded-xl bg-peach-100/70 px-4 py-2.5 text-xs leading-relaxed text-ink-500">
          {dict.edit.editLinkWarning}
        </div>

        <div className="mt-8">
          <AddItemForm editToken={editToken} pathname={pathname} dict={dict} />
        </div>

        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ink-700">
            {t(itemsDict.title, { count: String(wishlist.items.length) })}
          </h2>

          {wishlist.items.length === 0 ? (
            <div className="mt-4 flex flex-col items-center rounded-3xl bg-white/60 px-6 py-12 text-center ring-1 ring-dashed ring-blush-200">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush-50 text-blush-400">
                <IconGift className="h-6 w-6" />
              </span>
              <p className="mt-3 font-medium text-ink-600">
                {itemsDict.emptyTitle}
              </p>
              <p className="mt-1 text-sm text-ink-400">{itemsDict.emptyBody}</p>
            </div>
          ) : (
            (() => {
              const reversed = [...wishlist.items].reverse();
              const available = reversed.filter(
                (item) => !item.isPrivate && !item.reservation && !item.purchasedAt
              );
              const reserved = reversed.filter(
                (item) => !item.isPrivate && item.reservation && !item.purchasedAt
              );
              const purchased = reversed.filter(
                (item) => !item.isPrivate && item.purchasedAt
              );
              const privateItems = reversed.filter((item) => item.isPrivate);
              const sections = [
                { key: "available", label: itemsDict.sections.available, items: available },
                { key: "reserved", label: itemsDict.sections.reserved, items: reserved },
                { key: "purchased", label: itemsDict.sections.purchased, items: purchased },
                { key: "private", label: itemsDict.sections.private, items: privateItems },
              ] as const;

              return sections
                .filter((section) => section.items.length > 0)
                .map((section) => (
                  <div key={section.key} className="mt-6 first:mt-4">
                    <h3 className="text-sm font-semibold text-ink-500">
                      {t(section.label, { count: String(section.items.length) })}
                    </h3>
                    <ul className="mt-3 space-y-3">
                      {section.items.map((item) => (
                        <ItemRow
                          key={item.id}
                          item={item}
                          editToken={editToken}
                          pathname={pathname}
                          dict={dict}
                        />
                      ))}
                    </ul>
                  </div>
                ));
            })()
          )}
        </div>
      </div>
    </main>
  );
}

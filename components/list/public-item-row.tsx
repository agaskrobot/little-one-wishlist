import { ReserveItem } from "./reserve-item";
import { IconExternal, IconHeart } from "@/components/icons";
import type { WishlistItem } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionary-type";

export function PublicItemRow({
  item,
  shareToken,
  pathname,
  dict,
}: {
  item: WishlistItem;
  shareToken: string;
  pathname: string;
  dict: Dictionary;
}) {
  // A purchased item is treated exactly like a reserved one here — guests
  // only ever see "available" or "reserved", never that it was purchased.
  const taken = Boolean(item.reservation || item.purchasedAt);

  return (
    <li
      className={`flex flex-col gap-3 rounded-2xl p-4 shadow-softer ring-1 sm:flex-row sm:items-center sm:justify-between ${
        taken ? "bg-blush-50/60 ring-blush-200" : "bg-white ring-blush-100"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {item.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt=""
            loading="lazy"
            className={`h-24 w-24 shrink-0 rounded-2xl object-cover ring-1 md:h-32 md:w-32 lg:h-40 lg:w-40 ${
              taken ? "opacity-60 ring-blush-200" : "ring-blush-100"
            }`}
          />
        )}
        <div className="min-w-0 flex-1">
          <p
            className={`font-medium ${
              taken ? "text-ink-400 line-through" : "text-ink-700"
            }`}
          >
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full min-w-0 items-center gap-1 hover:text-blush-600 hover:underline"
              >
                <span className="truncate">{item.title}</span>
                <IconExternal className="h-3.5 w-3.5 shrink-0" />
              </a>
            ) : (
              <span className="block truncate">{item.title}</span>
            )}
          </p>
          {item.price && (
            <p
              className={`mt-0.5 text-base font-semibold ${
                taken ? "text-ink-400" : "text-ink-700"
              }`}
            >
              {item.price}
            </p>
          )}
          {item.note && (
            <div className="mt-1 text-xs italic text-ink-400">{item.note}</div>
          )}
        </div>
      </div>

      <div className="shrink-0 self-start sm:self-center">
        {taken ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-100 px-3 py-1.5 text-xs font-medium text-blush-600">
            <IconHeart className="h-3.5 w-3.5" />
            {dict.list.item.reservedBadge}
          </span>
        ) : (
          <ReserveItem
            shareToken={shareToken}
            itemId={item.id}
            pathname={pathname}
            dict={dict}
          />
        )}
      </div>
    </li>
  );
}

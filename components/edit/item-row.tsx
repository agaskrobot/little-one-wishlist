"use client";

import { useState, useTransition } from "react";
import {
  removeItemAction,
  cancelReservationAction,
  setItemPurchasedAction,
  setItemPrivateAction,
} from "@/lib/actions";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import {
  IconTrash,
  IconUndo,
  IconExternal,
  IconCheck,
  IconHeart,
  IconEye,
  IconEyeOff,
} from "@/components/icons";
import type { WishlistItem } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionary-type";

export function ItemRow({
  item,
  editToken,
  pathname,
  dict,
}: {
  item: WishlistItem;
  editToken: string;
  pathname: string;
  dict: Dictionary;
}) {
  const items = dict.edit.items;
  const [pending, startTransition] = useTransition();
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [confirmCancelReservation, setConfirmCancelReservation] =
    useState(false);

  function handleRemove() {
    startTransition(async () => {
      await removeItemAction(editToken, item.id, pathname);
      setConfirmRemove(false);
    });
  }

  function handleCancelReservation() {
    startTransition(async () => {
      await cancelReservationAction(editToken, item.id, pathname);
      setConfirmCancelReservation(false);
    });
  }

  function handleTogglePurchased() {
    startTransition(async () => {
      await setItemPurchasedAction(editToken, item.id, !item.purchasedAt, pathname);
    });
  }

  function handleTogglePrivate() {
    startTransition(async () => {
      await setItemPrivateAction(editToken, item.id, !item.isPrivate, pathname);
    });
  }

  return (
    <li className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-softer ring-1 ring-blush-100">
      <div className="flex min-w-0 items-center gap-3">
        {item.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt=""
            loading="lazy"
            className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-1 ring-blush-100 md:h-32 md:w-32 lg:h-40 lg:w-40"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="font-medium text-ink-700">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-blush-600 hover:underline"
              >
                {item.title}
                <IconExternal className="h-3.5 w-3.5 shrink-0" />
              </a>
            ) : (
              item.title
            )}
          </p>
          {item.price && (
            <p className="mt-0.5 text-base font-semibold text-ink-700">
              {item.price}
            </p>
          )}
          {item.note && (
            <div className="mt-1 text-xs italic text-ink-400">{item.note}</div>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {item.purchasedAt ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-300/30 px-2.5 py-1 text-xs font-medium text-ink-700">
                <IconCheck className="h-3.5 w-3.5" />
                {items.purchasedBadge}
              </span>
            ) : item.reservation ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-100 px-2.5 py-1 text-xs font-medium text-blush-600">
                <IconHeart className="h-3.5 w-3.5" />
                {items.reservedBy}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-500">
                {items.notReserved}
              </span>
            )}
            {item.isPrivate && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-300/20 px-2.5 py-1 text-xs font-medium text-ink-500">
                <IconEyeOff className="h-3.5 w-3.5" />
                {items.privateBadge}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-blush-100 pt-3 sm:justify-end">
        <button
          type="button"
          onClick={handleTogglePurchased}
          disabled={pending}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition disabled:opacity-60 ${
            item.purchasedAt
              ? "bg-cream text-ink-500 ring-blush-100 hover:bg-blush-50"
              : "bg-peach-100 text-ink-600 ring-peach-200 hover:bg-peach-200"
          }`}
        >
          {item.purchasedAt ? (
            <IconUndo className="h-3.5 w-3.5" />
          ) : (
            <IconCheck className="h-3.5 w-3.5" />
          )}
          {item.purchasedAt ? items.undoPurchaseButton : items.markPurchasedButton}
        </button>
        <button
          type="button"
          onClick={handleTogglePrivate}
          disabled={pending}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition disabled:opacity-60 ${
            item.isPrivate
              ? "bg-ink-300/20 text-ink-500 ring-ink-300/40 hover:bg-ink-300/30"
              : "bg-cream text-ink-500 ring-blush-100 hover:bg-blush-50"
          }`}
        >
          {item.isPrivate ? (
            <IconEye className="h-3.5 w-3.5" />
          ) : (
            <IconEyeOff className="h-3.5 w-3.5" />
          )}
          {item.isPrivate ? items.makePublicButton : items.makePrivateButton}
        </button>
        {!item.purchasedAt && item.reservation && (
          <button
            type="button"
            onClick={() => setConfirmCancelReservation(true)}
            disabled={pending}
            className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink-500 ring-1 ring-blush-100 transition hover:bg-blush-50 disabled:opacity-60"
          >
            <IconUndo className="h-3.5 w-3.5" />
            {items.cancelReservationButton}
          </button>
        )}
        <button
          type="button"
          onClick={() => setConfirmRemove(true)}
          disabled={pending}
          className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-red-400 ring-1 ring-red-100 transition hover:bg-red-50 disabled:opacity-60"
        >
          <IconTrash className="h-3.5 w-3.5" />
          {items.removeButton}
        </button>
      </div>

      <ConfirmModal
        open={confirmRemove}
        onClose={() => setConfirmRemove(false)}
        onConfirm={handleRemove}
        title={items.removeConfirmTitle}
        body={items.removeConfirmBody}
        confirmLabel={items.removeButton}
        cancelLabel={dict.common.cancel}
        pending={pending}
        danger
      />
      <ConfirmModal
        open={confirmCancelReservation}
        onClose={() => setConfirmCancelReservation(false)}
        onConfirm={handleCancelReservation}
        title={items.cancelReservationConfirmTitle}
        body={items.cancelReservationConfirmBody}
        confirmLabel={items.cancelReservationButton}
        cancelLabel={dict.common.cancel}
        pending={pending}
      />
    </li>
  );
}

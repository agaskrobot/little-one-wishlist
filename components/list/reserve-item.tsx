"use client";

import { useActionState, useState } from "react";
import { reserveItemAction } from "@/lib/actions";
import { initialReserveItemState } from "@/lib/action-states";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionary-type";

export function ReserveItem({
  shareToken,
  itemId,
  pathname,
  dict,
}: {
  shareToken: string;
  itemId: string;
  pathname: string;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    reserveItemAction,
    initialReserveItemState
  );
  const listDict = dict.list;
  const dialog = listDict.reserveDialog;

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        {listDict.item.reserveButton}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={dialog.title}
        closeLabel={dialog.cancel}
      >
        <form action={formAction}>
          <input type="hidden" name="shareToken" value={shareToken} />
          <input type="hidden" name="itemId" value={itemId} />
          <input type="hidden" name="pathname" value={pathname} />

          <p className="text-sm leading-relaxed text-ink-500">
            {dialog.body}
          </p>

          <p className="mt-3 rounded-lg bg-peach-100/70 px-3 py-2 text-xs leading-relaxed text-ink-500">
            {dialog.warning}
          </p>

          {state.status === "error" && (
            <p className="mt-3 text-sm text-red-500">
              {state.reason === "already_reserved"
                ? listDict.errors.alreadyReserved
                : listDict.errors.generic}
            </p>
          )}

          <div className="mt-5 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              {dialog.cancel}
            </Button>
            <Button type="submit" size="sm" disabled={pending}>
              {pending ? dialog.submitting : dialog.confirm}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

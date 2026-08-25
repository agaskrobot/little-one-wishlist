"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IconX } from "../icons";

export function Modal({
  open,
  onClose,
  title,
  children,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  closeLabel: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="w-[min(92vw,26rem)] rounded-3xl bg-white p-0 shadow-soft"
    >
      <div className="flex items-center justify-between border-b border-blush-100 px-5 py-4">
        <h2 className="font-display text-base font-semibold text-ink-700">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition hover:bg-blush-50 hover:text-ink-700"
        >
          <IconX className="h-4 w-4" />
        </button>
      </div>
      <div className="px-5 py-5">{children}</div>
    </dialog>
  );
}

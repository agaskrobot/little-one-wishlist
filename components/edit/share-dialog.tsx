"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { IconShare, IconCopy, IconCheck } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n/dictionary-type";

export function ShareDialog({
  babyName,
  shareUrl,
  qrDataUrl,
  dict,
}: {
  babyName: string;
  shareUrl: string;
  qrDataUrl: string;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const share = dict.edit.share;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context); the link is
      // still selectable as plain text below.
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <IconShare className="h-4 w-4" />
        {share.button}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={share.dialogTitle.replace("{babyName}", babyName)}
        closeLabel={dict.common.close}
      >
        <p className="text-sm leading-relaxed text-ink-500">
          {share.dialogSubtitle}
        </p>

        <div className="mt-5 flex justify-center">
          <div className="rounded-2xl bg-white p-3 shadow-softer ring-1 ring-blush-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt={share.qrHint}
              width={176}
              height={176}
              className="h-44 w-44"
            />
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-ink-300">
          {share.qrHint}
        </p>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-blush-100 bg-cream/60 px-3 py-2">
          <span className="flex-1 truncate text-xs text-ink-500">
            {shareUrl}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-blush-400 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blush-500"
          >
            {copied ? (
              <IconCheck className="h-3.5 w-3.5" />
            ) : (
              <IconCopy className="h-3.5 w-3.5" />
            )}
            {copied ? share.copiedButton : share.copyButton}
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-ink-300">
          {share.friendsWarning}
        </p>
      </Modal>
    </>
  );
}

"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { recoverWishlistAction } from "@/lib/actions";
import { initialRecoverWishlistState } from "@/lib/action-states";
import { t } from "@/lib/i18n/dictionary-type";
import type { Dictionary } from "@/lib/i18n/dictionary-type";
import { Button, buttonClasses } from "@/components/ui/button";
import { CopyLinkBox } from "@/components/landing/signup-form";
import { IconCheck } from "@/components/icons";

export function RecoverForm({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const recover = dict.landing.recover;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 block w-full text-center text-sm text-ink-400 underline decoration-blush-300 underline-offset-4 hover:text-ink-600"
      >
        {recover.toggle}
      </button>
    );
  }

  return (
    <RecoverFormInner
      key={resetKey}
      dict={dict}
      onClose={() => setOpen(false)}
      onRetry={() => setResetKey((k) => k + 1)}
    />
  );
}

function RecoverFormInner({
  dict,
  onClose,
  onRetry,
}: {
  dict: Dictionary;
  onClose: () => void;
  onRetry: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    recoverWishlistAction,
    initialRecoverWishlistState
  );
  const recover = dict.landing.recover;

  if (state.status === "found") {
    return (
      <div className="mt-4 rounded-2xl border border-blush-100 bg-cream/60 p-5">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-sage-500">
          <IconCheck className="h-5 w-5" />
        </div>
        <h4 className="mt-3 text-center font-display text-base font-semibold text-ink-700">
          {recover.foundTitle}
        </h4>
        <p className="mt-1.5 text-center text-sm leading-relaxed text-ink-500">
          {t(recover.foundBody, { email: state.email ?? "" })}
        </p>
        {state.editUrl && (
          <CopyLinkBox
            url={state.editUrl}
            label={recover.linkLabel}
            copyLabel={recover.copyButton}
            copiedLabel={recover.copiedButton}
          />
        )}
        <div className="mt-4 flex flex-col items-center gap-2.5">
          {state.editUrl && (
            <Link
              href={state.editUrl}
              className={buttonClasses("primary", "md", "w-full")}
            >
              {recover.goToList}
            </Link>
          )}
          <button
            type="button"
            onClick={onRetry}
            className="text-sm text-ink-400 underline decoration-blush-300 underline-offset-4 hover:text-ink-600"
          >
            {recover.tryAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="mt-4 rounded-2xl border border-blush-100 bg-cream/60 p-5"
      noValidate
    >
      <h4 className="font-display text-base font-semibold text-ink-700">
        {recover.title}
      </h4>
      <p className="mt-1 text-sm text-ink-400">{recover.subtitle}</p>

      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor="recover-company">Company</label>
        <input
          id="recover-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="recover-email"
          className="mb-1.5 block text-sm font-medium text-ink-600"
        >
          {recover.emailLabel}
        </label>
        <input
          id="recover-email"
          name="email"
          type="email"
          required
          defaultValue={state.email ?? ""}
          placeholder={recover.emailPlaceholder}
          className="w-full rounded-xl border border-blush-100 bg-white px-4 py-2.5 text-sm text-ink-700 outline-none transition placeholder:text-ink-300 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
        />
        {state.errors?.email && (
          <p className="mt-1.5 text-xs text-red-500">{recover.errors.email}</p>
        )}
        {state.status === "not_found" && (
          <p className="mt-1.5 text-xs text-red-500">
            {t(recover.notFoundBody, { email: state.email ?? "" })}
          </p>
        )}
        {state.errors?.generic && (
          <p className="mt-1.5 text-xs text-red-500">
            {recover.errors.generic}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button type="submit" disabled={pending} className="flex-1">
          {pending ? recover.submitting : recover.submit}
        </Button>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-ink-400 underline decoration-blush-300 underline-offset-4 hover:text-ink-600"
        >
          {recover.cancel}
        </button>
      </div>
    </form>
  );
}

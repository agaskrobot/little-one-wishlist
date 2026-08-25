"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createWishlistAction } from "@/lib/actions";
import { initialCreateWishlistState } from "@/lib/action-states";
import { t } from "@/lib/i18n/dictionary-type";
import type { Dictionary } from "@/lib/i18n/dictionary-type";
import type { Locale } from "@/lib/types";
import { Button, buttonClasses } from "@/components/ui/button";
import { IconCheck, IconSparkle, IconCopy } from "@/components/icons";

export function SignupForm({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [resetKey, setResetKey] = useState(0);
  return (
    <SignupFormInner
      key={resetKey}
      lang={lang}
      dict={dict}
      onReset={() => setResetKey((k) => k + 1)}
    />
  );
}

function SignupFormInner({
  lang,
  dict,
  onReset,
}: {
  lang: Locale;
  dict: Dictionary;
  onReset: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    createWishlistAction,
    initialCreateWishlistState
  );

  const form = dict.landing.form;
  const success = dict.landing.success;

  if (state.status === "created" || state.status === "exists") {
    const isExisting = state.status === "exists";
    return (
      <div
        id="start"
        className="animate-pop-in rounded-3xl bg-white p-6 shadow-soft ring-1 ring-blush-100 sm:p-8"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-500">
          <IconCheck className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-center font-display text-xl font-semibold text-ink-700">
          {isExisting ? success.existsTitle : success.createdTitle}
        </h3>
        <p className="mt-2 text-center text-sm leading-relaxed text-ink-500">
          {t(isExisting ? success.existsBody : success.createdBody, {
            email: state.email ?? "",
          })}
        </p>
        {state.editUrl && (
          <CopyLinkBox url={state.editUrl} dict={dict} />
        )}
        <div className="mt-6 flex flex-col items-center gap-3">
          {state.editUrl && (
            <Link
              href={state.editUrl}
              className={buttonClasses("primary", "md", "w-full")}
            >
              {success.goToList}
            </Link>
          )}
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-ink-400 underline decoration-blush-300 underline-offset-4 hover:text-ink-600"
          >
            {success.newFormLink}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="start"
      action={formAction}
      className="animate-pop-in rounded-3xl bg-white p-6 shadow-soft ring-1 ring-blush-100 sm:p-8"
      noValidate
    >
      <div className="mb-2 flex items-center gap-2 text-blush-400">
        <IconSparkle className="h-5 w-5" />
        <h3 className="font-display text-xl font-semibold text-ink-700">
          {form.title}
        </h3>
      </div>
      <p className="text-sm text-ink-400">{form.subtitle}</p>

      <input type="hidden" name="lang" value={lang} />
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="babyName"
            className="mb-1.5 block text-sm font-medium text-ink-600"
          >
            {form.babyNameLabel}
          </label>
          <input
            id="babyName"
            name="babyName"
            required
            minLength={2}
            maxLength={60}
            placeholder={form.babyNamePlaceholder}
            className="w-full rounded-xl border border-blush-100 bg-cream/60 px-4 py-2.5 text-sm text-ink-700 outline-none transition placeholder:text-ink-300 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
          />
          {state.errors?.babyName && (
            <p className="mt-1.5 text-xs text-red-500">
              {form.errors.babyName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="parentName"
            className="mb-1.5 block text-sm font-medium text-ink-600"
          >
            {form.parentNameLabel}
          </label>
          <input
            id="parentName"
            name="parentName"
            maxLength={60}
            placeholder={form.parentNamePlaceholder}
            className="w-full rounded-xl border border-blush-100 bg-cream/60 px-4 py-2.5 text-sm text-ink-700 outline-none transition placeholder:text-ink-300 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-ink-600"
          >
            {form.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={form.emailPlaceholder}
            className="w-full rounded-xl border border-blush-100 bg-cream/60 px-4 py-2.5 text-sm text-ink-700 outline-none transition placeholder:text-ink-300 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
          />
          {state.errors?.email && (
            <p className="mt-1.5 text-xs text-red-500">{form.errors.email}</p>
          )}
        </div>
      </div>

      {state.errors?.generic && (
        <p className="mt-4 text-sm text-red-500">{form.errors.generic}</p>
      )}

      <Button type="submit" disabled={pending} className="mt-6 w-full">
        {pending ? form.submitting : form.submit}
      </Button>
      <p className="mt-3 text-center text-xs text-ink-300">
        {form.privacyNote}
      </p>
    </form>
  );
}

function CopyLinkBox({ url, dict }: { url: string; dict: Dictionary }) {
  const [copied, setCopied] = useState(false);
  const success = dict.landing.success;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable; the link is still selectable below.
    }
  }

  return (
    <div className="mt-4">
      <p className="text-center text-xs font-medium uppercase tracking-wide text-ink-300">
        {success.linkLabel}
      </p>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-blush-100 bg-cream/60 px-3 py-2">
        <span className="flex-1 truncate text-xs text-ink-500">{url}</span>
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
          {copied ? success.copiedButton : success.copyButton}
        </button>
      </div>
    </div>
  );
}

"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { addItemAction } from "@/lib/actions";
import { initialAddItemState } from "@/lib/action-states";
import { Button } from "@/components/ui/button";
import { IconGift, IconCheck } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n/dictionary-type";

interface LinkPreview {
  title: string | null;
  image: string | null;
  price: string | null;
}

const PREVIEW_DEBOUNCE_MS = 500;

export function AddItemForm({
  editToken,
  pathname,
  dict,
}: {
  editToken: string;
  pathname: string;
  dict: Dictionary;
}) {
  const [state, formAction, pending] = useActionState(
    addItemAction,
    initialAddItemState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const imageUrlInputRef = useRef<HTMLInputElement>(null);
  const titleTouchedRef = useRef(false);
  const priceTouchedRef = useRef(false);
  const previewAbortRef = useRef<AbortController | null>(null);
  const previewDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [justAdded, setJustAdded] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | undefined>(
    undefined
  );
  const [previewStatus, setPreviewStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const addItem = dict.edit.addItem;

  if (state.addedItemId && state.addedItemId !== lastAddedId) {
    setLastAddedId(state.addedItemId);
    setJustAdded(true);
    setPreviewStatus("idle");
    setPreviewImage(null);
  }

  useEffect(() => {
    formRef.current?.reset();
    if (imageUrlInputRef.current) imageUrlInputRef.current.value = "";
    if (previewDebounceRef.current) clearTimeout(previewDebounceRef.current);
    previewAbortRef.current?.abort();
    titleTouchedRef.current = false;
    priceTouchedRef.current = false;
  }, [lastAddedId]);

  async function fetchPreview(url: string) {
    previewAbortRef.current?.abort();
    const controller = new AbortController();
    previewAbortRef.current = controller;
    setPreviewStatus("loading");

    try {
      const res = await fetch(
        `/api/link-preview?editToken=${encodeURIComponent(editToken)}&url=${encodeURIComponent(url)}`,
        { signal: controller.signal }
      );
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data: LinkPreview = await res.json();

      if (imageUrlInputRef.current) {
        imageUrlInputRef.current.value = data.image ?? "";
      }
      setPreviewImage(data.image ?? null);

      if (data.title && titleInputRef.current && !titleTouchedRef.current) {
        titleInputRef.current.value = data.title;
      }
      if (data.price && priceInputRef.current && !priceTouchedRef.current) {
        priceInputRef.current.value = data.price;
      }

      setPreviewStatus("done");
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      setPreviewStatus("error");
    }
  }

  function handleUrlChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();
    if (previewDebounceRef.current) clearTimeout(previewDebounceRef.current);

    if (!value) {
      previewAbortRef.current?.abort();
      setPreviewStatus("idle");
      setPreviewImage(null);
      if (imageUrlInputRef.current) imageUrlInputRef.current.value = "";
      return;
    }

    try {
      new URL(value);
    } catch {
      return;
    }

    previewDebounceRef.current = setTimeout(
      () => fetchPreview(value),
      PREVIEW_DEBOUNCE_MS
    );
  }

  useEffect(() => {
    if (!justAdded) return;
    const timeout = setTimeout(() => setJustAdded(false), 2200);
    return () => clearTimeout(timeout);
  }, [justAdded]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-3xl bg-white p-6 shadow-softer ring-1 ring-blush-100"
    >
      <div className="flex items-center gap-2 text-blush-400">
        <IconGift className="h-5 w-5" />
        <h2 className="font-display text-lg font-semibold text-ink-700">
          {addItem.title}
        </h2>
      </div>

      <input type="hidden" name="editToken" value={editToken} />
      <input type="hidden" name="pathname" value={pathname} />
      <input type="hidden" name="imageUrl" ref={imageUrlInputRef} />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="url"
            className="mb-1.5 block text-sm font-medium text-ink-600"
          >
            {addItem.urlLabel}
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            onChange={handleUrlChange}
            placeholder={addItem.urlPlaceholder}
            className="w-full rounded-xl border border-blush-100 bg-cream/60 px-4 py-2.5 text-sm text-ink-700 outline-none transition placeholder:text-ink-300 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
          />
          {state.errors?.url && (
            <p className="mt-1.5 text-xs text-red-500">{addItem.errors.url}</p>
          )}
          {previewStatus === "loading" && (
            <p className="mt-1.5 text-xs text-ink-400">
              {addItem.fetchingPreview}
            </p>
          )}
          {previewStatus === "error" && (
            <p className="mt-1.5 text-xs text-ink-400">
              {addItem.previewError}
            </p>
          )}
          {previewStatus === "done" && previewImage && (
            <div className="mt-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage}
                alt=""
                className="h-32 w-32 rounded-2xl object-cover ring-1 ring-blush-100 md:h-44 md:w-44 lg:h-52 lg:w-52"
              />
              <p className="text-xs text-sage-500">{addItem.previewReady}</p>
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="title"
            className="mb-1.5 block text-sm font-medium text-ink-600"
          >
            {addItem.titleLabel}
          </label>
          <input
            id="title"
            name="title"
            ref={titleInputRef}
            onChange={() => {
              titleTouchedRef.current = true;
            }}
            required
            minLength={2}
            maxLength={120}
            placeholder={addItem.titlePlaceholder}
            className="w-full rounded-xl border border-blush-100 bg-cream/60 px-4 py-2.5 text-sm text-ink-700 outline-none transition placeholder:text-ink-300 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
          />
          {state.errors?.title && (
            <p className="mt-1.5 text-xs text-red-500">{addItem.errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="note"
            className="mb-1.5 block text-sm font-medium text-ink-600"
          >
            {addItem.noteLabel}
          </label>
          <input
            id="note"
            name="note"
            maxLength={300}
            placeholder={addItem.notePlaceholder}
            className="w-full rounded-xl border border-blush-100 bg-cream/60 px-4 py-2.5 text-sm text-ink-700 outline-none transition placeholder:text-ink-300 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-1.5 block text-sm font-medium text-ink-600"
          >
            {addItem.priceLabel}
          </label>
          <input
            id="price"
            name="price"
            ref={priceInputRef}
            onChange={() => {
              priceTouchedRef.current = true;
            }}
            maxLength={40}
            placeholder={addItem.pricePlaceholder}
            className="w-full rounded-xl border border-blush-100 bg-cream/60 px-4 py-2.5 text-sm text-ink-700 outline-none transition placeholder:text-ink-300 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
          />
        </div>
      </div>

      {state.errors?.generic && (
        <p className="mt-3 text-sm text-red-500">{addItem.errors.generic}</p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? addItem.submitting : addItem.submit}
        </Button>
        {justAdded && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-sage-500">
            <IconCheck className="h-4 w-4" />
            {addItem.added}
          </span>
        )}
      </div>
    </form>
  );
}

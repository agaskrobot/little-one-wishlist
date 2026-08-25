"use server";

import { revalidatePath } from "next/cache";
import {
  addItemToWishlist,
  cancelReservation as cancelReservationDal,
  createOrFindWishlist,
  removeItemFromWishlist,
  reserveItem as reserveItemDal,
  setItemPurchased,
} from "./wishlist";
import { getBaseUrl } from "./url";
import { hasLocale, defaultLocale } from "./i18n/config";
import {
  isValidEmail,
  isValidName,
  isValidUrl,
  LIMITS,
} from "./validation";
import type { Locale } from "./types";

function readLocale(formData: FormData): Locale {
  const raw = String(formData.get("lang") ?? "");
  return hasLocale(raw) ? raw : defaultLocale;
}

export interface CreateWishlistState {
  status: "idle" | "error" | "created" | "exists";
  errors?: {
    babyName?: string;
    email?: string;
    generic?: string;
  };
  editUrl?: string;
  email?: string;
}

export async function createWishlistAction(
  _prevState: CreateWishlistState,
  formData: FormData
): Promise<CreateWishlistState> {
  const lang = readLocale(formData);
  const babyName = String(formData.get("babyName") ?? "");
  const parentNameRaw = String(formData.get("parentName") ?? "");
  const email = String(formData.get("email") ?? "");
  const honeypot = String(formData.get("company") ?? "");

  if (honeypot.trim().length > 0) {
    return { status: "idle" };
  }

  const errors: CreateWishlistState["errors"] = {};
  if (!isValidName(babyName, LIMITS.babyName.min, LIMITS.babyName.max)) {
    errors.babyName = "invalid";
  }
  if (!isValidEmail(email)) {
    errors.email = "invalid";
  }
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  try {
    const result = await createOrFindWishlist({
      babyName,
      parentName: parentNameRaw.trim() ? parentNameRaw : null,
      email,
      locale: lang,
    });

    const baseUrl = await getBaseUrl();
    const editUrl = `${baseUrl}/${result.wishlist.locale}/edit/${result.wishlist.editToken}`;

    return {
      status: result.status,
      editUrl,
      email: result.wishlist.email,
    };
  } catch (error) {
    console.error("[little-one-wishlist] createWishlistAction failed:", error);
    return { status: "error", errors: { generic: "generic" } };
  }
}

export interface AddItemState {
  status: "idle" | "error" | "success";
  errors?: {
    title?: string;
    url?: string;
    generic?: string;
  };
  addedItemId?: string;
}

export async function addItemAction(
  _prevState: AddItemState,
  formData: FormData
): Promise<AddItemState> {
  const editToken = String(formData.get("editToken") ?? "");
  const pathname = String(formData.get("pathname") ?? "");
  const title = String(formData.get("title") ?? "");
  const urlValue = String(formData.get("url") ?? "").trim();
  const imageUrlValue = String(formData.get("imageUrl") ?? "").trim();
  const note = String(formData.get("note") ?? "");
  const price = String(formData.get("price") ?? "");

  const errors: AddItemState["errors"] = {};
  if (!isValidName(title, LIMITS.itemTitle.min, LIMITS.itemTitle.max)) {
    errors.title = "invalid";
  }
  if (!urlValue || !isValidUrl(urlValue)) {
    errors.url = "invalid";
  }
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  if (!editToken) {
    return { status: "error", errors: { generic: "generic" } };
  }

  const wishlist = await addItemToWishlist(editToken, {
    title,
    url: urlValue || null,
    imageUrl: imageUrlValue && isValidUrl(imageUrlValue) ? imageUrlValue : null,
    note: note.trim() ? note.slice(0, LIMITS.note.max) : null,
    price: price.trim() ? price.slice(0, LIMITS.price.max) : null,
  });

  if (!wishlist) {
    return { status: "error", errors: { generic: "generic" } };
  }

  if (pathname) revalidatePath(pathname);

  const addedItem = wishlist.items[wishlist.items.length - 1];
  return { status: "success", addedItemId: addedItem?.id };
}

export async function removeItemAction(
  editToken: string,
  itemId: string,
  pathname: string
): Promise<{ ok: boolean }> {
  if (!editToken || !itemId) return { ok: false };
  const wishlist = await removeItemFromWishlist(editToken, itemId);
  if (!wishlist) return { ok: false };
  if (pathname) revalidatePath(pathname);
  return { ok: true };
}

export async function cancelReservationAction(
  editToken: string,
  itemId: string,
  pathname: string
): Promise<{ ok: boolean }> {
  if (!editToken || !itemId) return { ok: false };
  const wishlist = await cancelReservationDal(editToken, itemId);
  if (!wishlist) return { ok: false };
  if (pathname) revalidatePath(pathname);
  return { ok: true };
}

export async function setItemPurchasedAction(
  editToken: string,
  itemId: string,
  purchased: boolean,
  pathname: string
): Promise<{ ok: boolean }> {
  if (!editToken || !itemId) return { ok: false };
  const wishlist = await setItemPurchased(editToken, itemId, purchased);
  if (!wishlist) return { ok: false };
  if (pathname) revalidatePath(pathname);
  return { ok: true };
}

export interface ReserveItemState {
  status: "idle" | "error" | "success";
  reason?: "not_found" | "already_reserved";
}

export async function reserveItemAction(
  _prevState: ReserveItemState,
  formData: FormData
): Promise<ReserveItemState> {
  const shareToken = String(formData.get("shareToken") ?? "");
  const itemId = String(formData.get("itemId") ?? "");
  const pathname = String(formData.get("pathname") ?? "");

  if (!shareToken || !itemId) {
    return { status: "error", reason: "not_found" };
  }

  const result = await reserveItemDal(shareToken, itemId);
  if (pathname) revalidatePath(pathname);
  if (!result.ok) return { status: "error", reason: result.reason };

  return { status: "success" };
}

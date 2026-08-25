import "server-only";
import { kv } from "./db";
import {
  generateId,
  generateEditToken,
  generateShareToken,
  generateItemId,
  SIX_MONTHS_MS,
} from "./tokens";
import type { Wishlist, WishlistItem, PublicWishlist, Locale } from "./types";
import { normalizeEmail } from "./validation";

const keys = {
  wishlist: (id: string) => `wishlist:${id}`,
  share: (token: string) => `share:${token}`,
  edit: (token: string) => `edit:${token}`,
  email: (email: string) => `email:${email}`,
};

function exatSeconds(expiresAt: string): number {
  return Math.floor(new Date(expiresAt).getTime() / 1000);
}

async function persist(wishlist: Wishlist): Promise<void> {
  const exat = exatSeconds(wishlist.expiresAt);
  await Promise.all([
    kv.set(keys.wishlist(wishlist.id), wishlist, exat),
    kv.set(keys.share(wishlist.shareToken), wishlist.id, exat),
    kv.set(keys.edit(wishlist.editToken), wishlist.id, exat),
    kv.set(keys.email(wishlist.email), wishlist.id, exat),
  ]);
}

function toPublic(wishlist: Wishlist): PublicWishlist {
  const {
    id,
    babyName,
    parentName,
    locale,
    shareToken,
    createdAt,
    expiresAt,
    items,
  } = wishlist;
  return {
    id,
    babyName,
    parentName,
    locale,
    shareToken,
    createdAt,
    expiresAt,
    items: items.filter((item) => !item.isPrivate),
  };
}

export async function findActiveWishlistByEmail(
  email: string
): Promise<Wishlist | null> {
  const id = await kv.get<string>(keys.email(normalizeEmail(email)));
  if (!id) return null;
  return kv.get<Wishlist>(keys.wishlist(id));
}

export async function getWishlistByEditToken(
  editToken: string
): Promise<Wishlist | null> {
  const id = await kv.get<string>(keys.edit(editToken));
  if (!id) return null;
  return kv.get<Wishlist>(keys.wishlist(id));
}

export async function getWishlistByShareToken(
  shareToken: string
): Promise<PublicWishlist | null> {
  const id = await kv.get<string>(keys.share(shareToken));
  if (!id) return null;
  const wishlist = await kv.get<Wishlist>(keys.wishlist(id));
  if (!wishlist) return null;
  return toPublic(wishlist);
}

export interface CreateWishlistInput {
  babyName: string;
  parentName: string | null;
  email: string;
  locale: Locale;
}

export type CreateWishlistResult =
  | { status: "created"; wishlist: Wishlist }
  | { status: "exists"; wishlist: Wishlist };

export async function createOrFindWishlist(
  input: CreateWishlistInput
): Promise<CreateWishlistResult> {
  const email = normalizeEmail(input.email);

  const now = new Date();
  const wishlist: Wishlist = {
    id: generateId(),
    babyName: input.babyName.trim(),
    parentName: input.parentName?.trim() || null,
    email,
    locale: input.locale,
    editToken: generateEditToken(),
    shareToken: generateShareToken(),
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + SIX_MONTHS_MS).toISOString(),
    items: [],
  };
  const exat = exatSeconds(wishlist.expiresAt);

  // Atomically claim the email slot first so two concurrent submissions for
  // the same address can't both create a wishlist — the loser here always
  // reads back the winner's wishlist instead.
  const claimed = await kv.setNX(keys.email(email), wishlist.id, exat);
  if (!claimed) {
    const existing = await findActiveWishlistByEmail(email);
    if (existing) {
      return { status: "exists", wishlist: existing };
    }
    // The email slot pointed at a wishlist that no longer exists (e.g. a
    // partially-failed write). Reclaim it rather than leaving it stuck.
    await kv.set(keys.email(email), wishlist.id, exat);
  }

  await persist(wishlist);
  return { status: "created", wishlist };
}

export interface AddItemInput {
  title: string;
  url: string | null;
  imageUrl: string | null;
  note: string | null;
  price: string | null;
}

export async function addItemToWishlist(
  editToken: string,
  input: AddItemInput
): Promise<Wishlist | null> {
  const wishlist = await getWishlistByEditToken(editToken);
  if (!wishlist) return null;

  const item: WishlistItem = {
    id: generateItemId(),
    title: input.title.trim(),
    url: input.url,
    imageUrl: input.imageUrl,
    note: input.note?.trim() || null,
    price: input.price?.trim() || null,
    addedAt: new Date().toISOString(),
    reservation: null,
    purchasedAt: null,
    isPrivate: false,
  };

  wishlist.items.push(item);
  await persist(wishlist);
  return wishlist;
}

export async function removeItemFromWishlist(
  editToken: string,
  itemId: string
): Promise<Wishlist | null> {
  const wishlist = await getWishlistByEditToken(editToken);
  if (!wishlist) return null;

  wishlist.items = wishlist.items.filter((item) => item.id !== itemId);
  await persist(wishlist);
  return wishlist;
}

export async function cancelReservation(
  editToken: string,
  itemId: string
): Promise<Wishlist | null> {
  const wishlist = await getWishlistByEditToken(editToken);
  if (!wishlist) return null;

  const item = wishlist.items.find((entry) => entry.id === itemId);
  if (!item) return null;

  item.reservation = null;
  await persist(wishlist);
  return wishlist;
}

export type ReserveItemResult =
  | { ok: true }
  | { ok: false; reason: "not_found" | "already_reserved" };

export async function reserveItem(
  shareToken: string,
  itemId: string
): Promise<ReserveItemResult> {
  const id = await kv.get<string>(keys.share(shareToken));
  if (!id) return { ok: false, reason: "not_found" };
  const wishlist = await kv.get<Wishlist>(keys.wishlist(id));
  if (!wishlist) return { ok: false, reason: "not_found" };

  const item = wishlist.items.find((entry) => entry.id === itemId);
  if (!item || item.isPrivate) return { ok: false, reason: "not_found" };
  if (item.reservation || item.purchasedAt) {
    return { ok: false, reason: "already_reserved" };
  }

  item.reservation = {
    reservedAt: new Date().toISOString(),
  };
  await persist(wishlist);
  return { ok: true };
}

export async function setItemPurchased(
  editToken: string,
  itemId: string,
  purchased: boolean
): Promise<Wishlist | null> {
  const wishlist = await getWishlistByEditToken(editToken);
  if (!wishlist) return null;

  const item = wishlist.items.find((entry) => entry.id === itemId);
  if (!item) return null;

  item.purchasedAt = purchased ? new Date().toISOString() : null;
  await persist(wishlist);
  return wishlist;
}

export async function setItemPrivate(
  editToken: string,
  itemId: string,
  isPrivate: boolean
): Promise<Wishlist | null> {
  const wishlist = await getWishlistByEditToken(editToken);
  if (!wishlist) return null;

  const item = wishlist.items.find((entry) => entry.id === itemId);
  if (!item) return null;

  item.isPrivate = isPrivate;
  await persist(wishlist);
  return wishlist;
}

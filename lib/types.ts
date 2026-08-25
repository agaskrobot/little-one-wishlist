export type Locale = "pl" | "en" | "es";

export interface Reservation {
  reservedAt: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  url: string | null;
  imageUrl: string | null;
  note: string | null;
  price: string | null;
  addedAt: string;
  reservation: Reservation | null;
  purchasedAt: string | null;
  isPrivate: boolean;
}

export interface Wishlist {
  id: string;
  babyName: string;
  parentName: string | null;
  email: string;
  locale: Locale;
  editToken: string;
  shareToken: string;
  createdAt: string;
  expiresAt: string;
  items: WishlistItem[];
}

export type PublicWishlist = Omit<Wishlist, "editToken" | "email">;

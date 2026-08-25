import type {
  CreateWishlistState,
  AddItemState,
  ReserveItemState,
  RecoverWishlistState,
} from "./actions";

export const initialCreateWishlistState: CreateWishlistState = {
  status: "idle",
};

export const initialAddItemState: AddItemState = { status: "idle" };

export const initialReserveItemState: ReserveItemState = { status: "idle" };

export const initialRecoverWishlistState: RecoverWishlistState = {
  status: "idle",
};

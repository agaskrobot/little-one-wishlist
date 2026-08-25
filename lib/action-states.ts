import type {
  CreateWishlistState,
  AddItemState,
  ReserveItemState,
} from "./actions";

export const initialCreateWishlistState: CreateWishlistState = {
  status: "idle",
};

export const initialAddItemState: AddItemState = { status: "idle" };

export const initialReserveItemState: ReserveItemState = { status: "idle" };

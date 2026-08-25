import "server-only";
import { customAlphabet } from "nanoid";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const idGen = customAlphabet(alphabet, 14);
const shareTokenGen = customAlphabet(alphabet, 10);
const editTokenGen = customAlphabet(alphabet, 28);
const itemIdGen = customAlphabet(alphabet, 10);

export const generateId = (): string => idGen();
export const generateShareToken = (): string => shareTokenGen();
export const generateEditToken = (): string => editTokenGen();
export const generateItemId = (): string => itemIdGen();

export const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6;

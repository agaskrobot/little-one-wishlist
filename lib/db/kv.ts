import "server-only";

export interface KVStore {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, exatSeconds: number): Promise<void>;
  /** Sets the key only if it doesn't already exist. Returns whether the set happened. */
  setNX(key: string, value: unknown, exatSeconds: number): Promise<boolean>;
  del(...keys: string[]): Promise<void>;
}

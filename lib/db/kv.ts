import "server-only";

export interface KVStore {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, exatSeconds: number): Promise<void>;
  del(...keys: string[]): Promise<void>;
}

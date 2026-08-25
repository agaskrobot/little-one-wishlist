import "server-only";
import type { KVStore } from "./kv";

interface Entry {
  value: unknown;
  expiresAtMs: number;
}

declare global {
  var __wishlistMemoryStore: Map<string, Entry> | undefined;
}

function getMap(): Map<string, Entry> {
  if (!globalThis.__wishlistMemoryStore) {
    globalThis.__wishlistMemoryStore = new Map();
  }
  return globalThis.__wishlistMemoryStore;
}

export const memoryStore: KVStore = {
  async get<T>(key: string): Promise<T | null> {
    const map = getMap();
    const entry = map.get(key);
    if (!entry) return null;
    if (entry.expiresAtMs <= Date.now()) {
      map.delete(key);
      return null;
    }
    return entry.value as T;
  },
  async set(key, value, exatSeconds) {
    getMap().set(key, { value, expiresAtMs: exatSeconds * 1000 });
  },
  async setNX(key, value, exatSeconds) {
    const map = getMap();
    const existing = map.get(key);
    if (existing && existing.expiresAtMs > Date.now()) return false;
    map.set(key, { value, expiresAtMs: exatSeconds * 1000 });
    return true;
  },
  async del(...keys) {
    const map = getMap();
    for (const key of keys) map.delete(key);
  },
};

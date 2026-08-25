import "server-only";
import { Redis } from "@upstash/redis";
import type { KVStore } from "./kv";

const url =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const hasRedisConfig = Boolean(url && token);

const redis = hasRedisConfig ? new Redis({ url: url!, token: token! }) : null;

export const redisStore: KVStore = {
  async get<T>(key: string): Promise<T | null> {
    if (!redis) return null;
    return redis.get<T>(key);
  },
  async set(key, value, exatSeconds) {
    if (!redis) return;
    await redis.set(key, value, { exat: exatSeconds });
  },
  async del(...keys) {
    if (!redis || keys.length === 0) return;
    await redis.del(...keys);
  },
};

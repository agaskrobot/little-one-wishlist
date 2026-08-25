import "server-only";
import type { KVStore } from "./kv";
import { hasRedisConfig, redisStore } from "./redis-store";
import { memoryStore } from "./memory-store";

if (!hasRedisConfig && process.env.NODE_ENV !== "production") {
  console.warn(
    "[little-one-wishlist] UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set — " +
      "using an in-memory store that resets on server restart. Fine for local dev, " +
      "but connect Upstash/Vercel KV before deploying to Vercel."
  );
}

export const kv: KVStore = hasRedisConfig ? redisStore : memoryStore;

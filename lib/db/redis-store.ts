import "server-only";
import { Redis } from "@upstash/redis";
import { createClient, type RedisClientType } from "redis";
import type { KVStore } from "./kv";

const restUrl =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const restToken =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const connectionUrl = process.env.REDIS_URL ?? process.env.KV_URL;

export const hasRedisConfig = Boolean(
  (restUrl && restToken) || connectionUrl
);

function createRestStore(url: string, token: string): KVStore {
  const redis = new Redis({ url, token });
  return {
    get: (key) => redis.get(key),
    async set(key, value, exatSeconds) {
      await redis.set(key, value, { exat: exatSeconds });
    },
    async del(...keys) {
      if (keys.length === 0) return;
      await redis.del(...keys);
    },
  };
}

function createTcpStore(url: string): KVStore {
  let clientPromise: Promise<RedisClientType> | null = null;

  function getClient(): Promise<RedisClientType> {
    if (!clientPromise) {
      const client: RedisClientType = createClient({ url });
      client.on("error", (error) => {
        console.error("[little-one-wishlist] Redis client error:", error);
      });
      clientPromise = client.connect().then(() => client);
    }
    return clientPromise;
  }

  return {
    async get<T>(key: string): Promise<T | null> {
      const client = await getClient();
      const raw = await client.get(key);
      return raw ? (JSON.parse(raw) as T) : null;
    },
    async set(key, value, exatSeconds) {
      const client = await getClient();
      await client.set(key, JSON.stringify(value), {
        expiration: { type: "EXAT", value: exatSeconds },
      });
    },
    async del(...keys) {
      if (keys.length === 0) return;
      const client = await getClient();
      await client.del(keys);
    },
  };
}

const noopStore: KVStore = {
  async get() {
    return null;
  },
  async set() {},
  async del() {},
};

export const redisStore: KVStore =
  restUrl && restToken
    ? createRestStore(restUrl, restToken)
    : connectionUrl
      ? createTcpStore(connectionUrl)
      : noopStore;

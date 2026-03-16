import Redis from "ioredis";

type CacheValue<T> = { value: T; expiresAt: number };

const redisUrl = process.env.REDIS_URL;
const redis =
  redisUrl && typeof window === "undefined"
    ? new Redis(redisUrl, {
        lazyConnect: true,
        maxRetriesPerRequest: 2,
      })
    : null;

// Lightweight in-memory fallback to avoid breaking local dev if Redis is absent.
const memoryCache = new Map<string, CacheValue<unknown>>();

async function ensureRedisReady() {
  if (!redis) return false;
  try {
    if (redis.status === "wait" || redis.status === "end") {
      await redis.connect();
    }
    return true;
  } catch (error) {
    console.error("Redis connection failed, falling back to memory cache", error);
    return false;
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  const usingRedis = await ensureRedisReady();
  if (usingRedis && redis) {
    try {
      const payload = await redis.get(key);
      return payload ? (JSON.parse(payload) as T) : null;
    } catch (error) {
      console.error("Redis get error", error);
    }
  }

  const entry = memoryCache.get(key);
  if (entry && entry.expiresAt > Date.now()) {
    return entry.value as T;
  }
  memoryCache.delete(key);
  return null;
}

export async function setCache<T>(key: string, value: T, ttlSeconds: number) {
  const usingRedis = await ensureRedisReady();
  if (usingRedis && redis) {
    try {
      await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
      return;
    } catch (error) {
      console.error("Redis set error", error);
    }
  }

  memoryCache.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}

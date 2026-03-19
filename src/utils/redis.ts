import Redis from 'ioredis';

// Redis client
export const redis = new Redis('redis://:password@localhost:6379/0', {
  lazyConnect: true,
  maxRetriesPerRequest: 0,
  enableOfflineQueue: false,
  // retryStrategy must be a function or undefined
  retryStrategy: undefined,
  reconnectOnError: () => false,
});

redis.on('connect', () => console.log('Redis connected'));
// Cast err as any to access code safely
redis.on('error', (err: any) =>
  console.warn('Redis unavailable:', err.code ?? err.message),
);

// Simple in-memory fallback
const memoryCache = new Map<string, { value: any; expiresAt: number }>();

export const fallbackCache = {
  get(key: string) {
    const entry = memoryCache.get(key);
    if (!entry) return null;

    const { value, expiresAt } = entry;
    if (Date.now() > expiresAt) {
      memoryCache.delete(key);
      return null;
    }

    return value;
  },

  set(key: string, value: any, ttlSeconds = 60) {
    memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  },

  del(key: string) {
    memoryCache.delete(key);
  },
};

// Unified cache interface
export const cache = {
  async get(key: string) {
    try {
      const redisValue = await redis.get(key);
      if (redisValue) return JSON.parse(redisValue);
    } catch {}
    return fallbackCache.get(key);
  },

  async set(key: string, value: any, ttlSeconds = 60) {
    fallbackCache.set(key, value, ttlSeconds);
    try {
      await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch {}
  },

  async del(key: string) {
    fallbackCache.del(key);
    try {
      await redis.del(key);
    } catch {}
  },
};

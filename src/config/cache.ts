import Redis from 'ioredis'
import { LRUCache } from 'lru-cache'
import { env } from './env'

const localCache = new LRUCache<string, string>({
  max: 500,
  ttl: 1000 * 60,
})

let redis: Redis | null = null

if (env.redisUrl) {
  redis = new Redis(env.redisUrl)
}

export const cache = {
  get: async (key: string) => {
    if (redis) {
      return redis.get(key)
    }
    return localCache.get(key) ?? null
  },
  set: async (key: string, value: string, ttlSeconds: number) => {
    if (redis) {
      await redis.set(key, value, 'EX', ttlSeconds)
      return
    }
    localCache.set(key, value, { ttl: ttlSeconds * 1000 })
  },
  del: async (key: string) => {
    if (redis) {
      await redis.del(key)
      return
    }
    localCache.delete(key)
  },
}

import type { Request, Response, NextFunction } from 'express'
import { cache } from '../../config/cache'

export const cacheResponse = (keyBuilder: (req: Request) => string, ttlSeconds = 60) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = keyBuilder(req)
    const cached = await cache.get(key)
    if (cached) {
      res.setHeader('x-cache', 'HIT')
      res.type('application/json').status(200).send(cached)
      return
    }

    const originalJson = res.json.bind(res)
    res.json = (body: unknown) => {
      cache.set(key, JSON.stringify(body), ttlSeconds).catch(() => undefined)
      res.setHeader('x-cache', 'MISS')
      return originalJson(body)
    }

    next()
  }
}

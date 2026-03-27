import type { Request, Response, NextFunction } from 'express'
import { cache } from '../../config/cache'

export const idempotency = (keyHeader = 'idempotency-key', ttlSeconds = 300) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers[keyHeader]?.toString()
    if (!key) return next()

    const existing = await cache.get(`idem:${key}`)
    if (existing) {
      res.setHeader('x-idempotent-replay', 'true')
      res.type('application/json').status(200).send(existing)
      return
    }

    const originalJson = res.json.bind(res)
    res.json = (body: unknown) => {
      cache.set(`idem:${key}`, JSON.stringify(body), ttlSeconds).catch(() => undefined)
      return originalJson(body)
    }

    next()
  }
}

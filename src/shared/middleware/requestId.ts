import type { Request, Response, NextFunction } from 'express'
import { randomUUID } from 'node:crypto'

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.headers['x-request-id']?.toString() ?? randomUUID()
  res.setHeader('x-request-id', id)
  ;(req as Request & { id: string }).id = id
  next()
}

import type { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { HttpError } from '../utils/httpError'

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error({ err, path: req.path }, 'Unhandled error')
  if (err instanceof HttpError) {
    return res.status(err.status).json({ success: false, message: err.message, data: err.details })
  }
  res.status(500).json({ success: false, message: err.message || 'Something went wrong' })
}

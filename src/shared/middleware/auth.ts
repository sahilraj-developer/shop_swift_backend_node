import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env'

export type AuthRequest = Request & { user?: { id: string; role: 'admin' | 'vendor' | 'customer' } }

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing authorization token' })
  }
  const token = header.slice(7)
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { sub: string; role: 'admin' | 'vendor' | 'customer' }
    req.user = { id: decoded.sub, role: decoded.role }
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

export const requireRole = (roles: Array<'admin' | 'vendor' | 'customer'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied' })
    }
    next()
  }
}

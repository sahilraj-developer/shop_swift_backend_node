import jwt from 'jsonwebtoken'
import { env } from '../../config/env'

export type JwtPayload = {
  sub: string
  role: 'admin' | 'vendor' | 'customer'
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwtSecret as string, { expiresIn: env.jwtExpiresIn })
}

import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { env } from '../../config/env'

export type JwtPayload = {
  sub: string
  role: 'admin' | 'vendor' | 'customer'
}

export const signToken = (payload: JwtPayload): string => {
  const secret: Secret = env.jwtSecret
  const options: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] }
  return jwt.sign(payload, secret, options)
}

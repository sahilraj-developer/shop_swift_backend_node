import { comparePassword } from '../../shared/utils/password'
import { signToken } from '../../shared/utils/tokens'
import { createUser, findUserByEmail, sanitizeUser } from '../users/user.service'
import { topics } from '../../jobs/kafka.topics'
import { env } from '../../config/env'
import { HttpError } from '../../shared/utils/httpError'
import { publishMail } from '../../jobs/mail.publisher'

export const registerUser = async (payload: { name: string; email: string; password: string; role: 'customer' | 'vendor' }) => {
  const existing = await findUserByEmail(payload.email)
  if (existing) {
    throw new HttpError(409, 'Email already in use')
  }

  const user = await createUser(payload)
  const token = signToken({ sub: user._id.toString(), role: user.role })

  await publishMail(topics.welcome, {
    to: user.email,
    subject: 'Welcome to ShopSwift',
    html: `<p>Hi ${user.name},</p><p>Welcome to ShopSwift. We are glad you are here.</p>`,
  })

  return { user: sanitizeUser(user), token }
}

export const loginUser = async (payload: { email: string; password: string; role: 'admin' | 'vendor' | 'customer' }) => {
  const user = await findUserByEmail(payload.email)
  if (!user || user.role !== payload.role) {
    throw new HttpError(401, 'Invalid credentials')
  }

  const valid = await comparePassword(payload.password, user.password)
  if (!valid) {
    throw new HttpError(401, 'Invalid credentials')
  }

  const token = signToken({ sub: user._id.toString(), role: user.role })

  if (user.role === 'vendor' && env.vendorLoginPromoEnabled) {
    await publishMail(topics.vendorLoginPromo, {
      to: user.email,
      subject: 'Boost your sales this week',
      html: `<p>Hi ${user.name},</p><p>Check your dashboard for new promotional tools and featured slots.</p>`,
    })
  }

  return { user: sanitizeUser(user), token }
}

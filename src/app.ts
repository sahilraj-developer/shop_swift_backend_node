import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import morgan from 'morgan'
import { env } from './config/env'
import { apiRateLimiter } from './shared/middleware/rateLimit'
import { requestId } from './shared/middleware/requestId'
import { errorHandler } from './shared/middleware/error'
import { notFound } from './shared/middleware/notFound'
import authRoutes from './modules/auth/auth.routes'
import productRoutes from './modules/products/product.routes'
import orderRoutes from './modules/orders/order.routes'
import marketingRoutes from './modules/marketing/marketing.routes'
import reviewRoutes from './modules/reviews/review.routes'
import notificationRoutes from './modules/notifications/notification.routes'
import uploadRoutes from './modules/uploads/uploads.routes'
import userRoutes from './modules/users/user.routes'

export const createApp = () => {
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: env.corsOrigin, credentials: false }))
  app.use(express.json({ limit: '1mb' }))
  app.use(mongoSanitize())
  app.use(compression())
  app.use(requestId)
  app.use(apiRateLimiter)
  app.use(morgan('tiny'))

  app.get('/health', (_req, res) => res.status(200).json({ success: true, message: 'ok' }))

  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/products', productRoutes)
  app.use('/api/v1/orders', orderRoutes)
  app.use('/api/v1/marketing', marketingRoutes)
  app.use('/api/v1', reviewRoutes)
  app.use('/api/v1/notifications', notificationRoutes)
  app.use('/api/v1/uploads', uploadRoutes)
  app.use('/api/v1/users', userRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}

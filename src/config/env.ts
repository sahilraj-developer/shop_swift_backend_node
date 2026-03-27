import dotenv from 'dotenv'

dotenv.config()

const required = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  mongoUri: required('MONGO_URI', ''),
  jwtSecret: required('JWT_SECRET', ''),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  redisUrl: process.env.REDIS_URL ?? '',
  kafkaBrokers: (process.env.KAFKA_BROKERS ?? '').split(',').filter(Boolean),
  kafkaClientId: process.env.KAFKA_CLIENT_ID ?? 'shopswift-api',
  kafkaEnabled: process.env.KAFKA_ENABLED === 'true',
  mailEnabled: process.env.MAIL_ENABLED === 'true',
  smtpHost: process.env.SMTP_HOST ?? '',
  smtpPort: Number(process.env.SMTP_PORT ?? 587),
  smtpUser: process.env.SMTP_USER ?? '',
  smtpPass: process.env.SMTP_PASS ?? '',
  smtpFrom: process.env.SMTP_FROM ?? 'ShopSwift <no-reply@shopswift.com>',
  vendorLoginPromoEnabled: process.env.VENDOR_LOGIN_PROMO_ENABLED !== 'false',
  specialOffersEnabled: process.env.SPECIAL_OFFERS_ENABLED !== 'false',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ?? '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
}

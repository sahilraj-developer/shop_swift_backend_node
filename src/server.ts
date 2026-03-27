import { createApp } from './app'
import { env } from './config/env'
import { connectDatabase } from './config/db'
import { logger } from './shared/utils/logger'
import { startMailConsumer } from './jobs/mail.consumer'

const start = async () => {
  await connectDatabase()
  const app = createApp()

  const server = app.listen(env.port, () => {
    logger.info(`API running on port ${env.port}`)
  })

  startMailConsumer().catch((error) => logger.error({ error }, 'Mail consumer failed'))

  const shutdown = async () => {
    logger.info('Shutting down server')
    server.close(() => process.exit(0))
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

start().catch((error) => {
  logger.error({ error }, 'Failed to start server')
  process.exit(1)
})

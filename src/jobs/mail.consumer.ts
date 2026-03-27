import { createConsumer } from '../config/kafka'
import { sendMail } from '../config/mail'
import { logger } from '../shared/utils/logger'
import { topics } from './kafka.topics'

export const startMailConsumer = async () => {
  const consumer = createConsumer()
  if (!consumer) return

  await consumer.connect()
  await consumer.subscribe({ topic: topics.welcome })
  await consumer.subscribe({ topic: topics.vendorLoginPromo })
  await consumer.subscribe({ topic: topics.orderInvoice })
  await consumer.subscribe({ topic: topics.specialOffer })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return
      const payload = JSON.parse(message.value.toString()) as {
        to: string
        subject: string
        html: string
      }
      await sendMail(payload.to, payload.subject, payload.html)
      logger.info({ topic, to: payload.to }, 'Mail event processed')
    },
  })
}

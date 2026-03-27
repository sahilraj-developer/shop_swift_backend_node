import { Kafka } from 'kafkajs'
import { env } from './env'
import { logger } from '../shared/utils/logger'

let kafka: Kafka | null = null

if (env.kafkaEnabled && env.kafkaBrokers.length) {
  kafka = new Kafka({
    clientId: env.kafkaClientId,
    brokers: env.kafkaBrokers,
  })
}

export const publishEvent = async (topic: string, payload: unknown) => {
  if (!kafka) return
  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(payload) }],
  })
  await producer.disconnect()
  logger.info({ topic }, 'Kafka event published')
}

export const createConsumer = () => {
  if (!kafka) return null
  return kafka.consumer({ groupId: `${env.kafkaClientId}-group` })
}

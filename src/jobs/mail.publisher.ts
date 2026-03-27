import { publishEvent } from '../config/kafka'
import { sendMail } from '../config/mail'
import { env } from '../config/env'

export type MailPayload = { to: string; subject: string; html: string }

export const publishMail = async (topic: string, payload: MailPayload) => {
  if (env.kafkaEnabled) {
    await publishEvent(topic, payload)
    return
  }
  await sendMail(payload.to, payload.subject, payload.html)
}

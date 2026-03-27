import nodemailer from 'nodemailer'
import { env } from './env'
import { logger } from '../shared/utils/logger'

const transporter = env.mailEnabled
  ? nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      auth: env.smtpUser
        ? {
            user: env.smtpUser,
            pass: env.smtpPass,
          }
        : undefined,
    })
  : null

export const sendMail = async (to: string, subject: string, html: string) => {
  if (!transporter) {
    logger.info({ to, subject }, 'Mail disabled; skipping send')
    return
  }
  await transporter.sendMail({ from: env.smtpFrom, to, subject, html })
}

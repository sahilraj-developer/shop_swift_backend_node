import type { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import { ok } from '../../shared/utils/apiResponse'
import { topics } from '../../jobs/kafka.topics'
import { env } from '../../config/env'
import { publishMail } from '../../jobs/mail.publisher'

export const sendSpecialOffer = asyncHandler(async (req: Request, res: Response) => {
  if (!env.specialOffersEnabled) {
    res.status(400).json({ success: false, message: 'Special offers are disabled' })
    return
  }

  const { subject, html, recipients } = req.body as { subject: string; html: string; recipients: string[] }

  await Promise.all(
    recipients.map((to) =>
      publishMail(topics.specialOffer, {
        to,
        subject,
        html,
      })
    )
  )

  res.status(200).json(ok('Special offer emails queued', { count: recipients.length }))
})

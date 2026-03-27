import { z } from 'zod'

export const specialOfferSchema = z.object({
  body: z.object({
    subject: z.string().min(3),
    html: z.string().min(10),
    recipients: z.array(z.string().email()).min(1),
  }),
})

import { z } from 'zod'

export const createNotificationSchema = z.object({
  body: z.object({
    recipientId: z.string().min(1),
    recipientRole: z.enum(['vendor', 'customer']),
    title: z.string().min(3),
    message: z.string().min(5),
  }),
})

import { z } from 'zod'

const orderItem = z.object({
  productId: z.string().min(1),
  name: z.string().min(2),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
})

export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(orderItem).min(1),
    email: z.string().email().optional(),
  }),
})

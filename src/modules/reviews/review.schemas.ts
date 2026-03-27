import { z } from 'zod'

export const createReviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(3),
  }),
  params: z.object({
    productId: z.string().min(1),
  }),
})

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(3),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
})

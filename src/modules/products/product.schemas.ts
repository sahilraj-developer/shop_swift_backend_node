import { z } from 'zod'

export const listProductsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    search: z.string().optional(),
    status: z.enum(['pending', 'approved', 'rejected']).optional(),
  }),
})

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().min(5),
    price: z.number().positive(),
    inventory: z.number().int().min(0),
    images: z.array(z.string().url()).optional(),
  }),
})

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().min(5).optional(),
    price: z.number().positive().optional(),
    inventory: z.number().int().min(0).optional(),
    images: z.array(z.string().url()).optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
})

export const decisionSchema = z.object({
  body: z.object({
    note: z.string().min(3).optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
})

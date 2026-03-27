import type { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import { ok } from '../../shared/utils/apiResponse'
import { listProducts, createProduct, updateProduct, approveProduct, rejectProduct } from './product.service'
import type { AuthRequest } from '../../shared/middleware/auth'
import { HttpError } from '../../shared/utils/httpError'
import { createNotification } from '../notifications/notification.service'

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1)
  const limit = Number(req.query.limit ?? 12)
  const sort = String(req.query.sort ?? '-createdAt')
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined
  const search = req.query.search ? String(req.query.search) : undefined
  const status = req.query.status
    ? (String(req.query.status) as 'pending' | 'approved' | 'rejected')
    : 'approved'

  const result = await listProducts({ page, limit, sort, minPrice, maxPrice, search, status })
  res.status(200).json(ok('Products fetched', result))
})

export const postProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vendorId = req.user?.id ?? 'unknown'
  const product = await createProduct({ ...req.body, vendorId, status: 'pending' })
  res.status(201).json(ok('Product submitted for approval', product))
})

export const getVendorProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vendorId = req.user?.id
  if (!vendorId) throw new HttpError(401, 'Unauthorized')
  const result = await listProducts({ page: 1, limit: 50, sort: '-createdAt', vendorId })
  res.status(200).json(ok('Vendor products fetched', result))
})

export const patchProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vendorId = req.user?.id
  if (!vendorId) throw new HttpError(401, 'Unauthorized')
  const updated = await updateProduct(req.params.id, vendorId, req.body)
  if (!updated) throw new HttpError(404, 'Product not found')
  res.status(200).json(ok('Product update submitted for approval', updated))
})

export const approve = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await approveProduct(req.params.id, req.body.note)
  if (!product) throw new HttpError(404, 'Product not found')
  await createNotification({
    recipientId: product.vendorId,
    recipientRole: 'vendor',
    title: 'Product approved',
    message: `Your product "${product.name}" has been approved and is now visible to customers.`,
  })
  res.status(200).json(ok('Product approved', product))
})

export const reject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await rejectProduct(req.params.id, req.body.note)
  if (!product) throw new HttpError(404, 'Product not found')
  await createNotification({
    recipientId: product.vendorId,
    recipientRole: 'vendor',
    title: 'Product rejected',
    message: `Your product "${product.name}" was rejected. ${req.body.note ?? ''}`.trim(),
  })
  res.status(200).json(ok('Product rejected', product))
})

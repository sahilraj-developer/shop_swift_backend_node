import { Product } from './product.model'

export const listProducts = async (query: {
  page: number
  limit: number
  sort: string
  minPrice?: number
  maxPrice?: number
  search?: string
  status?: 'pending' | 'approved' | 'rejected'
  vendorId?: string
}) => {
  const filter: Record<string, unknown> = {}
  if (query.status) {
    filter.status = query.status
  }
  if (query.vendorId) {
    filter.vendorId = query.vendorId
  }
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    filter.price = {}
    if (query.minPrice !== undefined) (filter.price as Record<string, unknown>).$gte = query.minPrice
    if (query.maxPrice !== undefined) (filter.price as Record<string, unknown>).$lte = query.maxPrice
  }
  if (query.search) {
    filter.name = { $regex: query.search, $options: 'i' }
  }

  const skip = (query.page - 1) * query.limit

  const [items, total] = await Promise.all([
    Product.find(filter).sort(query.sort).skip(skip).limit(query.limit),
    Product.countDocuments(filter),
  ])

  return {
    items,
    total,
    page: query.page,
    limit: query.limit,
    totalPages: Math.ceil(total / query.limit),
  }
}

export const createProduct = (payload: {
  name: string
  description: string
  price: number
  inventory: number
  vendorId: string
  images?: string[]
  status?: 'pending' | 'approved' | 'rejected'
}) => Product.create(payload)

export const updateProduct = (id: string, vendorId: string, payload: Partial<{ name: string; description: string; price: number; inventory: number; images: string[] }>) =>
  Product.findOneAndUpdate(
    { _id: id, vendorId },
    { ...payload, status: 'pending' },
    { new: true }
  )

export const approveProduct = (id: string, approvalNote?: string) =>
  Product.findByIdAndUpdate(id, { status: 'approved', approvalNote: approvalNote ?? '' }, { new: true })

export const rejectProduct = (id: string, approvalNote?: string) =>
  Product.findByIdAndUpdate(id, { status: 'rejected', approvalNote: approvalNote ?? '' }, { new: true })

import { Review } from './review.model'
import { Order } from '../orders/order.model'
import { HttpError } from '../../shared/utils/httpError'

export const listReviewsForProduct = (productId: string) =>
  Review.find({ productId }).sort('-createdAt')

export const createReview = async (payload: {
  productId: string
  customerId: string
  rating: number
  comment: string
}) => {
  const purchased = await Order.exists({
    customerId: payload.customerId,
    'items.productId': payload.productId,
  })
  if (!purchased) {
    throw new HttpError(403, 'You can only review products you purchased')
  }

  const existing = await Review.findOne({ productId: payload.productId, customerId: payload.customerId })
  if (existing) {
    throw new HttpError(409, 'Review already exists. Update your review instead.')
  }

  return Review.create(payload)
}

export const updateReview = async (payload: {
  reviewId: string
  customerId: string
  rating: number
  comment: string
}) => {
  const review = await Review.findOneAndUpdate(
    { _id: payload.reviewId, customerId: payload.customerId },
    { rating: payload.rating, comment: payload.comment },
    { new: true }
  )
  if (!review) {
    throw new HttpError(404, 'Review not found')
  }
  return review
}

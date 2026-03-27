import type { Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import { ok } from '../../shared/utils/apiResponse'
import type { AuthRequest } from '../../shared/middleware/auth'
import { createReview, listReviewsForProduct, updateReview } from './review.service'
import { HttpError } from '../../shared/utils/httpError'

export const getReviews = asyncHandler(async (req: AuthRequest, res: Response) => {
  const reviews = await listReviewsForProduct(req.params.productId)
  res.status(200).json(ok('Reviews fetched', reviews))
})

export const postReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const customerId = req.user?.id
  if (!customerId) {
    throw new HttpError(401, 'Unauthorized')
  }
  const review = await createReview({
    productId: req.params.productId,
    customerId,
    rating: req.body.rating,
    comment: req.body.comment,
  })
  res.status(201).json(ok('Review added', review))
})

export const patchReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const customerId = req.user?.id
  if (!customerId) {
    throw new HttpError(401, 'Unauthorized')
  }
  const review = await updateReview({
    reviewId: req.params.id,
    customerId,
    rating: req.body.rating,
    comment: req.body.comment,
  })
  res.status(200).json(ok('Review updated', review))
})

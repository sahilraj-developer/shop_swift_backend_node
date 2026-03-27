import { Router } from 'express'
import { authenticate, requireRole } from '../../shared/middleware/auth'
import { validate } from '../../shared/middleware/validate'
import { createReviewSchema, updateReviewSchema } from './review.schemas'
import { getReviews, patchReview, postReview } from './review.controller'

const router = Router()

router.get('/products/:productId/reviews', getReviews)
router.post('/products/:productId/reviews', authenticate, requireRole(['customer']), validate(createReviewSchema), postReview)
router.patch('/reviews/:id', authenticate, requireRole(['customer']), validate(updateReviewSchema), patchReview)

export default router

import { Router } from 'express'
import { sendSpecialOffer } from './marketing.controller'
import { authenticate, requireRole } from '../../shared/middleware/auth'
import { validate } from '../../shared/middleware/validate'
import { specialOfferSchema } from './marketing.schemas'

const router = Router()

router.post('/special-offer', authenticate, requireRole(['admin']), validate(specialOfferSchema), sendSpecialOffer)

export default router

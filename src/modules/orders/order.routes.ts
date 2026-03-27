import { Router } from 'express'
import { getOrders, postOrder } from './order.controller'
import { authenticate, requireRole } from '../../shared/middleware/auth'
import { validate } from '../../shared/middleware/validate'
import { createOrderSchema } from './order.schemas'
import { idempotency } from '../../shared/middleware/idempotency'

const router = Router()

router.get('/', authenticate, requireRole(['customer', 'admin']), getOrders)
router.post('/', authenticate, requireRole(['customer']), idempotency(), validate(createOrderSchema), postOrder)

export default router

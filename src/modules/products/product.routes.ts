import { Router } from 'express'
import { getProducts, postProduct, getVendorProducts, patchProduct, approve, reject } from './product.controller'
import { validate } from '../../shared/middleware/validate'
import { authenticate, requireRole } from '../../shared/middleware/auth'
import { cacheResponse } from '../../shared/middleware/cache'
import { listProductsSchema, createProductSchema, updateProductSchema, decisionSchema } from './product.schemas'

const router = Router()

router.get('/', validate(listProductsSchema), cacheResponse((req) => `products:${req.originalUrl}`, 90), getProducts)
router.get('/vendor', authenticate, requireRole(['vendor', 'admin']), getVendorProducts)
router.post('/', authenticate, requireRole(['vendor', 'admin']), validate(createProductSchema), postProduct)
router.patch('/:id', authenticate, requireRole(['vendor', 'admin']), validate(updateProductSchema), patchProduct)
router.patch('/:id/approve', authenticate, requireRole(['admin']), validate(decisionSchema), approve)
router.patch('/:id/reject', authenticate, requireRole(['admin']), validate(decisionSchema), reject)

export default router

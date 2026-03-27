import { Router } from 'express'
import { getSignature } from './uploads.controller'
import { authenticate, requireRole } from '../../shared/middleware/auth'

const router = Router()

router.post('/signature', authenticate, requireRole(['vendor', 'admin']), getSignature)

export default router

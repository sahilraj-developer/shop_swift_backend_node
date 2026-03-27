import { Router } from 'express'
import { getUsers } from './user.controller'
import { authenticate, requireRole } from '../../shared/middleware/auth'

const router = Router()

router.get('/', authenticate, requireRole(['admin']), getUsers)

export default router

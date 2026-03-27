import { Router } from 'express'
import { authenticate, requireRole } from '../../shared/middleware/auth'
import { validate } from '../../shared/middleware/validate'
import { createNotificationSchema } from './notification.schemas'
import { getNotifications, patchNotificationRead, postNotification } from './notification.controller'

const router = Router()

router.get('/', authenticate, requireRole(['customer', 'vendor', 'admin']), getNotifications)
router.patch('/:id/read', authenticate, requireRole(['customer', 'vendor', 'admin']), patchNotificationRead)
router.post('/', authenticate, requireRole(['admin']), validate(createNotificationSchema), postNotification)

export default router

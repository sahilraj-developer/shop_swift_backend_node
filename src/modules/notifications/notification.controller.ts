import type { Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import { ok } from '../../shared/utils/apiResponse'
import type { AuthRequest } from '../../shared/middleware/auth'
import { createNotification, listNotifications, markNotificationRead } from './notification.service'
import { HttpError } from '../../shared/utils/httpError'

export const getNotifications = asyncHandler(async (req: AuthRequest, res: Response) => {
  const recipientId = req.user?.id
  if (!recipientId) {
    throw new HttpError(401, 'Unauthorized')
  }
  const items = await listNotifications(recipientId)
  res.status(200).json(ok('Notifications fetched', items))
})

export const postNotification = asyncHandler(async (req: AuthRequest, res: Response) => {
  const notification = await createNotification(req.body)
  res.status(201).json(ok('Notification created', notification))
})

export const patchNotificationRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const recipientId = req.user?.id
  if (!recipientId) {
    throw new HttpError(401, 'Unauthorized')
  }
  const notification = await markNotificationRead(req.params.id, recipientId)
  if (!notification) {
    throw new HttpError(404, 'Notification not found')
  }
  res.status(200).json(ok('Notification marked as read', notification))
})

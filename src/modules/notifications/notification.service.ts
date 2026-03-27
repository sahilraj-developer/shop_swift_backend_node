import { Notification } from './notification.model'

export const listNotifications = (recipientId: string) =>
  Notification.find({ recipientId }).sort('-createdAt')

export const createNotification = (payload: {
  recipientId: string
  recipientRole: 'vendor' | 'customer'
  title: string
  message: string
}) => Notification.create(payload)

export const markNotificationRead = (id: string, recipientId: string) =>
  Notification.findOneAndUpdate({ _id: id, recipientId }, { read: true }, { new: true })

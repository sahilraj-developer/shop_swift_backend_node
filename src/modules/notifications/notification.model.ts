import { Schema, model, type Document } from 'mongoose'

export interface NotificationDocument extends Document {
  recipientId: string
  recipientRole: 'vendor' | 'customer'
  title: string
  message: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new Schema<NotificationDocument>(
  {
    recipientId: { type: String, required: true },
    recipientRole: { type: String, enum: ['vendor', 'customer'], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Notification = model<NotificationDocument>('Notification', notificationSchema)

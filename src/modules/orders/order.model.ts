import { Schema, model, type Document } from 'mongoose'

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export interface OrderDocument extends Document {
  customerId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'paid' | 'fulfilled'
  createdAt: Date
  updatedAt: Date
}

const orderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
)

const orderSchema = new Schema<OrderDocument>(
  {
    customerId: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'fulfilled'], default: 'pending' },
  },
  { timestamps: true }
)

export const Order = model<OrderDocument>('Order', orderSchema)

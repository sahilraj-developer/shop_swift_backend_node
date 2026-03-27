import { Schema, model, type Document } from 'mongoose'

export interface ProductDocument extends Document {
  name: string
  description: string
  price: number
  vendorId: string
  inventory: number
  status: 'pending' | 'approved' | 'rejected'
  images: string[]
  approvalNote?: string
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    vendorId: { type: String, required: true },
    inventory: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    images: { type: [String], default: [] },
    approvalNote: { type: String },
  },
  { timestamps: true }
)

export const Product = model<ProductDocument>('Product', productSchema)

import { Schema, model, type Document } from 'mongoose'

export interface ReviewDocument extends Document {
  productId: string
  customerId: string
  rating: number
  comment: string
  createdAt: Date
  updatedAt: Date
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    productId: { type: String, required: true },
    customerId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
)

reviewSchema.index({ productId: 1, customerId: 1 }, { unique: true })

export const Review = model<ReviewDocument>('Review', reviewSchema)

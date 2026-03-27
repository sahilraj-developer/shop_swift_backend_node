import { Schema, model, type Document } from 'mongoose'
import { hashPassword } from '../../shared/utils/password'

export type UserRole = 'admin' | 'vendor' | 'customer'

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'vendor', 'customer'], required: true },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await hashPassword(this.password)
  next()
})

export const User = model<UserDocument>('User', userSchema)

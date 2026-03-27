import { User, type UserDocument, type UserRole } from './user.model'

export const findUserByEmail = (email: string) => User.findOne({ email })

export const createUser = async (payload: {
  name: string
  email: string
  password: string
  role: UserRole
}) => {
  const user = new User(payload)
  await user.save()
  return user
}

export const listUsersByRole = (role: UserRole) => User.find({ role })

export const sanitizeUser = (user: UserDocument) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
})

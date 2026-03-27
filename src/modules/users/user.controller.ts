import type { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import { ok } from '../../shared/utils/apiResponse'
import { listUsersByRole, sanitizeUser } from './user.service'

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const role = String(req.query.role ?? 'customer') as 'customer' | 'vendor' | 'admin'
  const users = await listUsersByRole(role)
  res.status(200).json(ok('Users fetched', users.map(sanitizeUser)))
})

import type { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import { ok } from '../../shared/utils/apiResponse'
import { loginUser, registerUser } from './auth.service'

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerUser(req.body)
  res.status(201).json(ok('Registration successful', result))
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body)
  res.status(200).json(ok('Login successful', result))
})

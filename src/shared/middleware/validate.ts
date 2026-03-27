import type { AnyZodObject } from 'zod'
import type { Request, Response, NextFunction } from 'express'

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  })

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      data: result.error.flatten(),
    })
  }

  next()
}

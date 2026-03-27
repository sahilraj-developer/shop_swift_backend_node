import type { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import { ok } from '../../shared/utils/apiResponse'
import { cloudinaryConfigReady, cloudinaryMeta, signUpload } from '../../config/cloudinary'
import { HttpError } from '../../shared/utils/httpError'

export const getSignature = asyncHandler(async (_req: Request, res: Response) => {
  if (!cloudinaryConfigReady) {
    throw new HttpError(400, 'Cloudinary is not configured')
  }

  const timestamp = Math.floor(Date.now() / 1000)
  const signature = signUpload(timestamp)

  res.status(200).json(
    ok('Upload signature generated', {
      timestamp,
      signature,
      cloudName: cloudinaryMeta.cloudName,
      apiKey: cloudinaryMeta.apiKey,
    })
  )
})

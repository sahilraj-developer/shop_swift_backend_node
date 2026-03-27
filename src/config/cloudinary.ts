import { v2 as cloudinary } from 'cloudinary'
import { env } from './env'

if (env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  })
}

export const cloudinaryConfigReady =
  Boolean(env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret)

export const signUpload = (timestamp: number) => {
  return cloudinary.utils.api_sign_request({ timestamp }, env.cloudinaryApiSecret)
}

export const cloudinaryMeta = {
  cloudName: env.cloudinaryCloudName,
  apiKey: env.cloudinaryApiKey,
}

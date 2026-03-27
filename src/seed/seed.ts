import { connectDatabase } from '../config/db'
import { User } from '../modules/users/user.model'
import { logger } from '../shared/utils/logger'

const seed = async () => {
  await connectDatabase()

  const users = [
    {
      name: 'Admin User',
      email: 'admin@shopswift.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      name: 'Vendor User',
      email: 'vendor@shopswift.com',
      password: 'vendor123',
      role: 'vendor',
    },
    {
      name: 'Customer Demo',
      email: 'customer@shopswift.com',
      password: 'customer123',
      role: 'customer',
    },
  ]

  for (const user of users) {
    const exists = await User.findOne({ email: user.email })
    if (!exists) {
      await User.create(user)
      logger.info(`Created user ${user.email}`)
    }
  }

  logger.info('Seed complete')
  process.exit(0)
}

seed().catch((error) => {
  logger.error({ error }, 'Seed failed')
  process.exit(1)
})

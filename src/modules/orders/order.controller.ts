import type { Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import { ok } from '../../shared/utils/apiResponse'
import { createOrder, listOrdersForCustomer } from './order.service'
import type { AuthRequest } from '../../shared/middleware/auth'
import { topics } from '../../jobs/kafka.topics'
import { publishMail } from '../../jobs/mail.publisher'
import { createNotification } from '../notifications/notification.service'

export const postOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const customerId = req.user?.id ?? 'unknown'
  const order = await createOrder({ customerId, items: req.body.items })

  await publishMail(topics.orderInvoice, {
    to: req.body.email ?? 'customer@example.com',
    subject: `Your ShopSwift invoice #${order._id.toString().slice(-6)}`,
    html: `<p>Thanks for your purchase!</p><p>Total: $${order.total.toFixed(2)}</p>`,
  })

  await createNotification({
    recipientId: customerId,
    recipientRole: 'customer',
    title: 'Order confirmed',
    message: `Your order ${order._id.toString().slice(-6)} was placed successfully.`,
  })

  res.status(201).json(ok('Order created', order))
})

export const getOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const customerId = req.user?.id ?? 'unknown'
  const orders = await listOrdersForCustomer(customerId)
  res.status(200).json(ok('Orders fetched', orders))
})

import { Order, type OrderItem } from './order.model'

export const createOrder = async (payload: { customerId: string; items: OrderItem[] }) => {
  const total = payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return Order.create({ ...payload, total })
}

export const listOrdersForCustomer = (customerId: string) => Order.find({ customerId }).sort('-createdAt')

import { api } from './client'

export function toOrderPayload(items) {
  return items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }))
}

export async function createOrder({ items, customer, totals, promoCode }) {
  const payload = {
    userId: 1,
    products: toOrderPayload(items),
  }
  const { data } = await api.post('/carts/add', payload)

  return {
    ...data,
    customer,
    promoCode,
    clientTotals: totals,
    requestPayload: payload,
    placedAt: new Date().toISOString(),
  }
}

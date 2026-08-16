import { createOrder, toOrderPayload } from './orders'
import { api } from './client'

jest.mock('./client', () => ({
  api: {
    post: jest.fn(),
    get: jest.fn(),
  },
}))

describe('createOrder', () => {
  it('POSTs cart contents to DummyJSON /carts/add', async () => {
    api.post.mockResolvedValue({
      data: { id: 51, totalProducts: 1, total: 18.54 },
    })

    const items = [{ id: 1, quantity: 2, title: 'Mascara' }]
    const totals = { total: 26.68 }
    const result = await createOrder({
      items,
      customer: { name: 'Safia', email: 's@example.com' },
      totals,
      promoCode: 'SALE10',
    })

    expect(api.post).toHaveBeenCalledWith('/carts/add', {
      userId: 1,
      products: toOrderPayload(items),
    })
    expect(result.id).toBe(51)
    expect(result.customer.name).toBe('Safia')
    expect(result.clientTotals).toBe(totals)
  })
})

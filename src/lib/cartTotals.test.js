import { getCartTotals, getLineTotal } from '../lib/cartTotals'

const items = [
  { id: 1, title: 'A', price: 10, quantity: 2 },
  { id: 2, title: 'B', price: 20, quantity: 1 },
]

describe('getLineTotal', () => {
  it('multiplies price by quantity', () => {
    expect(getLineTotal({ price: 9.27, quantity: 3 })).toBeCloseTo(27.81)
  })
})

describe('getCartTotals', () => {
  it('sums lines, count and shipping under threshold', () => {
    const totals = getCartTotals(items, '')
    expect(totals.subtotal).toBe(40)
    expect(totals.itemCount).toBe(3)
    expect(totals.uniqueCount).toBe(2)
    expect(totals.shipping).toBe(9.99)
    expect(totals.total).toBeCloseTo(49.99)
  })

  it('applies SALE10 percent discount', () => {
    const totals = getCartTotals(items, 'SALE10')
    expect(totals.discount).toBe(4)
    expect(totals.total).toBeCloseTo(45.99)
  })

  it('caps WELCOME fixed discount at subtotal', () => {
    const totals = getCartTotals([{ id: 1, price: 8, quantity: 1 }], 'WELCOME')
    expect(totals.discount).toBe(8)
  })

  it('makes shipping free with FREESHIP or high subtotal', () => {
    expect(getCartTotals(items, 'FREESHIP').shipping).toBe(0)
    expect(getCartTotals([{ id: 1, price: 120, quantity: 1 }], '').shipping).toBe(0)
  })
})

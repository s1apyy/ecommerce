import { formatPrice, salePrice } from '../lib/format'

describe('formatPrice', () => {
  it('formats USD', () => {
    expect(formatPrice(9.99)).toBe('$9.99')
  })

  it('formats RUB from a USD amount', () => {
    expect(formatPrice(10, { currency: 'RUB', locale: 'ru' })).toMatch(/920/)
  })
})

describe('salePrice', () => {
  it('applies discount percentage', () => {
    expect(salePrice({ price: 100, discountPercentage: 10 })).toBe(90)
  })

  it('keeps full price without discount', () => {
    expect(salePrice({ price: 20 })).toBe(20)
  })
})

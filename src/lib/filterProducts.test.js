import { filterProducts } from '../lib/filterProducts'

const products = [
  { id: 1, price: 10, discountPercentage: 0, rating: 4.8 },
  { id: 2, price: 50, discountPercentage: 0, rating: 3.1 },
  { id: 3, price: 100, discountPercentage: 50, rating: 4.2 },
]

describe('filterProducts', () => {
  it('returns all products without filters', () => {
    expect(filterProducts(products, {})).toHaveLength(3)
  })

  it('filters by min and max sale price', () => {
    expect(filterProducts(products, { minPrice: 20, maxPrice: 60 }).map((item) => item.id)).toEqual([2, 3])
  })

  it('filters by minimum rating', () => {
    expect(filterProducts(products, { minRating: 4 }).map((item) => item.id)).toEqual([1, 3])
  })
})

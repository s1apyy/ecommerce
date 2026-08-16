import { getNextSkip, PAGE_SIZE } from '../api/products'
import { toOrderPayload } from '../api/orders'
import { parseCatalogFilters } from '../hooks/useCatalogFilters'

jest.mock('../api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}))

describe('getNextSkip', () => {
  it('returns next skip while pages remain', () => {
    expect(getNextSkip({ skip: 0, limit: PAGE_SIZE, total: 40 })).toBe(12)
  })

  it('returns undefined on the last page', () => {
    expect(getNextSkip({ skip: 36, limit: 12, total: 40 })).toBeUndefined()
  })
})

describe('toOrderPayload', () => {
  it('maps cart items to DummyJSON product lines', () => {
    expect(
      toOrderPayload([
        { id: 5, quantity: 2, title: 'Watch' },
        { id: 9, quantity: 1 },
      ]),
    ).toEqual([
      { id: 5, quantity: 2 },
      { id: 9, quantity: 1 },
    ])
  })
})

describe('parseCatalogFilters', () => {
  it('reads query params with defaults', () => {
    const params = new URLSearchParams('category=beauty&minPrice=10&minRating=4')
    expect(parseCatalogFilters(params)).toMatchObject({
      category: 'beauty',
      minPrice: '10',
      minRating: '4',
      sortBy: 'title',
      order: 'asc',
      q: '',
    })
  })
})

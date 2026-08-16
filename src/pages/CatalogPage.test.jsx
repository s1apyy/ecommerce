import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CatalogPage from '../pages/CatalogPage'
import { translateProductTitle } from '../i18n/catalog'

const mockProduct = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  brand: 'Essence',
  category: 'beauty',
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  thumbnail: 'https://cdn.dummyjson.com/thumb.webp',
  images: ['https://cdn.dummyjson.com/full.webp'],
}

jest.mock('../hooks/useProducts', () => ({
  useInfiniteProducts: () => ({
    data: {
      pages: [{ products: [mockProduct], total: 1, skip: 0, limit: 12 }],
    },
    isPending: false,
    isError: false,
    error: null,
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
  }),
  useCategories: () => ({ data: [], isPending: false }),
}))

describe('CatalogPage', () => {
  it('renders loaded products from infinite query pages', () => {
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /все товары/i })).toBeInTheDocument()
    expect(screen.getByText(translateProductTitle(mockProduct, 'ru'))).toBeInTheDocument()
    expect(screen.getByText(/это все товары/i)).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { sampleProduct } from '../stories/fixtures'
import { useCartStore } from '../store/useCartStore'
import { useUiStore } from '../store/useUiStore'

function renderCard(product = sampleProduct) {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>,
  )
}

describe('ProductCard', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], promoCode: '', promoError: '' })
    useUiStore.setState({ cartOpen: false })
  })

  it('renders title and discounted price', () => {
    renderCard()
    expect(screen.getByText(sampleProduct.title)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /в корзину/i })).toBeInTheDocument()
  })

  it('adds the product to the cart without opening the drawer', async () => {
    const user = userEvent.setup()
    renderCard()
    await user.click(screen.getByRole('button', { name: /в корзину/i }))
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useUiStore.getState().cartOpen).toBe(false)
  })
})

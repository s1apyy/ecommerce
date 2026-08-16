import { useCartStore } from '../store/useCartStore'

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], promoCode: '', promoError: '' })
  })

  it('adds a product and merges quantity', () => {
    const product = { id: 1, title: 'Mug', price: 20, discountPercentage: 0, stock: 5, thumbnail: 'x' }
    useCartStore.getState().addItem(product, 1)
    useCartStore.getState().addItem(product, 2)
    expect(useCartStore.getState().items[0].quantity).toBe(3)
  })

  it('applies a known promo and rejects unknown', () => {
    expect(useCartStore.getState().applyPromo('sale10')).toBe(true)
    expect(useCartStore.getState().promoCode).toBe('SALE10')
    expect(useCartStore.getState().applyPromo('NOPE')).toBe(false)
    expect(useCartStore.getState().promoError).toBe('notFound')
  })

  it('clears cart and promo', () => {
    useCartStore.setState({
      items: [{ id: 1, title: 'Mug', price: 10, quantity: 1 }],
      promoCode: 'SALE10',
    })
    useCartStore.getState().clearCart()
    expect(useCartStore.getState().items).toEqual([])
    expect(useCartStore.getState().promoCode).toBe('')
  })
})

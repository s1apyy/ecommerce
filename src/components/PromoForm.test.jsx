import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PromoForm from './PromoForm'
import { useCartStore } from '../store/useCartStore'

describe('PromoForm', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], promoCode: '', promoError: '' })
  })

  it('applies a valid promo code', async () => {
    const user = userEvent.setup()
    render(<PromoForm />)
    await user.type(screen.getByPlaceholderText('SALE10'), 'sale10')
    await user.click(screen.getByRole('button', { name: /применить/i }))
    expect(useCartStore.getState().promoCode).toBe('SALE10')
    expect(screen.getByText(/−10%/)).toBeInTheDocument()
  })

  it('shows an error for an unknown code', async () => {
    const user = userEvent.setup()
    render(<PromoForm />)
    await user.type(screen.getByPlaceholderText('SALE10'), 'NOPE')
    await user.click(screen.getByRole('button', { name: /применить/i }))
    expect(screen.getByText('Промокод не найден')).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutForm from './CheckoutForm'
import { sampleCartItem, sampleTotals } from '../stories/fixtures'

describe('CheckoutForm', () => {
  it('submits customer data and cart contents', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()
    render(
      <CheckoutForm
        items={[sampleCartItem]}
        totals={sampleTotals}
        promoCode="SALE10"
        onSubmit={onSubmit}
        isPending={false}
        error={null}
      />,
    )

    await user.type(screen.getByLabelText(/имя/i), 'Safia')
    await user.type(screen.getByLabelText(/email/i), 'safia@example.com')
    await user.click(screen.getByRole('button', { name: /оформить/i }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        customer: { name: 'Safia', email: 'safia@example.com' },
        promoCode: 'SALE10',
        items: [sampleCartItem],
      }),
    )
  })

  it('keeps submit disabled until the form is valid', () => {
    render(
      <CheckoutForm
        items={[sampleCartItem]}
        totals={sampleTotals}
        promoCode=""
        onSubmit={jest.fn()}
        isPending={false}
        error={null}
      />,
    )
    expect(screen.getByRole('button', { name: /оформить/i })).toBeDisabled()
  })
})

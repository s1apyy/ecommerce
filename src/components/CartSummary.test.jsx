import { render, screen } from '@testing-library/react'
import CartSummary from './CartSummary'
import { sampleTotals } from '../stories/fixtures'

describe('CartSummary', () => {
  it('shows line counts, discount and total', () => {
    render(<CartSummary totals={sampleTotals} />)
    expect(screen.getByText('1 / 2 шт.')).toBeInTheDocument()
    expect(screen.getByText(/−10%/)).toBeInTheDocument()
    expect(screen.getByText('Итого')).toBeInTheDocument()
  })
})

import CartSummary from '../components/CartSummary'
import { sampleTotals } from './fixtures'

const meta = {
  title: 'Cart/CartSummary',
  component: CartSummary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Сводка корзины: количество позиций, товары, скидка, доставка и итого.',
      },
    },
  },
}

export default meta

export const WithPromo = {
  args: { totals: sampleTotals },
}

export const Empty = {
  args: {
    totals: {
      lines: [],
      uniqueCount: 0,
      itemCount: 0,
      subtotal: 0,
      discount: 0,
      shipping: 0,
      total: 0,
      promo: undefined,
    },
  },
}

export const FreeShipping = {
  args: {
    totals: {
      ...sampleTotals,
      subtotal: 120,
      discount: 0,
      shipping: 0,
      total: 120,
      promo: undefined,
    },
  },
}

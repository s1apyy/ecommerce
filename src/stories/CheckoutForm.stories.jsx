import CheckoutForm from '../components/CheckoutForm'
import { sampleCartItem, sampleTotals } from './fixtures'

const meta = {
  title: 'Cart/CheckoutForm',
  component: CheckoutForm,
  tags: ['autodocs'],
  args: {
    items: [sampleCartItem],
    totals: sampleTotals,
    promoCode: 'SALE10',
    onSubmit: () => {},
    isPending: false,
    error: null,
  },
  parameters: {
    docs: {
      description: {
        component: 'Форма оформления заказа. Сабмит уходит POST /carts/add на DummyJSON.',
      },
    },
  },
}

export default meta

export const Default = {}

export const Pending = {
  args: { isPending: true },
}

export const WithError = {
  args: { error: { message: 'Network Error' } },
}

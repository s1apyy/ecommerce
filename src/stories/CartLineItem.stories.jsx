import CartLineItem from '../components/CartLineItem'
import { sampleCartItem } from './fixtures'

const meta = {
  title: 'Cart/CartLineItem',
  component: CartLineItem,
  tags: ['autodocs'],
  args: {
    item: sampleCartItem,
    onIncrease: () => {},
    onDecrease: () => {},
    onRemove: () => {},
  },
  parameters: {
    docs: {
      description: {
        component: 'Строка корзины: цена за единицу, количество и сумма позиции.',
      },
    },
  },
}

export default meta

export const Default = {}

export const SingleItem = {
  args: {
    item: { ...sampleCartItem, quantity: 1, lineTotal: 9.27 },
  },
}

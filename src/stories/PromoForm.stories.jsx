import PromoForm from '../components/PromoForm'
import { useCartStore } from '../store/useCartStore'

const meta = {
  title: 'Cart/PromoForm',
  component: PromoForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Поле промокода. Валидные коды: SALE10, SALE20, WELCOME, FREESHIP.',
      },
    },
  },
}

export default meta

export const Empty = {
  render: () => {
    useCartStore.setState({ promoCode: '', promoError: '' })
    return <PromoForm />
  },
}

export const Applied = {
  render: () => {
    useCartStore.setState({ promoCode: 'SALE10', promoError: '' })
    return <PromoForm />
  },
}

export const Invalid = {
  render: () => {
    useCartStore.setState({ promoCode: '', promoError: 'Промокод не найден' })
    return <PromoForm />
  },
}

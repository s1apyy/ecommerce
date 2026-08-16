import Header from '../components/Header'
import { useCartStore } from '../store/useCartStore'

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Шапка магазина: поиск по каталогу, счётчик корзины и переключение сайдбара.',
      },
    },
  },
}

export default meta

export const EmptyCart = {
  render: () => {
    useCartStore.setState({ items: [] })
    return <Header />
  },
}

export const WithItems = {
  render: () => {
    useCartStore.setState({
      items: [
        { id: 1, title: 'Mascara', thumbnail: '', price: 9.27, stock: 5, quantity: 3 },
      ],
    })
    return <Header />
  },
}

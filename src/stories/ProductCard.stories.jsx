import ProductCard from '../components/ProductCard'
import { sampleProduct } from './fixtures'

const meta = {
  title: 'Catalog/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Карточка товара: превью, скидка, цена со скидкой DummyJSON и добавление в Zustand-корзину.',
      },
    },
  },
}

export default meta

export const Default = {
  args: { product: sampleProduct },
}

export const WithoutDiscount = {
  args: {
    product: { ...sampleProduct, discountPercentage: 0, price: 24 },
  },
}

export const LongTitle = {
  args: {
    product: {
      ...sampleProduct,
      title: 'Very Long Product Title That Should Clamp To Two Lines In The Catalog Grid Card',
    },
  },
}

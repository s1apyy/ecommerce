import FilterPanel from '../components/FilterPanel'
import { sampleCategories } from './fixtures'

const meta = {
  title: 'Catalog/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Динамические фильтры каталога: категории DummyJSON, диапазон цены и минимальный рейтинг. Состояние пишется в query-string.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs rounded-3xl border border-line bg-cream p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta

export const Default = {
  args: {
    categories: sampleCategories,
    isPending: false,
  },
}

export const Loading = {
  args: {
    categories: [],
    isPending: true,
  },
}

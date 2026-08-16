import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FilterPanel from './FilterPanel'
import { sampleCategories } from '../stories/fixtures'

function renderPanel() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <FilterPanel categories={sampleCategories} isPending={false} />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('FilterPanel', () => {
  it('renders category, price and rating filters', () => {
    renderPanel()

    expect(screen.getByText('Категории')).toBeInTheDocument()
    expect(screen.getByText('Smartphones')).toBeInTheDocument()
    expect(screen.getByText('Цена, $')).toBeInTheDocument()
    expect(screen.getByText('Рейтинг')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'от 4.0' })).toBeInTheDocument()
  })
})

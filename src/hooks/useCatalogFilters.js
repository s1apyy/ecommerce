import { useSearchParams } from 'react-router-dom'

export function parseCatalogFilters(searchParams) {
  return {
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    sortBy: searchParams.get('sortBy') || 'title',
    order: searchParams.get('order') || 'asc',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
  }
}

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = parseCatalogFilters(searchParams)

  function updateFilters(patch) {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([key, value]) => {
      if (value === '' || value == null) next.delete(key)
      else next.set(key, String(value))
    })
    next.delete('page')
    setSearchParams(next)
  }

  return { filters, updateFilters, searchParams }
}

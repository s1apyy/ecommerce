import { api } from './client'

export const PAGE_SIZE = 12

export async function fetchProducts({
  skip = 0,
  limit = PAGE_SIZE,
  sortBy,
  order = 'asc',
  category,
  q,
} = {}) {
  const params = { limit, skip }

  if (sortBy) {
    params.sortBy = sortBy
    params.order = order
  }

  let url = '/products'
  if (q) {
    url = '/products/search'
    params.q = q
  } else if (category) {
    url = `/products/category/${encodeURIComponent(category)}`
  }

  const { data } = await api.get(url, { params })
  return data
}

export function getNextSkip(lastPage) {
  if (!lastPage) return undefined
  const nextSkip = lastPage.skip + lastPage.limit
  return nextSkip < lastPage.total ? nextSkip : undefined
}

export async function fetchProduct(id) {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export async function fetchCategories() {
  const { data } = await api.get('/products/categories')
  return data
}

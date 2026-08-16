import { api } from './client'

export async function fetchProducts({
  page = 1,
  limit = 12,
  sortBy,
  order = 'asc',
  category,
  q,
} = {}) {
  const skip = (page - 1) * limit
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

export async function fetchProduct(id) {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export async function fetchCategories() {
  const { data } = await api.get('/products/categories')
  return data
}

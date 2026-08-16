import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchProduct, fetchProducts, getNextSkip, PAGE_SIZE } from '../api/products'

export function useInfiniteProducts({ q, category, sortBy, order } = {}) {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', { q, category, sortBy, order }],
    queryFn: ({ pageParam }) =>
      fetchProducts({
        skip: pageParam,
        limit: PAGE_SIZE,
        q,
        category,
        sortBy,
        order,
      }),
    initialPageParam: 0,
    getNextPageParam: getNextSkip,
  })
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: Boolean(id),
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000,
  })
}

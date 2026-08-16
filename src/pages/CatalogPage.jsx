import { useMemo } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import InfiniteScrollSentinel from '../components/InfiniteScrollSentinel.jsx'
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useFillFilteredPages, useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { useInfiniteProducts } from '../hooks/useProducts'
import { filterProducts } from '../lib/filterProducts'

const SORTS = [
  { label: 'Название', sortBy: 'title', order: 'asc' },
  { label: 'Цена ↑', sortBy: 'price', order: 'asc' },
  { label: 'Цена ↓', sortBy: 'price', order: 'desc' },
  { label: 'Рейтинг', sortBy: 'rating', order: 'desc' },
]

export default function CatalogPage() {
  const { filters, updateFilters } = useCatalogFilters()
  const { q, category, sortBy, order, minPrice, maxPrice, minRating } = filters

  const { data, isPending, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProducts({ q, category, sortBy, order })

  const loadedProducts = useMemo(
    () => data?.pages.flatMap((page) => page.products) ?? [],
    [data],
  )
  const products = useMemo(
    () => filterProducts(loadedProducts, { minPrice, maxPrice, minRating }),
    [loadedProducts, minPrice, maxPrice, minRating],
  )
  const total = data?.pages[0]?.total ?? 0

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  useFillFilteredPages({
    filteredCount: products.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Каталог</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">
            {q ? `Поиск: ${q}` : category ? category.replaceAll('-', ' ') : 'Все товары'}
          </h1>
          <p className="mt-2 text-ink-muted">
            Показано {products.length} из {total} · бесконечный скролл
          </p>
        </div>
        <label className="flex items-center gap-3 text-sm">
          <span className="text-ink-muted">Сортировка</span>
          <select
            value={`${sortBy}:${order}`}
            onChange={(event) => {
              const [nextSort, nextOrder] = event.target.value.split(':')
              updateFilters({ sortBy: nextSort, order: nextOrder })
            }}
            className="h-11 rounded-full border border-line bg-cream px-4 outline-none"
          >
            {SORTS.map((option) => (
              <option key={option.label} value={`${option.sortBy}:${option.order}`}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isError ? (
        <p className="rounded-2xl border border-accent/30 bg-cream p-6 text-accent">
          Не удалось загрузить каталог: {error.message}
        </p>
      ) : isPending ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-[28rem] animate-pulse rounded-3xl bg-paper-2" />
          ))}
        </div>
      ) : products.length === 0 && (hasNextPage || isFetchingNextPage) ? (
        <p className="rounded-2xl border border-line bg-cream p-8 text-ink-muted">
          Подбираем товары по фильтрам…
        </p>
      ) : products.length === 0 ? (
        <p className="rounded-2xl border border-line bg-cream p-8 text-ink-muted">Ничего не найдено.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <InfiniteScrollSentinel
            sentinelRef={sentinelRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
    </section>
  )
}

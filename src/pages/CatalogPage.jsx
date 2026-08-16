import { useMemo } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import InfiniteScrollSentinel from '../components/InfiniteScrollSentinel.jsx'
import Select from '../components/Select.jsx'
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useI18n } from '../hooks/useI18n'
import { useFillFilteredPages, useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { useInfiniteProducts } from '../hooks/useProducts'
import { filterProducts } from '../lib/filterProducts'

export default function CatalogPage() {
  const { t, currency, categoryLabel } = useI18n()
  const { filters, updateFilters } = useCatalogFilters()
  const { q, category, sortBy, order, minPrice, maxPrice, minRating } = filters

  const { data, isPending, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProducts({ q, category, sortBy, order })

  const loadedProducts = useMemo(
    () => data?.pages.flatMap((page) => page.products) ?? [],
    [data],
  )
  const products = useMemo(
    () => filterProducts(loadedProducts, { minPrice, maxPrice, minRating, currency }),
    [loadedProducts, minPrice, maxPrice, minRating, currency],
  )
  const total = data?.pages[0]?.total ?? 0
  const sorts = getSortOptions(t)
  const title = q ? t('catalog.search', { q }) : category ? categoryLabel(category) : t('catalog.all')

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
          <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">{t('catalog.kicker')}</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">{title}</h1>
          <p className="mt-2 text-ink-muted">{t('catalog.shown', { shown: products.length, total })}</p>
        </div>
        <label className="flex items-center gap-3 text-sm">
          <span className="shrink-0 text-ink-muted">{t('catalog.sort')}</span>
          <Select
            aria-label={t('catalog.sort')}
            value={`${sortBy}:${order}`}
            onChange={(event) => {
              const [nextSort, nextOrder] = event.target.value.split(':')
              updateFilters({ sortBy: nextSort, order: nextOrder })
            }}
          >
            {sorts.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
      </div>

      {isError ? (
        <p className="rounded-2xl border border-accent/30 bg-cream p-6 text-accent">
          {t('catalog.loadError', { message: error.message })}
        </p>
      ) : isPending ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-[28rem] animate-pulse rounded-3xl bg-paper-2" />
          ))}
        </div>
      ) : products.length === 0 && (hasNextPage || isFetchingNextPage) ? (
        <p className="rounded-2xl border border-line bg-cream p-8 text-ink-muted">{t('catalog.filtering')}</p>
      ) : products.length === 0 ? (
        <p className="rounded-2xl border border-line bg-cream p-8 text-ink-muted">{t('catalog.empty')}</p>
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

function getSortOptions(t) {
  return [
    { label: t('catalog.sortTitle'), value: 'title:asc' },
    { label: t('catalog.sortPriceAsc'), value: 'price:asc' },
    { label: t('catalog.sortPriceDesc'), value: 'price:desc' },
    { label: t('catalog.sortRating'), value: 'rating:desc' },
  ]
}

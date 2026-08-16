import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useCategories } from '../hooks/useProducts'
import { useI18n } from '../hooks/useI18n'
import { cn } from '../lib/cn'

const RATINGS = [
  { value: '', display: '' },
  { value: '3', display: '3.0' },
  { value: '4', display: '4.0' },
  { value: '4.5', display: '4.5' },
]

export default function FilterPanel({ onNavigate, categories: categoriesProp, isPending: pendingProp }) {
  const { t, currency, categoryLabel } = useI18n()
  const { filters, updateFilters } = useCatalogFilters()
  const categoriesQuery = useCategories()
  const categories = categoriesProp ?? categoriesQuery.data ?? []
  const isPending = pendingProp ?? (categoriesProp ? false : categoriesQuery.isPending)
  const priceSymbol = currency === 'RUB' ? '₽' : '$'

  function apply(patch) {
    updateFilters(patch)
    onNavigate?.()
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          {t('filters.categories')}
        </p>
        <nav className="flex flex-col gap-1">
          <FilterLink active={!filters.category} onClick={() => apply({ category: '' })}>
            {t('filters.all')}
          </FilterLink>
          {isPending
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-9 animate-pulse rounded-xl bg-paper-2" />
              ))
            : categories.map((category) => (
                <FilterLink
                  key={category.slug}
                  active={filters.category === category.slug}
                  onClick={() => apply({ category: category.slug, q: '' })}
                >
                  {categoryLabel(category.slug, category.name)}
                </FilterLink>
              ))}
        </nav>
      </section>

      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          {t('filters.price', { symbol: priceSymbol })}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-ink-muted">
            {t('filters.from')}
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={filters.minPrice}
              onChange={(event) => updateFilters({ minPrice: event.target.value })}
              className="mt-1 h-10 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-accent"
              placeholder="0"
            />
          </label>
          <label className="text-xs text-ink-muted">
            {t('filters.to')}
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={filters.maxPrice}
              onChange={(event) => updateFilters({ maxPrice: event.target.value })}
              className="mt-1 h-10 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-accent"
              placeholder="∞"
            />
          </label>
        </div>
      </section>

      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">{t('filters.rating')}</p>
        <div className="flex flex-col gap-1">
          {RATINGS.map((option) => (
            <FilterLink
              key={option.value || 'any'}
              active={filters.minRating === option.value}
              onClick={() => apply({ minRating: option.value })}
            >
              {option.value ? t('filters.ratingFrom', { value: option.display }) : t('filters.ratingAny')}
            </FilterLink>
          ))}
        </div>
      </section>

      {filters.minPrice || filters.maxPrice || filters.minRating || filters.category ? (
        <button
          type="button"
          className="text-sm text-ink-muted underline-offset-4 hover:underline"
          onClick={() =>
            apply({
              minPrice: '',
              maxPrice: '',
              minRating: '',
              category: '',
            })
          }
        >
          {t('filters.reset')}
        </button>
      ) : null}
    </div>
  )
}

export function FilterLink({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl px-3 py-2 text-left text-sm',
        active ? 'bg-ink text-cream' : 'text-ink hover:bg-paper-2',
      )}
    >
      {children}
    </button>
  )
}

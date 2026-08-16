import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useCategories } from '../hooks/useProducts'

const RATINGS = [
  { value: '', label: 'Любой' },
  { value: '3', label: 'от 3.0' },
  { value: '4', label: 'от 4.0' },
  { value: '4.5', label: 'от 4.5' },
]

export default function FilterPanel({ onNavigate }) {
  const { filters, updateFilters } = useCatalogFilters()
  const { data: categories = [], isPending } = useCategories()

  function apply(patch) {
    updateFilters(patch)
    onNavigate?.()
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Категории</p>
        <nav className="flex flex-col gap-1">
          <FilterLink active={!filters.category} onClick={() => apply({ category: '' })}>
            Все товары
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
                  {category.name}
                </FilterLink>
              ))}
        </nav>
      </section>

      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Цена, $</p>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-ink-muted">
            от
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
            до
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
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Рейтинг</p>
        <div className="flex flex-col gap-1">
          {RATINGS.map((option) => (
            <FilterLink
              key={option.value || 'any'}
              active={filters.minRating === option.value}
              onClick={() => apply({ minRating: option.value })}
            >
              {option.label}
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
          Сбросить фильтры
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
      className={[
        'rounded-xl px-3 py-2 text-left text-sm',
        active ? 'bg-ink text-cream' : 'text-ink hover:bg-paper-2',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

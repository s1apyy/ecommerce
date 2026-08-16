import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard.jsx'
import Pagination from '../components/Pagination.jsx'

const PAGE_SIZE = 12

const SORTS = [
  { label: 'Название', sortBy: 'title', order: 'asc' },
  { label: 'Цена ↑', sortBy: 'price', order: 'asc' },
  { label: 'Цена ↓', sortBy: 'price', order: 'desc' },
  { label: 'Рейтинг', sortBy: 'rating', order: 'desc' },
]

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const sortBy = searchParams.get('sortBy') || 'title'
  const order = searchParams.get('order') || 'asc'
  const category = searchParams.get('category') || ''
  const q = searchParams.get('q') || ''

  const { data, isPending, isError, error, isFetching } = useProducts({
    page,
    limit: PAGE_SIZE,
    sortBy,
    order,
    category,
    q,
  })

  const products = data?.products ?? []
  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  function updateParams(patch) {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([key, value]) => {
      if (value === '' || value == null) next.delete(key)
      else next.set(key, String(value))
    })
    setSearchParams(next)
  }

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Каталог</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">
            {q ? `Поиск: ${q}` : category ? category.replaceAll('-', ' ') : 'Все товары'}
          </h1>
          <p className="mt-2 text-ink-muted">{total} позиций · DummyJSON /products</p>
        </div>
        <label className="flex items-center gap-3 text-sm">
          <span className="text-ink-muted">Сортировка</span>
          <select
            value={`${sortBy}:${order}`}
            onChange={(event) => {
              const [nextSort, nextOrder] = event.target.value.split(':')
              updateParams({ sortBy: nextSort, order: nextOrder, page: 1 })
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
      ) : products.length === 0 ? (
        <p className="rounded-2xl border border-line bg-cream p-8 text-ink-muted">Ничего не найдено.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        isFetching={isFetching && !isPending}
        onPageChange={(nextPage) => updateParams({ page: nextPage })}
      />
    </section>
  )
}

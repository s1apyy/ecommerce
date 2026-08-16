import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useUiStore } from '../store/useUiStore'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

export default function Header() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const debouncedQuery = useDebouncedValue(query, 400)
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  )
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)
  const openCart = useUiStore((state) => state.openCart)

  useEffect(() => {
    const current = searchParams.get('q') || ''
    if (debouncedQuery === current) return

    const next = new URLSearchParams(searchParams)
    if (debouncedQuery) {
      next.set('q', debouncedQuery)
      next.delete('category')
    } else {
      next.delete('q')
    }
    next.delete('page')
    navigate({ pathname: '/', search: next.toString() })
  }, [debouncedQuery, navigate, searchParams])

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="flex h-[4.5rem] items-center gap-3 px-4 md:px-6">
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-paper text-ink"
          aria-label="Категории"
        >
          <span className="sr-only">Меню</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <Link to="/" className="shrink-0">
          <p className="font-display text-xl tracking-tight md:text-2xl">Aurelia</p>
          <p className="-mt-1 hidden text-[11px] uppercase tracking-[0.18em] text-ink-muted sm:block">
            market
          </p>
        </Link>

        <label className="relative mx-auto hidden min-w-0 flex-1 max-w-xl sm:block">
          <span className="sr-only">Поиск товаров</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Искать в каталоге…"
            className="h-11 w-full rounded-full border border-line bg-paper px-4 pr-10 outline-none placeholder:text-ink-muted focus:border-accent"
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-ink-muted">
            ⌕
          </span>
        </label>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/cart"
            className="hidden h-10 items-center rounded-full px-3 text-sm text-ink-muted hover:text-ink md:inline-flex"
          >
            Корзина
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm text-cream"
          >
            <span>Cart</span>
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs text-cream">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      <div className="border-t border-line px-4 py-2 sm:hidden">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Искать в каталоге…"
          className="h-10 w-full rounded-full border border-line bg-paper px-4 outline-none"
        />
      </div>
    </header>
  )
}

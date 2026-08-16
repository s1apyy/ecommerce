import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useUiStore } from '../store/useUiStore'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useI18n } from '../hooks/useI18n'
import PrefsSwitch from './PrefsSwitch.jsx'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const debouncedQuery = useDebouncedValue(query, 400)
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  )
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)
  const openCart = useUiStore((state) => state.openCart)
  const { t } = useI18n()
  const showMenu = location.pathname === '/'

  useEffect(() => {
    const current = searchParams.get('q') || ''
    if (debouncedQuery === current) return

    const next = new URLSearchParams(location.pathname === '/' ? searchParams : '')
    if (debouncedQuery) {
      next.set('q', debouncedQuery)
      next.delete('category')
    } else {
      next.delete('q')
    }
    next.delete('page')
    navigate({ pathname: '/', search: next.toString() })
  }, [debouncedQuery, location.pathname, navigate, searchParams])

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="flex h-[4.5rem] items-center gap-3 px-4 md:px-6">
        {showMenu ? (
          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-paper text-ink"
            aria-label={t('header.categories')}
          >
            <span className="sr-only">{t('header.menu')}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}

        <Link to="/" className="shrink-0">
          <p className="font-display text-xl tracking-tight md:text-2xl">Aurelia</p>
          <p className="-mt-1 hidden text-[11px] uppercase tracking-[0.18em] text-ink-muted sm:block">
            market
          </p>
        </Link>

        <SearchField
          className="relative mx-auto hidden min-w-0 flex-1 max-w-xl sm:block"
          value={query}
          onChange={setQuery}
          placeholder={t('header.search')}
          ariaLabel={t('header.searchAria')}
        />

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <PrefsSwitch />
          </div>
          <Link
            to="/profile"
            aria-label={t('header.profile')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink hover:border-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M5.5 19c1.4-3 3.7-4.5 6.5-4.5S17.1 16 18.5 19"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </Link>
          <button
            type="button"
            data-cart-target
            onClick={openCart}
            className="relative inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm text-cream"
          >
            <span className="hidden sm:inline">{t('header.cart')}</span>
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs text-cream">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-2 md:hidden">
        <SearchField
          className="relative min-w-0 flex-1"
          value={query}
          onChange={setQuery}
          placeholder={t('header.search')}
          ariaLabel={t('header.searchAria')}
          inputClassName="h-10 w-full rounded-full border border-line bg-paper px-4 outline-none"
        />
        <PrefsSwitch />
      </div>
    </header>
  )
}

function SearchField({ value, onChange, placeholder, ariaLabel, className, inputClassName }) {
  return (
    <label className={className}>
      <span className="sr-only">{ariaLabel}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={
          inputClassName ||
          'h-11 w-full rounded-full border border-line bg-paper px-4 pr-10 outline-none placeholder:text-ink-muted focus:border-accent'
        }
      />
      {!inputClassName ? (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-ink-muted">
          ⌕
        </span>
      ) : null}
    </label>
  )
}

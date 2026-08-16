import { NavLink, useSearchParams } from 'react-router-dom'
import { useCategories } from '../hooks/useProducts'
import { useUiStore } from '../store/useUiStore'

export default function Sidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen)
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen)
  const { data: categories = [], isPending } = useCategories()
  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''

  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto border-r border-line bg-cream px-4 py-6 scrollbar-thin transition-transform md:sticky md:top-[4.5rem] md:z-0 md:h-[calc(100vh-4.5rem)]',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden',
      ].join(' ')}
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
        Категории
      </p>
      <nav className="flex flex-col gap-1">
        <NavLink
          to="/"
          onClick={() => {
            if (window.innerWidth < 768) setSidebarOpen(false)
          }}
          className={[
            'rounded-xl px-3 py-2 text-sm',
            !activeCategory ? 'bg-ink text-cream' : 'text-ink hover:bg-paper-2',
          ].join(' ')}
        >
          Все товары
        </NavLink>
        {isPending
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-9 animate-pulse rounded-xl bg-paper-2" />
            ))
          : categories.map((category) => (
              <NavLink
                key={category.slug}
                to={`/?category=${encodeURIComponent(category.slug)}&page=1`}
                onClick={() => {
                  if (window.innerWidth < 768) setSidebarOpen(false)
                }}
                className={[
                  'rounded-xl px-3 py-2 text-sm',
                  activeCategory === category.slug
                    ? 'bg-ink text-cream'
                    : 'text-ink hover:bg-paper-2',
                ].join(' ')}
              >
                {category.name}
              </NavLink>
            ))}
      </nav>
    </aside>
  )
}

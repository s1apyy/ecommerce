import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useUiStore } from '../store/useUiStore'
import { useI18n } from '../hooks/useI18n'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import CartDrawer from './CartDrawer.jsx'

export default function Layout() {
  const location = useLocation()
  const { locale, t } = useI18n()
  const sidebarOpen = useUiStore((state) => state.sidebarOpen)
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen)
  const showSidebar = location.pathname === '/'

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'ru'
  }, [locale])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <div className="flex">
        {showSidebar ? <Sidebar /> : null}
        {showSidebar && sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-ink/30 md:hidden"
            aria-label={t('cart.close')}
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}
        <main className="min-h-[calc(100vh-4.5rem)] min-w-0 flex-1 px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
      <CartDrawer />
    </div>
  )
}

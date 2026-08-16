import { Outlet } from 'react-router-dom'
import { useUiStore } from '../store/useUiStore'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import CartDrawer from './CartDrawer.jsx'

export default function Layout() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen)
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen)

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <div className="flex">
        <Sidebar />
        {sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-ink/30 md:hidden"
            aria-label="Закрыть меню"
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

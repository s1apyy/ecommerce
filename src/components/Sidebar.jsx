import { useUiStore } from '../store/useUiStore'
import FilterPanel from './FilterPanel.jsx'

export default function Sidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen)
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen)

  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto border-r border-line bg-cream px-4 py-6 scrollbar-thin transition-transform md:sticky md:top-[4.5rem] md:z-0 md:h-[calc(100vh-4.5rem)]',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden',
      ].join(' ')}
    >
      <FilterPanel
        onNavigate={() => {
          if (window.innerWidth < 768) setSidebarOpen(false)
        }}
      />
    </aside>
  )
}

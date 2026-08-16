import { useI18n } from '../hooks/useI18n'

export default function InfiniteScrollSentinel({ sentinelRef, hasNextPage, isFetchingNextPage }) {
  const { t } = useI18n()
  const label = isFetchingNextPage
    ? t('catalog.loadingMore')
    : hasNextPage
      ? t('catalog.scrollMore')
      : t('catalog.allLoaded')

  return (
    <div ref={sentinelRef} className="mt-10 flex justify-center py-6 text-sm text-ink-muted">
      {label}
    </div>
  )
}

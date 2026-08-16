export default function InfiniteScrollSentinel({ sentinelRef, hasNextPage, isFetchingNextPage }) {
  return (
    <div ref={sentinelRef} className="mt-10 flex justify-center py-6 text-sm text-ink-muted">
      {isFetchingNextPage ? 'Загружаем ещё товары…' : hasNextPage ? 'Прокрутите ниже' : 'Это все товары'}
    </div>
  )
}

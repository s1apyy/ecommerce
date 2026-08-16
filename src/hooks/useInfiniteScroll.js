import { useEffect, useRef } from 'react'

export function useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage, enabled = true }) {
  const sentinelRef = useRef(null)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !enabled) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '320px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled, fetchNextPage, hasNextPage, isFetchingNextPage])

  return sentinelRef
}

export function useFillFilteredPages({
  filteredCount,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  minVisible = 8,
}) {
  useEffect(() => {
    if (filteredCount < minVisible && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [filteredCount, fetchNextPage, hasNextPage, isFetchingNextPage, minVisible])
}

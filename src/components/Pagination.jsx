export default function Pagination({ page, totalPages, onPageChange, isFetching }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1,
  )

  const items = []
  pages.forEach((value, index) => {
    if (index > 0 && value - pages[index - 1] > 1) {
      items.push('ellipsis')
    }
    items.push(value)
  })

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-full border border-line px-4 py-2 text-sm disabled:opacity-40"
      >
        Назад
      </button>
      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`e-${index}`} className="px-2 text-ink-muted">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={[
              'h-10 min-w-10 rounded-full px-3 text-sm',
              item === page ? 'bg-ink text-cream' : 'border border-line bg-cream',
            ].join(' ')}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-full border border-line px-4 py-2 text-sm disabled:opacity-40"
      >
        Далее
      </button>
      {isFetching ? <span className="text-sm text-ink-muted">Обновление…</span> : null}
    </div>
  )
}

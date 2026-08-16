export default function StarRating({ value = 0, size = 18, className = '' }) {
  const clamped = Math.min(5, Math.max(0, Number(value) || 0))

  return (
    <span
      className={['inline-flex items-center gap-0.5 text-accent', className].filter(Boolean).join(' ')}
      aria-label={`${clamped.toFixed(1)} / 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, clamped - (star - 1)))
        return <Star key={star} size={size} fill={fill} />
      })}
    </span>
  )
}

function Star({ size, fill }) {
  const pct = Math.round(fill * 100)

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1L12 17.4 6.6 20.3l1-6.1L3.2 9.9 9.3 9 12 3.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1L12 17.4 6.6 20.3l1-6.1L3.2 9.9 9.3 9 12 3.4z"
        fill="currentColor"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      />
    </svg>
  )
}

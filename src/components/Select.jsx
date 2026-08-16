import { cn } from '../lib/cn'

export default function Select({ value, onChange, children, className, id, 'aria-label': ariaLabel }) {
  return (
    <div className={cn('relative inline-flex max-w-full items-center', className)}>
      <select
        id={id}
        value={value}
        aria-label={ariaLabel}
        onChange={onChange}
        className="h-11 w-max max-w-full cursor-pointer appearance-none rounded-full border border-line bg-cream py-2 pl-4 pr-9 outline-none focus:border-accent"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3.5 text-ink-muted" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.4 4.4 6 8l3.6-3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}

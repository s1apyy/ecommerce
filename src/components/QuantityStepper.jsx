import { cn } from '../lib/cn'

const SIZES = {
  sm: 'h-7 w-7 text-sm',
  md: 'h-8 w-8',
  lg: 'h-11 w-11',
}

export default function QuantityStepper({ value, onDecrease, onIncrease, size = 'md' }) {
  const btn = cn('rounded-full border border-line', SIZES[size] || SIZES.md)

  return (
    <div className="inline-flex items-center">
      <button type="button" className={btn} aria-label="−" onClick={onDecrease}>
        −
      </button>
      <span className="w-8 text-center text-sm">{value}</span>
      <button type="button" className={btn} aria-label="+" onClick={onIncrease}>
        +
      </button>
    </div>
  )
}

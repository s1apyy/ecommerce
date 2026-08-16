import { Link } from 'react-router-dom'
import { useI18n } from '../hooks/useI18n'
import QuantityStepper from './QuantityStepper.jsx'
import { cn } from '../lib/cn'

export default function CartLineItem({ item, onIncrease, onDecrease, onRemove, compact = false }) {
  const { t, money, productTitle } = useI18n()
  const title = productTitle(item)

  return (
    <div className={cn('flex gap-4 rounded-3xl border border-line bg-cream', compact ? 'gap-3 p-3' : 'p-4')}>
      <img
        src={item.thumbnail}
        alt=""
        className={cn(
          'rounded-2xl bg-paper-2 object-contain',
          compact ? 'h-20 w-20 p-1' : 'h-24 w-24 p-2',
        )}
      />
      <div className="min-w-0 flex-1">
        <Link to={`/products/${item.id}`} className="font-medium">
          {title}
        </Link>
        <p className="mt-1 text-sm text-ink-muted">
          {money(item.price)} × {item.quantity}
        </p>
        <p className="mt-1 font-medium">{money(item.lineTotal ?? item.price * item.quantity)}</p>
        <div className="mt-3 flex items-center gap-2">
          <QuantityStepper
            size={compact ? 'sm' : 'md'}
            value={item.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
          <button type="button" className="ml-auto text-sm text-ink-muted" onClick={onRemove}>
            {t('cart.remove')}
          </button>
        </div>
      </div>
    </div>
  )
}

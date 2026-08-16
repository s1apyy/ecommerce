import { Link } from 'react-router-dom'
import { formatPrice } from '../lib/format'

export default function CartLineItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex gap-4 rounded-3xl border border-line bg-cream p-4">
      <img src={item.thumbnail} alt="" className="h-24 w-24 rounded-2xl object-cover" />
      <div className="min-w-0 flex-1">
        <Link to={`/products/${item.id}`} className="font-medium">
          {item.title}
        </Link>
        <p className="mt-1 text-sm text-ink-muted">
          {formatPrice(item.price)} × {item.quantity}
        </p>
        <p className="mt-1 font-medium">{formatPrice(item.lineTotal ?? item.price * item.quantity)}</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="Уменьшить количество"
            className="h-8 w-8 rounded-full border border-line"
            onClick={onDecrease}
          >
            −
          </button>
          <span className="w-6 text-center">{item.quantity}</span>
          <button
            type="button"
            aria-label="Увеличить количество"
            className="h-8 w-8 rounded-full border border-line"
            onClick={onIncrease}
          >
            +
          </button>
          <button type="button" className="ml-auto text-sm text-ink-muted" onClick={onRemove}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

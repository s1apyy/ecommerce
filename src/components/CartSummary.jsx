import { formatPrice } from '../lib/format'

export default function CartSummary({ totals }) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Позиции</span>
        <span>
          {totals.uniqueCount} / {totals.itemCount} шт.
        </span>
      </div>
      <div className="flex justify-between">
        <span>Товары</span>
        <span>{formatPrice(totals.subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span>Скидка {totals.promo ? `(${totals.promo.label})` : ''}</span>
        <span>−{formatPrice(totals.discount)}</span>
      </div>
      <div className="flex justify-between">
        <span>Доставка</span>
        <span>{totals.shipping === 0 ? 'Бесплатно' : formatPrice(totals.shipping)}</span>
      </div>
      <div className="flex justify-between border-t border-line pt-3 font-display text-2xl">
        <span>Итого</span>
        <span>{formatPrice(totals.total)}</span>
      </div>
    </div>
  )
}

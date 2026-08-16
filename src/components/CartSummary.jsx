import { useI18n } from '../hooks/useI18n'
import { formatPromoLabel } from '../lib/promos'

export default function CartSummary({ totals }) {
  const { t, money } = useI18n()
  const promo = formatPromoLabel(totals.promo, t, money)

  return (
    <div className="space-y-2 text-sm">
      <Row label={t('cart.items')} value={t('cart.pcs', { unique: totals.uniqueCount, count: totals.itemCount })} />
      <Row label={t('cart.products')} value={money(totals.subtotal)} />
      <Row label={`${t('cart.discount')} ${promo ? `(${promo})` : ''}`} value={`−${money(totals.discount)}`} />
      <Row label={t('cart.shipping')} value={totals.shipping === 0 ? t('cart.free') : money(totals.shipping)} />
      <div className="flex justify-between border-t border-line pt-3 font-display text-2xl">
        <span>{t('cart.total')}</span>
        <span>{money(totals.total)}</span>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

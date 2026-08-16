export const PROMOS = {
  SALE10: { type: 'percent', value: 10, labelKey: 'promo.sale10' },
  SALE20: { type: 'percent', value: 20, labelKey: 'promo.sale20' },
  WELCOME: { type: 'fixed', value: 15, labelKey: 'promo.welcome' },
  FREESHIP: { type: 'shipping', value: 0, labelKey: 'promo.freeship' },
}

export const SHIPPING_THRESHOLD = 100
export const SHIPPING_COST = 9.99

export function formatPromoLabel(promo, t, money) {
  if (!promo) return ''
  if (promo.type === 'fixed') return t(promo.labelKey, { amount: money(promo.value) })
  if (promo.labelKey) return t(promo.labelKey)
  return promo.label || ''
}

import { PROMOS, SHIPPING_COST, SHIPPING_THRESHOLD } from './promos'

export function getCartTotals(items, promoCode) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const promo = PROMOS[promoCode]
  let discount = 0
  let shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST

  if (promo?.type === 'percent') {
    discount = subtotal * (promo.value / 100)
  } else if (promo?.type === 'fixed') {
    discount = Math.min(promo.value, subtotal)
  } else if (promo?.type === 'shipping') {
    shipping = 0
  }

  return {
    subtotal,
    discount,
    shipping,
    total: Math.max(0, subtotal - discount + shipping),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    promo,
  }
}

export const USD_TO_RUB = 92

export function formatPrice(value, options = {}) {
  const currency = options.currency || 'USD'
  const locale = options.locale || (currency === 'RUB' ? 'ru' : 'en')
  const amount = currency === 'RUB' ? Number(value) * USD_TO_RUB : Number(value)

  return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'RUB' ? 0 : 2,
    minimumFractionDigits: currency === 'RUB' ? 0 : 2,
  }).format(amount)
}

export function salePrice(product) {
  const discount = product.discountPercentage || 0
  return product.price * (1 - discount / 100)
}

export function toUsdFilterValue(value, currency = 'USD') {
  if (value === '' || value == null) return null
  const amount = Number(value)
  if (!Number.isFinite(amount)) return null
  return currency === 'RUB' ? amount / USD_TO_RUB : amount
}

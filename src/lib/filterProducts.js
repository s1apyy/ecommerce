import { salePrice, toUsdFilterValue } from './format'

export function filterProducts(products, { minPrice, maxPrice, minRating, currency = 'USD' } = {}) {
  const minP = toUsdFilterValue(minPrice, currency)
  const maxP = toUsdFilterValue(maxPrice, currency)
  const minR = minRating === '' || minRating == null ? null : Number(minRating)

  return products.filter((product) => {
    const price = salePrice(product)
    if (minP != null && price < minP) return false
    if (maxP != null && price > maxP) return false
    if (Number.isFinite(minR) && product.rating < minR) return false
    return true
  })
}

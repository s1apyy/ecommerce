import { salePrice } from './format'

export function filterProducts(products, { minPrice, maxPrice, minRating } = {}) {
  const minP = minPrice === '' || minPrice == null ? null : Number(minPrice)
  const maxP = maxPrice === '' || maxPrice == null ? null : Number(maxPrice)
  const minR = minRating === '' || minRating == null ? null : Number(minRating)

  return products.filter((product) => {
    const price = salePrice(product)
    if (Number.isFinite(minP) && price < minP) return false
    if (Number.isFinite(maxP) && price > maxP) return false
    if (Number.isFinite(minR) && product.rating < minR) return false
    return true
  })
}

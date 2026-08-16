export function productImage(product) {
  if (!product) return ''
  if (product.images?.length) return product.images[0]
  return product.thumbnail || ''
}

export function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function salePrice(product) {
  const discount = product.discountPercentage || 0
  return product.price * (1 - discount / 100)
}

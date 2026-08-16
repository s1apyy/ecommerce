export const sampleProduct = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description: 'Volumizing mascara with a cruelty-free formula.',
  brand: 'Essence',
  category: 'beauty',
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
  images: [
    'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
  ],
}

export const sampleCartItem = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  thumbnail: sampleProduct.thumbnail,
  price: 9.27,
  stock: 5,
  quantity: 2,
  lineTotal: 18.54,
}

export const sampleCategories = [
  { slug: 'beauty', name: 'Beauty', url: 'https://dummyjson.com/products/category/beauty' },
  { slug: 'smartphones', name: 'Smartphones', url: 'https://dummyjson.com/products/category/smartphones' },
  { slug: 'furniture', name: 'Furniture', url: 'https://dummyjson.com/products/category/furniture' },
]

export const sampleTotals = {
  lines: [sampleCartItem],
  uniqueCount: 1,
  itemCount: 2,
  subtotal: 18.54,
  discount: 1.85,
  shipping: 9.99,
  total: 26.68,
  promo: { type: 'percent', value: 10, labelKey: 'promo.sale10', label: '−10% на заказ' },
}

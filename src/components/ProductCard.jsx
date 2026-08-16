import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { flyToCart } from '../lib/flyToCart'
import { formatPrice, salePrice } from '../lib/format'
import { useCartStore } from '../store/useCartStore'

export default function ProductCard({ product }) {
  const cardRef = useRef(null)
  const addItem = useCartStore((state) => state.addItem)
  const discounted = salePrice(product)

  return (
    <article
      ref={cardRef}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-cream"
    >
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-paper-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.discountPercentage > 0 ? (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-cream">
            −{Math.round(product.discountPercentage)}%
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">{product.brand || product.category}</p>
          <Link to={`/products/${product.id}`} className="mt-1 line-clamp-2 font-medium leading-snug">
            {product.title}
          </Link>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-xl">{formatPrice(discounted)}</p>
            {product.discountPercentage > 0 ? (
              <p className="text-sm text-ink-muted line-through">{formatPrice(product.price)}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => {
              addItem(product)
              flyToCart(cardRef.current)
            }}
            className="rounded-full bg-ink px-3 py-2 text-sm text-cream hover:bg-accent-dark"
          >
            В корзину
          </button>
        </div>
      </div>
    </article>
  )
}

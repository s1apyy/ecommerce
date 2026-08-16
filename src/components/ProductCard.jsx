import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { flyToCart } from '../lib/flyToCart'
import { salePrice } from '../lib/format'
import { productImage } from '../lib/media'
import { useCartStore } from '../store/useCartStore'
import { useI18n } from '../hooks/useI18n'

export default function ProductCard({ product }) {
  const cardRef = useRef(null)
  const addItem = useCartStore((state) => state.addItem)
  const discounted = salePrice(product)
  const { t, money, productTitle, categoryLabel } = useI18n()
  const image = productImage(product)
  const title = productTitle(product)

  return (
    <article
      ref={cardRef}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-cream"
    >
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-paper-2"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
        />
        {product.discountPercentage > 0 ? (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-cream">
            −{Math.round(product.discountPercentage)}%
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
            {product.brand || categoryLabel(product.category)}
          </p>
          <Link to={`/products/${product.id}`} className="mt-1 line-clamp-2 font-medium leading-snug">
            {title}
          </Link>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-xl">{money(discounted)}</p>
            {product.discountPercentage > 0 ? (
              <p className="text-sm text-ink-muted line-through">{money(product.price)}</p>
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
            {t('product.addShort')}
          </button>
        </div>
      </div>
    </article>
  )
}

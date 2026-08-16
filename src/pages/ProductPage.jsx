import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'
import { flyToCart } from '../lib/flyToCart'
import { salePrice } from '../lib/format'
import { cn } from '../lib/cn'
import { useCartStore } from '../store/useCartStore'
import { useI18n } from '../hooks/useI18n'
import QuantityStepper from '../components/QuantityStepper.jsx'
import StarRating from '../components/StarRating.jsx'

export default function ProductPage() {
  const { id } = useParams()
  const reviewsOpen = useLocation().pathname.endsWith('/reviews')
  const { data: product, isPending, isError, error } = useProduct(id)
  const addItem = useCartStore((state) => state.addItem)
  const visualRef = useRef(null)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { t, money, dateLocale, productTitle, categoryLabel } = useI18n()

  useEffect(() => {
    setActiveImage(0)
    setQuantity(1)
  }, [id])

  if (isPending) {
    return <div className="h-[32rem] animate-pulse rounded-3xl bg-paper-2" />
  }

  if (isError || !product) {
    return (
      <p className="rounded-2xl border border-accent/30 bg-cream p-6 text-accent">
        {t('product.notFound', { message: error?.message || 'unknown' })}
      </p>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail]
  const discounted = salePrice(product)
  const reviews = product.reviews ?? []
  const title = productTitle(product)
  const tabClass = ({ isActive }) =>
    cn(
      '-mb-px rounded-t-2xl px-5 py-3 text-sm font-medium',
      isActive ? 'border border-b-cream border-line bg-cream' : 'text-ink-muted',
    )

  return (
    <article className="mx-auto max-w-6xl">
      <Link to="/" className="text-sm text-ink-muted">
        {t('product.back')}
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div ref={visualRef} className="overflow-hidden rounded-[2rem] bg-paper-2">
            <img
              src={images[activeImage]}
              alt={title}
              className="aspect-square w-full object-contain p-6"
            />
          </div>
          {images.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    'h-20 w-20 overflow-hidden rounded-2xl border bg-paper-2',
                    index === activeImage ? 'border-ink' : 'border-line',
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-contain p-1" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-line bg-cream p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
            {product.brand} · {categoryLabel(product.category)}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight">{title}</h1>
          <div className="mt-4 flex items-center gap-3">
            <StarRating value={product.rating} />
            <span className="text-sm text-ink-muted">{Number(product.rating).toFixed(1)}</span>
          </div>
          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-4xl">{money(discounted)}</p>
            {product.discountPercentage > 0 ? (
              <p className="text-ink-muted line-through">{money(product.price)}</p>
            ) : null}
          </div>
          <p className="mt-2 text-sm text-ink-muted">{t('product.stock', { stock: product.stock })}</p>

          <div className="mt-8 flex items-center gap-3">
            <div className="rounded-full border border-line px-1">
              <QuantityStepper
                size="lg"
                value={quantity}
                onDecrease={() => setQuantity((value) => Math.max(1, value - 1))}
                onIncrease={() => setQuantity((value) => Math.min(product.stock || 99, value + 1))}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                addItem(product, quantity)
                flyToCart(visualRef.current)
              }}
              className="h-11 flex-1 rounded-full bg-accent text-cream"
            >
              {t('product.add')}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-2 border-b border-line">
        <NavLink to={`/products/${id}`} end className={tabClass}>
          {t('product.details')}
        </NavLink>
        <NavLink to={`/products/${id}/reviews`} className={tabClass}>
          {t('product.reviews')} · {reviews.length}
        </NavLink>
      </div>

      <div className="rounded-b-[2rem] rounded-tr-[2rem] border border-t-0 border-line bg-cream p-6 md:p-8">
        {reviewsOpen ? (
          <ReviewsList reviews={reviews} empty={t('product.noReviews')} dateLocale={dateLocale} />
        ) : (
          <p className="max-w-3xl leading-relaxed text-ink-muted">{product.description}</p>
        )}
      </div>
    </article>
  )
}

function ReviewsList({ reviews, empty, dateLocale }) {
  if (!reviews.length) {
    return <p className="text-ink-muted">{empty}</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reviews.map((review, index) => (
        <blockquote
          key={`${review.reviewerName}-${index}`}
          className="rounded-3xl border border-line bg-paper p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{review.reviewerName}</p>
              {review.date ? (
                <p className="mt-1 text-xs text-ink-muted">
                  {new Date(review.date).toLocaleDateString(dateLocale)}
                </p>
              ) : null}
            </div>
            <StarRating value={review.rating} size={16} />
          </div>
          <p className="mt-3 text-ink-muted">{review.comment}</p>
        </blockquote>
      ))}
    </div>
  )
}

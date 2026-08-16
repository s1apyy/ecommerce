import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'
import { formatPrice, salePrice } from '../lib/format'
import { useCartStore } from '../store/useCartStore'
import { useUiStore } from '../store/useUiStore'

export default function ProductPage() {
  const { id } = useParams()
  const { data: product, isPending, isError, error } = useProduct(id)
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useUiStore((state) => state.openCart)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

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
        Товар не найден: {error?.message || 'unknown'}
      </p>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail]
  const discounted = salePrice(product)

  return (
    <article className="mx-auto max-w-6xl">
      <Link to="/" className="text-sm text-ink-muted">
        ← К каталогу
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="overflow-hidden rounded-[2rem] bg-paper-2">
            <img src={images[activeImage]} alt={product.title} className="aspect-square w-full object-cover" />
          </div>
          {images.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={[
                    'h-20 w-20 overflow-hidden rounded-2xl border',
                    index === activeImage ? 'border-ink' : 'border-line',
                  ].join(' ')}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-line bg-cream p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
            {product.brand} · {product.category}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight">{product.title}</h1>
          <p className="mt-4 text-ink-muted">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-4xl">{formatPrice(discounted)}</p>
            {product.discountPercentage > 0 ? (
              <p className="text-ink-muted line-through">{formatPrice(product.price)}</p>
            ) : null}
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            Рейтинг {product.rating} · В наличии {product.stock}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-line">
              <button
                type="button"
                className="h-11 w-11"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                −
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                type="button"
                className="h-11 w-11"
                onClick={() => setQuantity((value) => Math.min(product.stock || 99, value + 1))}
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                addItem(product, quantity)
                openCart()
              }}
              className="h-11 flex-1 rounded-full bg-accent text-cream"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>

      {product.reviews?.length ? (
        <section className="mt-12">
          <h2 className="font-display text-3xl">Отзывы</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {product.reviews.map((review, index) => (
              <blockquote key={`${review.reviewerName}-${index}`} className="rounded-3xl border border-line bg-cream p-5">
                <p className="text-sm font-medium">
                  {review.reviewerName} · {review.rating}/5
                </p>
                <p className="mt-2 text-ink-muted">{review.comment}</p>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}

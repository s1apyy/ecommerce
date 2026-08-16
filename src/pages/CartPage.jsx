import { Link } from 'react-router-dom'
import PromoForm from '../components/PromoForm.jsx'
import { getCartTotals } from '../lib/cartTotals'
import { formatPrice } from '../lib/format'
import { useCartStore } from '../store/useCartStore'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const totals = getCartTotals(items, promoCode)

  return (
    <section className="mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Оформление</p>
      <h1 className="mt-1 font-display text-4xl md:text-5xl">Корзина</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-line bg-cream p-8">
          <p className="text-ink-muted">Корзина пуста.</p>
          <Link to="/" className="mt-4 inline-flex rounded-full bg-ink px-5 py-3 text-cream">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-3xl border border-line bg-cream p-4">
                <img src={item.thumbnail} alt="" className="h-24 w-24 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <Link to={`/products/${item.id}`} className="font-medium">
                    {item.title}
                  </Link>
                  <p className="mt-1 text-sm text-ink-muted">{formatPrice(item.price)}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full border border-line"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full border border-line"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="ml-auto text-sm text-ink-muted"
                      onClick={() => removeItem(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={clearCart} className="text-sm text-ink-muted">
              Очистить корзину
            </button>
          </div>

          <aside className="h-fit space-y-5 rounded-3xl border border-line bg-cream p-6">
            <PromoForm />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Товары</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Скидка</span>
                <span>−{formatPrice(totals.discount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка</span>
                <span>{totals.shipping === 0 ? 'Бесплатно' : formatPrice(totals.shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-display text-2xl">
                <span>Итого</span>
                <span>{formatPrice(totals.total)}</span>
              </div>
            </div>
            <button
              type="button"
              className="h-12 w-full rounded-full bg-accent text-cream"
              onClick={() => {
                clearCart()
                alert('Заказ принят. DummyJSON не проводит оплату — это демо.')
              }}
            >
              Оформить заказ
            </button>
          </aside>
        </div>
      )}
    </section>
  )
}

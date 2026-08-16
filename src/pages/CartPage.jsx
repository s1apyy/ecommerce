import { Link } from 'react-router-dom'
import CartLineItem from '../components/CartLineItem.jsx'
import CartSummary from '../components/CartSummary.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import PromoForm from '../components/PromoForm.jsx'
import { useCheckout } from '../hooks/useCheckout'
import { formatPrice } from '../lib/format'
import { getCartTotals } from '../lib/cartTotals'
import { useCartStore } from '../store/useCartStore'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const totals = getCartTotals(items, promoCode)
  const checkout = useCheckout()

  if (checkout.isSuccess) {
    const order = checkout.data
    return (
      <section className="mx-auto max-w-2xl rounded-3xl border border-line bg-cream p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Заказ принят</p>
        <h1 className="mt-2 font-display text-4xl">Спасибо, {order.customer?.name}</h1>
        <p className="mt-3 text-ink-muted">
          Номер заказа #{order.id}. DummyJSON вернул корзину с {order.totalProducts} позициями.
        </p>
        <p className="mt-2 text-sm">
          Наша сумма: {formatPrice(order.clientTotals?.total ?? totals.total)}. API: {formatPrice(order.discountedTotal || order.total || 0)}.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-cream">
          Вернуться в каталог
        </Link>
      </section>
    )
  }

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
            {totals.lines.map((item) => (
              <CartLineItem
                key={item.id}
                item={item}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
            <button type="button" onClick={clearCart} className="text-sm text-ink-muted">
              Очистить корзину
            </button>
          </div>

          <aside className="h-fit space-y-5 rounded-3xl border border-line bg-cream p-6">
            <PromoForm />
            <CartSummary totals={totals} />
            <CheckoutForm
              items={items}
              totals={totals}
              promoCode={promoCode}
              isPending={checkout.isPending}
              error={checkout.error}
              onSubmit={(payload) => checkout.mutate(payload)}
            />
          </aside>
        </div>
      )}
    </section>
  )
}

import { Link } from 'react-router-dom'
import { getCartTotals } from '../lib/cartTotals'
import { formatPrice } from '../lib/format'
import { useCartStore } from '../store/useCartStore'
import { useUiStore } from '../store/useUiStore'
import PromoForm from './PromoForm.jsx'

export default function CartDrawer() {
  const cartOpen = useUiStore((state) => state.cartOpen)
  const closeCart = useUiStore((state) => state.closeCart)
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const totals = getCartTotals(items, promoCode)

  if (!cartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" className="absolute inset-0 bg-ink/35" aria-label="Закрыть корзину" onClick={closeCart} />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-2xl">Корзина</h2>
          <button type="button" onClick={closeCart} className="text-sm text-ink-muted">
            Закрыть
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 scrollbar-thin">
          {items.length === 0 ? (
            <p className="text-ink-muted">Пока пусто — выберите что-нибудь в каталоге.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-2xl border border-line p-3">
                <img src={item.thumbnail} alt="" className="h-20 w-20 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-sm">{formatPrice(item.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="h-7 w-7 rounded-full border border-line"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      className="h-7 w-7 rounded-full border border-line"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="ml-auto text-xs text-ink-muted"
                      onClick={() => removeItem(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-4 border-t border-line px-5 py-4">
          <PromoForm />
          <div className="space-y-1 text-sm">
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
            <div className="flex justify-between font-display text-xl">
              <span>Итого</span>
              <span>{formatPrice(totals.total)}</span>
            </div>
          </div>
          <Link
            to="/cart"
            onClick={closeCart}
            className="flex h-12 items-center justify-center rounded-full bg-accent text-cream"
          >
            Перейти к оформлению
          </Link>
        </div>
      </aside>
    </div>
  )
}

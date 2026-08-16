import { Link } from 'react-router-dom'
import { getCartTotals } from '../lib/cartTotals'
import { cn } from '../lib/cn'
import { useCartStore } from '../store/useCartStore'
import { useUiStore } from '../store/useUiStore'
import { useI18n } from '../hooks/useI18n'
import CartLineItem from './CartLineItem.jsx'
import CartSummary from './CartSummary.jsx'
import PromoForm from './PromoForm.jsx'

export default function CartDrawer() {
  const cartOpen = useUiStore((state) => state.cartOpen)
  const closeCart = useUiStore((state) => state.closeCart)
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const totals = getCartTotals(items, promoCode)
  const { t } = useI18n()

  return (
    <div
      className={cn('fixed inset-0 z-50 flex justify-end', cartOpen ? 'pointer-events-auto' : 'pointer-events-none')}
      aria-hidden={!cartOpen}
      inert={!cartOpen || undefined}
    >
      <button
        type="button"
        className={cn(
          'absolute inset-0 bg-ink/35 transition-opacity duration-300 ease-out',
          cartOpen ? 'opacity-100' : 'opacity-0',
        )}
        aria-label={t('cart.close')}
        onClick={closeCart}
      />
      <aside
        className={cn(
          'relative flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out',
          cartOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-2xl">{t('cart.title')}</h2>
          <button type="button" onClick={closeCart} className="text-sm text-ink-muted">
            {t('cart.close')}
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 scrollbar-thin">
          {items.length === 0 ? (
            <p className="text-ink-muted">{t('cart.empty')}</p>
          ) : (
            totals.lines.map((item) => (
              <CartLineItem
                key={item.id}
                compact
                item={item}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                onRemove={() => removeItem(item.id)}
              />
            ))
          )}
        </div>

        <div className="space-y-4 border-t border-line px-5 py-4">
          <PromoForm />
          <CartSummary totals={totals} />
          <Link
            to="/profile?tab=checkout"
            onClick={closeCart}
            className="flex h-12 items-center justify-center rounded-full bg-accent text-cream"
          >
            {t('cart.checkout')}
          </Link>
        </div>
      </aside>
    </div>
  )
}

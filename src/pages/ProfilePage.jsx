import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CartLineItem from '../components/CartLineItem.jsx'
import CartSummary from '../components/CartSummary.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import PromoForm from '../components/PromoForm.jsx'
import Segmented from '../components/Segmented.jsx'
import { useCheckout } from '../hooks/useCheckout'
import { useI18n } from '../hooks/useI18n'
import { cn } from '../lib/cn'
import { getCartTotals } from '../lib/cartTotals'
import { useCartStore } from '../store/useCartStore'
import { useProfileStore } from '../store/useProfileStore'

export default function ProfilePage() {
  const { t, money, locale, currency, dateLocale, setLocale, setCurrency } = useI18n()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') === 'orders' ? 'orders' : 'checkout'
  const name = useProfileStore((state) => state.name)
  const email = useProfileStore((state) => state.email)
  const orders = useProfileStore((state) => state.orders)
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const totals = useMemo(() => getCartTotals(items, promoCode), [items, promoCode])
  const checkout = useCheckout()
  const displayName = name || t('profile.guest')

  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'checkout' }, { replace: true })
    }
  }, [searchParams, setSearchParams])

  function setTab(next) {
    setSearchParams({ tab: next })
    if (next === 'orders') checkout.reset()
  }

  return (
    <section className="mx-auto max-w-5xl">
      <ProfileHero
        name={displayName}
        email={email || t('profile.subtitle')}
        kicker={t('profile.kicker')}
        locale={locale}
        currency={currency}
        setLocale={setLocale}
        setCurrency={setCurrency}
        t={t}
      />

      <div className="mt-8 flex gap-2">
        {['checkout', 'orders'].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm',
              tab === id ? 'bg-ink text-cream' : 'border border-line bg-cream text-ink-muted',
            )}
          >
            {t(id === 'checkout' ? 'profile.tabCheckout' : 'profile.tabOrders')}
          </button>
        ))}
      </div>

      {tab === 'orders' ? (
        <OrdersPanel orders={orders} t={t} money={money} dateLocale={dateLocale} />
      ) : checkout.isSuccess ? (
        <ThanksPanel
          t={t}
          name={checkout.data?.customer?.name || displayName}
          orderId={checkout.data?.id}
          onViewOrders={() => setTab('orders')}
        />
      ) : items.length === 0 ? (
        <EmptyCartPanel t={t} />
      ) : (
        <CheckoutPanel
          lines={totals.lines}
          items={items}
          totals={totals}
          promoCode={promoCode}
          checkout={checkout}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      )}
    </section>
  )
}

function ProfileHero({ name, email, kicker, locale, currency, setLocale, setCurrency, t }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-cream">
      <div className="h-24 bg-[linear-gradient(135deg,#ebe3d8_0%,#f4efe8_50%,#e8d5c4_100%)]" />
      <div className="px-6 pb-8 md:px-8">
        <div className="-mt-10 flex items-end gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-cream bg-ink font-display text-2xl text-cream shadow-lg">
            {initials || 'A'}
          </div>
          <div className="rounded-2xl bg-cream/95 px-3 py-2">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">{kicker}</p>
            <h1 className="font-display text-4xl text-ink">{name}</h1>
            <p className="text-sm text-ink-muted">{email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-line bg-paper p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              {t('profile.language')}
            </p>
            <Segmented
              ariaLabel={t('profile.language')}
              value={locale}
              onChange={setLocale}
              options={[
                { value: 'ru', label: t('profile.ru') },
                { value: 'en', label: t('profile.en') },
              ]}
            />
          </div>
          <div className="rounded-3xl border border-line bg-paper p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              {t('profile.currency')}
            </p>
            <Segmented
              ariaLabel={t('profile.currency')}
              value={currency}
              onChange={setCurrency}
              options={[
                { value: 'USD', label: `$ · ${t('profile.usd')}` },
                { value: 'RUB', label: `₽ · ${t('profile.rub')}` },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function OrdersPanel({ orders, t, money, dateLocale }) {
  if (!orders.length) {
    return <p className="mt-6 rounded-3xl border border-line bg-cream p-8 text-ink-muted">{t('profile.noOrders')}</p>
  }

  return (
    <div className="mt-6 space-y-3">
      {orders.map((order) => (
        <article key={`${order.id}-${order.placedAt}`} className="rounded-3xl border border-line bg-cream p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl">{t('profile.order', { id: order.id })}</h2>
              {order.placedAt ? (
                <p className="mt-1 text-sm text-ink-muted">
                  {new Date(order.placedAt).toLocaleString(dateLocale)}
                </p>
              ) : null}
            </div>
            <p className="font-display text-2xl">{money(order.total)}</p>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            {t('profile.orderItems', { count: order.items?.length || 0 })}
            {order.customer?.email ? ` · ${order.customer.email}` : ''}
          </p>
        </article>
      ))}
    </div>
  )
}

function ThanksPanel({ t, name, orderId, onViewOrders }) {
  return (
    <div className="mt-6 rounded-3xl border border-line bg-cream p-8">
      <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">{t('profile.kicker')}</p>
      <h2 className="mt-2 font-display text-4xl">{t('profile.thanks', { name })}</h2>
      <p className="mt-3 text-ink-muted">{t('profile.thanksNote', { id: orderId })}</p>
      <button type="button" onClick={onViewOrders} className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-cream">
        {t('profile.viewOrders')}
      </button>
    </div>
  )
}

function EmptyCartPanel({ t }) {
  return (
    <div className="mt-6 rounded-3xl border border-line bg-cream p-8">
      <p className="text-ink-muted">{t('profile.emptyCart')}</p>
      <Link to="/" className="mt-4 inline-flex rounded-full bg-ink px-5 py-3 text-cream">
        {t('profile.toCatalog')}
      </Link>
    </div>
  )
}

function CheckoutPanel({ lines, items, totals, promoCode, checkout, updateQuantity, removeItem }) {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-3">
        {lines.map((item) => (
          <CartLineItem
            key={item.id}
            item={item}
            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
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
  )
}

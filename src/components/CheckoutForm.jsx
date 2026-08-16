import { useState } from 'react'
import { formatPrice } from '../lib/format'

export default function CheckoutForm({ items, totals, promoCode, onSubmit, isPending, error }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const emailValid = email.includes('@') && email.includes('.')
  const canSubmit = name.trim().length > 1 && emailValid && items.length > 0 && !isPending

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        if (!canSubmit) return
        onSubmit({
          items,
          customer: { name: name.trim(), email: email.trim() },
          promoCode,
          totals,
        })
      }}
    >
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="checkout-name">
          Имя
        </label>
        <input
          id="checkout-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-11 w-full rounded-xl border border-line bg-paper px-3 outline-none focus:border-accent"
          autoComplete="name"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="checkout-email">
          Email
        </label>
        <input
          id="checkout-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 w-full rounded-xl border border-line bg-paper px-3 outline-none focus:border-accent"
          autoComplete="email"
          required
        />
      </div>
      {error ? <p className="text-sm text-accent">{error.message}</p> : null}
      <button
        type="submit"
        disabled={!canSubmit}
        className="h-12 w-full rounded-full bg-accent text-cream disabled:opacity-40"
      >
        {isPending ? 'Отправляем заказ…' : `Оформить · ${formatPrice(totals.total)}`}
      </button>
      <p className="text-xs text-ink-muted">
        Симуляция: POST https://dummyjson.com/carts/add с содержимым корзины.
      </p>
    </form>
  )
}

import { useEffect, useState } from 'react'
import { useI18n } from '../hooks/useI18n'
import { useProfileStore } from '../store/useProfileStore'

export default function CheckoutForm({ items, totals, promoCode, onSubmit, isPending, error }) {
  const profileName = useProfileStore((state) => state.name)
  const profileEmail = useProfileStore((state) => state.email)
  const [name, setName] = useState(profileName)
  const [email, setEmail] = useState(profileEmail)
  const { t, money } = useI18n()

  useEffect(() => {
    if (profileName) setName(profileName)
    if (profileEmail) setEmail(profileEmail)
  }, [profileName, profileEmail])

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
          {t('checkout.name')}
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
          {t('checkout.email')}
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
        {isPending ? t('checkout.sending') : t('checkout.submit', { total: money(totals.total) })}
      </button>
      <p className="text-xs text-ink-muted">{t('checkout.note')}</p>
    </form>
  )
}

import { useState } from 'react'
import { PROMOS } from '../lib/promos'
import { useCartStore } from '../store/useCartStore'

export default function PromoForm() {
  const promoCode = useCartStore((state) => state.promoCode)
  const promoError = useCartStore((state) => state.promoError)
  const applyPromo = useCartStore((state) => state.applyPromo)
  const removePromo = useCartStore((state) => state.removePromo)
  const [value, setValue] = useState(promoCode)

  return (
    <form
      className="space-y-2"
      onSubmit={(event) => {
        event.preventDefault()
        applyPromo(value)
      }}
    >
      <label className="block text-sm font-medium">Промокод</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="SALE10"
          className="h-11 flex-1 rounded-xl border border-line bg-paper px-3 uppercase outline-none focus:border-accent"
        />
        {promoCode ? (
          <button
            type="button"
            onClick={() => {
              setValue('')
              removePromo()
            }}
            className="rounded-xl border border-line px-3 text-sm"
          >
            Сбросить
          </button>
        ) : (
          <button type="submit" className="rounded-xl bg-ink px-4 text-sm text-cream">
            Применить
          </button>
        )}
      </div>
      {promoError ? <p className="text-sm text-accent">{promoError}</p> : null}
      {promoCode && PROMOS[promoCode] ? (
        <p className="text-sm text-ink-muted">{PROMOS[promoCode].label}</p>
      ) : (
        <p className="text-xs text-ink-muted">SALE10 · SALE20 · WELCOME · FREESHIP</p>
      )}
    </form>
  )
}

import { useState } from 'react'
import { PROMOS, formatPromoLabel } from '../lib/promos'
import { useCartStore } from '../store/useCartStore'
import { useI18n } from '../hooks/useI18n'

export default function PromoForm() {
  const promoCode = useCartStore((state) => state.promoCode)
  const promoError = useCartStore((state) => state.promoError)
  const applyPromo = useCartStore((state) => state.applyPromo)
  const removePromo = useCartStore((state) => state.removePromo)
  const [value, setValue] = useState(promoCode)
  const { t, money } = useI18n()
  const promo = PROMOS[promoCode]

  return (
    <form
      className="space-y-2"
      onSubmit={(event) => {
        event.preventDefault()
        applyPromo(value)
      }}
    >
      <label className="block text-sm font-medium">{t('promo.label')}</label>
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
            {t('promo.reset')}
          </button>
        ) : (
          <button type="submit" className="rounded-xl bg-ink px-4 text-sm text-cream">
            {t('promo.apply')}
          </button>
        )}
      </div>
      {promoError ? <p className="text-sm text-accent">{t(`promo.${promoError}`)}</p> : null}
      {promo ? (
        <p className="text-sm text-ink-muted">{formatPromoLabel(promo, t, money)}</p>
      ) : (
        <p className="text-xs text-ink-muted">{t('promo.hint')}</p>
      )}
    </form>
  )
}

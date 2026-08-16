import { translations } from '../i18n/translations'
import { translateCategory, translateProductTitle } from '../i18n/catalog'
import { formatPrice } from '../lib/format'
import { usePrefsStore } from '../store/usePrefsStore'

export function interpolate(template, vars = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] == null ? '' : String(vars[key]),
  )
}

export function useI18n() {
  const locale = usePrefsStore((state) => state.locale)
  const currency = usePrefsStore((state) => state.currency)
  const setLocale = usePrefsStore((state) => state.setLocale)
  const setCurrency = usePrefsStore((state) => state.setCurrency)

  function t(key, vars) {
    const table = translations[locale] || translations.ru
    return interpolate(table[key] ?? translations.ru[key] ?? key, vars)
  }

  function money(value) {
    return formatPrice(value, { currency, locale })
  }

  function productTitle(product) {
    return translateProductTitle(product, locale)
  }

  function categoryLabel(slug, fallback) {
    return translateCategory(slug, locale, fallback)
  }

  const dateLocale = locale === 'ru' ? 'ru-RU' : 'en-US'

  return {
    t,
    money,
    productTitle,
    categoryLabel,
    locale,
    currency,
    dateLocale,
    setLocale,
    setCurrency,
  }
}

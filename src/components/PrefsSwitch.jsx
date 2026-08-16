import Segmented from './Segmented.jsx'
import { useI18n } from '../hooks/useI18n'

export default function PrefsSwitch() {
  const { t, locale, currency, setLocale, setCurrency } = useI18n()

  return (
    <div className="flex items-center gap-2">
      <Segmented
        ariaLabel={t('header.locale')}
        value={locale}
        onChange={setLocale}
        options={[
          { value: 'ru', label: 'RU' },
          { value: 'en', label: 'EN' },
        ]}
      />
      <Segmented
        ariaLabel={t('header.currency')}
        value={currency}
        onChange={setCurrency}
        options={[
          { value: 'USD', label: '$' },
          { value: 'RUB', label: '₽' },
        ]}
      />
    </div>
  )
}

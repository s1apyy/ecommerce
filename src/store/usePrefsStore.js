import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usePrefsStore = create(
  persist(
    (set) => ({
      locale: 'ru',
      currency: 'USD',
      setLocale: (locale) => set({ locale }),
      setCurrency: (currency) => set({ currency }),
    }),
    { name: 'ecommerce-prefs' },
  ),
)

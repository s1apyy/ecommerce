import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PROMOS } from '../lib/promos'
import { salePrice } from '../lib/format'
import { productImage } from '../lib/media'

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      promoCode: '',
      promoError: '',

      addItem: (product, quantity = 1) => {
        const unitPrice = salePrice(product)
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(item.quantity + quantity, product.stock || 99),
                    }
                  : item,
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                thumbnail: productImage(product),
                price: unitPrice,
                stock: product.stock || 99,
                quantity,
              },
            ],
          }
        })
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [], promoCode: '', promoError: '' }),

      applyPromo: (code) => {
        const normalized = String(code || '')
          .trim()
          .toUpperCase()
        if (!normalized) {
          set({ promoCode: '', promoError: '' })
          return false
        }
        if (!PROMOS[normalized]) {
          set({ promoError: 'notFound' })
          return false
        }
        set({ promoCode: normalized, promoError: '' })
        return true
      },

      removePromo: () => set({ promoCode: '', promoError: '' }),
    }),
    {
      name: 'ecommerce-cart',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
      }),
    },
  ),
)

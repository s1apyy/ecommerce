import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProfileStore = create(
  persist(
    (set) => ({
      name: '',
      email: '',
      orders: [],
      setProfile: (patch) => set((state) => ({ ...state, ...patch })),
      addOrder: (order) =>
        set((state) => ({
          name: order.customer?.name || state.name,
          email: order.customer?.email || state.email,
          orders: [order, ...state.orders],
        })),
    }),
    { name: 'ecommerce-profile' },
  ),
)

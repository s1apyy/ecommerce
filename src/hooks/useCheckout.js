import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../api/orders'
import { useCartStore } from '../store/useCartStore'
import { useProfileStore } from '../store/useProfileStore'

export function useCheckout() {
  const clearCart = useCartStore((state) => state.clearCart)
  const addOrder = useProfileStore((state) => state.addOrder)

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data, variables) => {
      addOrder({
        id: data.id,
        placedAt: data.placedAt,
        customer: data.customer,
        promoCode: variables.promoCode,
        items: variables.items,
        total: variables.totals?.total ?? data.discountedTotal ?? 0,
      })
      clearCart()
    },
  })
}

import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../api/orders'
import { useCartStore } from '../store/useCartStore'

export function useCheckout() {
  const clearCart = useCartStore((state) => state.clearCart)

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      clearCart()
    },
  })
}

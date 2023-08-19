import { create } from "zustand"
import { ICartItem } from "../interfaces/ICartItem"

interface CartState {
  cartItems: ICartItem[]
  addToCart: (cart: ICartItem) => void
  // how to remove single product from cart
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getCart: () => void
  incrementQuantity: (pid: number, sid: number) => void
  decrementQuantity: (pid: number, sid: number) => void
  total: number
  numberOfTokens: number
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      )
      if (existingItem) {
        let total = state.total
        const updatedCartItems = state.cartItems.map((cartItem) => {
          if (cartItem.productId === item.productId) {
            total = cartItem.price + state.total
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          }
          return cartItem
        })
        let numberOfTokens = (total * 0.5) / 100
        if (numberOfTokens > 100) numberOfTokens = 100
        return { cartItems: updatedCartItems, total, numberOfTokens }
      } else {
        const total = item.price * item.quantity + state.total
        let numberOfTokens = (total * 0.5) / 100
        if (numberOfTokens > 100) numberOfTokens = 100
        return {
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
          total,
          numberOfTokens,
        }
      }
    }),
  clearCart: () => {
    set({ cartItems: [], total: 0, numberOfTokens: 0 })
  },
  removeFromCart: (productId) =>
    set((state) => {
      const product = state.cartItems.find(
        (item) => item.productId === productId
      )
      let total = state.total
      if (product) total = state.total - product?.quantity * product?.price

      let numberOfTokens = (total * 0.5) / 100
      if (numberOfTokens > 100) numberOfTokens = 100
      return {
        cartItems: state.cartItems.filter(
          (item) => item.productId !== productId
        ),
        total,
        numberOfTokens,
      }
    }),
  getCart: () => {},
  incrementQuantity: (pid, sid) => {
    set((state) => {
      const items = state.cartItems
      let total = state.total
      items.forEach((item) => {
        if (item.productId === pid && item.sellerId === sid) {
          item.quantity += 1
          total += item.price
        }
      })

      let numberOfTokens = (total * 0.5) / 100
      if (numberOfTokens > 100) numberOfTokens = 100
      return {
        cartItems: items,
        total,
        numberOfTokens,
      }
    })
  },
  decrementQuantity: (pid, sid) => {
    set((state) => {
      const items = state.cartItems
      let total = state.total
      items.forEach((item) => {
        if (
          item.productId === pid &&
          item.sellerId === sid &&
          item.quantity > 1
        ) {
          item.quantity -= 1
          total -= item.price
        }
      })

      let numberOfTokens = (total * 0.5) / 100
      if (numberOfTokens > 100) numberOfTokens = 100
      return {
        cartItems: items,
        total,
        numberOfTokens,
      }
    })
  },
  total: 0,
  numberOfTokens: 0,
}))

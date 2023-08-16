import { create } from "zustand";
import { ICartItem } from "../interfaces/ICartItem";

interface CartState {
  cartItems: ICartItem[];
  addToCart: (cart: ICartItem) => void;
  // how to remove single product from cart
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCart: () => void;
  incrementQuantity: (pid: number, sid: number) => void;
  decrementQuantity: (pid: number, sid: number) => void;
}


export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find(cartItem => cartItem.productId === item.productId);
    if (existingItem) {
      const updatedCartItems = state.cartItems.map(cartItem => {
        if (cartItem.productId === item.productId) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      return { cartItems: updatedCartItems };
    } else {
      return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    }
  }),
  clearCart: () => {
    set({ cartItems: [] });
    console.log('cart cleared ')
  },
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    })),
    getCart: () => {
      
    },
    incrementQuantity(pid, sid) {
      this.cartItems[0].quantity = this.cartItems[0].quantity+1  
    },
    decrementQuantity: (pid,sid) => {

    },
}));

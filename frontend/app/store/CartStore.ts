import { create } from "zustand";
import { ICartItem } from "../interfaces/ICartItem";

interface CartState {
  cartItems: ICartItem[];
  addToCart: (cart: ICartItem) => void;
  // how to remove single product from cart
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCart: () => void;
  incrementQuantity: (item:ICartItem) => void;
  decrementQuantity: (item:ICartItem) => void;
}


export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      );
      if (existingItem) {
        const updatedCartItems = state.cartItems.map((cartItem) => {
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
    console.log("cart cleared ");
  },
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    })),
  getCart: () => {},
  incrementQuantity: (item) =>{
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.sellerId === item.sellerId
          ? { ...cartItem, quantity: item.quantity + 1 }
          : cartItem
      ),
    }))
    console.log('added quantity')
  },
  decrementQuantity: (item) =>
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.sellerId === item.sellerId 
        // && cartItem.quantity > 0
          ? { ...cartItem, quantity: Math.max(cartItem.quantity-1,0) }
          : cartItem
      ),
    })),
}));

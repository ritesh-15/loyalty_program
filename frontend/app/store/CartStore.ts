import { create } from "zustand";
import { ICartItem } from "../interfaces/ICartItem";

interface CartState {
  cartItems: ICartItem[];
  addToCart: (cart: ICartItem) => void;
  // how to remove single product from cart
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const item:ICartItem = {
  userId: 4,
  userWalletAddress: "temp",
  sellerId: 23,
  sellerWalletAddress: "temp",
  brandId: 6,
  brandWalletAddress: "temp",
  name: "Blue Shirt",
  productId: 23,
  price: 700,
  images: [
    "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1691753994/l-st23-vebnor-original-imagmg5bfdncunyb_qjadi9.jpg",
    "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1691753994/l-st23-vebnor-original-imagmg5bvqfwqpa7_xgbdue.jpg",
    "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1691753994/l-st23-vebnor-original-imagmg5bhsfe5hfu_bxstxc.jpg",
    "https://res.cloudinary.com/dq4vpg3fh/image/upload/v1691753994/l-st23-vebnor-original-imagmg5b93hn5heu_xru9bz.jpg70",
  ],
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  // addToCart: (item) =>
  //   set((state) => ({ 
  //     cartItems: [...state.cartItems, item] 
  //   })),
  addToCart: (item) => {
    console.log('product added ',item); 
    set((state)=>({
      cartItems: [...state.cartItems,item],
    }))
  },
  clearCart: () => set({ cartItems: [] }),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    })),
}));

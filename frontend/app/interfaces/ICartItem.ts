export interface ICartItem {
  userId: number;
  userWalletAddress: string;
  sellerId: number;
  sellerWalletAddress: string;
  brandId: number;
  brandWalletAddress: string;
  name: string;
  productId: number;
  price: number;
  images?: string[];
  quantity: number;
}

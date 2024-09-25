export interface ICartService {
    addItemToCart(userId: string, productId: string, quantity: number): Promise<Object[] | null>;
    getCart(userId: string): Promise<Object[] | null>;
    removeItemFromCart(userId: string, productId: string): Promise<Object[] | null>;
    clearCart(userId: string): Promise<void>;
  }
  
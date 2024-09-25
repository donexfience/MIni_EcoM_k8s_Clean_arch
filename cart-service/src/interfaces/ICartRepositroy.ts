export interface ICartRepository {
  addItemTocart(Cartdata: any): Promise<Object[] | null>;
  getCartByUserId(userId: string): Promise<Object[] | null>;
  delteFromCart(data: any): Promise<Object[] | null>;
  delteCart(userId: string): Promise<void>;
}

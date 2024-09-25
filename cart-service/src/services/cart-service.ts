import { AppError } from "../_lib/utils/errors/customError";
import { ICartRepository } from "../interfaces/ICartRepositroy";
import { ICartService } from "../interfaces/ICartService";
import {} from "donexfdz";
export class CartService implements ICartService {
  constructor(private repository: ICartRepository) {}
  public async addItemToCart(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<Object[] | null> {
    const cartData = {
      userId,
      items: [{ productId, quantity }],
    };
    return await this.repository.addItemTocart(cartData);
  }
  public async getCart(userId: string): Promise<Object[] | null> {
    try {
      return await this.repository.getCartByUserId(userId);
    } catch (error) {
      throw AppError.notFound("cart not found");
    }
  }
  public async removeItemFromCart(
    userId: string,
    productId: string
  ): Promise<Object[] | null> {
    const data = {
      userId,
      productId,
    };
    return await this.repository.delteFromCart(data);
  }
  public async clearCart(userId: string): Promise<void> {
    try {
      await this.repository.delteCart(userId);
    } catch (error: any) {
      throw AppError.notFound("not found");
    }
  }
}

import { AppError } from "../_lib/utils/errors/customError";
import { ICartRepository } from "../interfaces/ICartRepositroy";
import { cartModel } from "../model/schema/cart";

export class cartRepository implements ICartRepository {
  async getCartByUserId(userId: string): Promise<Object[] | null> {
    try {
      const cart = await cartModel.findOne({ userId: userId }).exec();
      if (!cart) {
        throw AppError.notFound("cart not found for the user");
      }
      return cart.items;
    } catch (error) {
      throw AppError.notFound("user not found");
    }
  }
  async addItemTocart(Cartdata: any): Promise<Object[] | null> {
    const { userId, items } = Cartdata;
    const cart = await cartModel
      .findOneAndUpdate(
        { userId: userId },
        { $push: { items: { $each: items } } },
        { new: true, upsert: true }
      )
      .exec();
    if (!cart) {
      throw AppError.badRequest("not found");
    }
    return cart.items;
  }
  async delteFromCart(data: {
    userId: string;
    productId: string;
  }): Promise<Object[] | null> {
    const { userId, productId } = data;

    try {
      const cart = await cartModel
        .findOneAndUpdate(
          { userId: userId },
          { $pull: { items: { productId: productId } } }
        )
        .exec();

      if (!cart) {
        throw AppError.notFound("Cart not found for the user");
      }

      return cart.items; // Return the updated items in the cart
    } catch (error) {
      throw AppError.internalServer("not deleted the item");
    }
  }
  async delteCart(userId: string): Promise<void> {
    try {
      const result = await cartModel.deleteOne({ userId: userId }).exec();
      if (result.deletedCount === 0) {
        throw AppError.notFound("cart not found");
      }
    } catch (error) {
      throw AppError.internalServer("Error clearing the cart");
    }
  }
}

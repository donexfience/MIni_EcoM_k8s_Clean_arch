import { Request, Response } from "express";
import { CartService } from "../services/cart-service";

export class CartController {
  constructor(private cartService: CartService) {}
  async addItemToCart(req: Request, res: Response): Promise<void> {
    try {
      const { userId, productId, quantity } = req.body;
      const updatedCart = await this.cartService.addItemToCart(
        userId,
        productId,
        quantity
      );
      res.status(200).json(updatedCart);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const cart = await this.cartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async removeItemFromCart(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { productId } = req.body;
      const updatedCart = await this.cartService.removeItemFromCart(
        userId,
        productId
      );
      res.status(200).json(updatedCart);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  async clearCart(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      await this.cartService.clearCart(userId);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

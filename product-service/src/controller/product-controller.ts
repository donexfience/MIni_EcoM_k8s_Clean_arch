import { json, Request, Response } from "express";
import { ProductService } from "../services/productservice";
import { AppError } from "../_lib/utils/errors/customError";

export class ProductController {
  constructor(private cartService: ProductService) {}
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const product = await this.cartService.getProductById(productId);
      res.status(200).json({ success: true, product: product });
    } catch (error: any) {
      throw AppError.badRequest(`${error}`);
    }
  }
  async getAllProduct(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.cartService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      throw AppError.badRequest(`${error}`);
    }
  }
}

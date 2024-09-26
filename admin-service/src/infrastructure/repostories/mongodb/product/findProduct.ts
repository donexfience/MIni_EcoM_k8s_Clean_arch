import { ProductEntity } from "../../../../domain/entities/productEntity";
import { ProductModel } from "../model/product";

export const findProduct = async (
  id: string
): Promise<ProductEntity | null> => {
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error("Product not available");
    }
    return product;
  } catch (error: any) {
    throw new Error("product is not in database");
  }
};

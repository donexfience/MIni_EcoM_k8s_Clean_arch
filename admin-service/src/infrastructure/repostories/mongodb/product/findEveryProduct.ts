import { ProductEntity } from "../../../../domain/entities/productEntity";
import { ProductModel } from "../model/product";

export const FindAllProduct = async (
  pages: 1,
  limit: 1
): Promise<ProductEntity[] | [] | null> => {
  try {
    const page = pages || 1;
    const limits = limit || 10;
    const skip = (page - 1) * limit;
    const products = await ProductModel.find().skip(skip).limit(limit);
    return products;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

import { ProductEntity } from "../../../../domain/entities/productEntity";
import { ProductModel } from "../model/product";

export const createProduct = async (
  data: ProductEntity
): Promise<ProductEntity | null> => {
  try {
    const newProduct = await ProductModel.create(data);
    if (!newProduct) {
      throw new Error("product not created");
    }
    return newProduct as ProductEntity;
  } catch (error: any) {
    throw new Error(`error from create product"${error?.message}`);
  }
};

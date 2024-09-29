import { ProductEntity } from "../../../../domain/entities/productEntity";
import { ProductModel } from "../model/product";

export const updteProduct = async (
  data: ProductEntity,
  id: string
): Promise<ProductEntity> => {
  try {
    console.log(data, "data", id, "id");
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title: data.title,
          stock: data.stock,
          price: data.price,
          description: data.description,
          isBlocked: data.isBlocked,
        },
      },
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("Product update failed");
    }
    return updatedProduct;
  } catch (error: any) {
    throw new Error("product update not completed");
  }
};

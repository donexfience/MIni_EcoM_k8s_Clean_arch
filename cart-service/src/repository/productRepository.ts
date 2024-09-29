import { createProductDTO } from "../DTO/creatProductDTO";
import { IProductRepository } from "../interfaces/IProductRepository";
import { Product } from "../model/productEntity";
import { ProductModel } from "../model/schema/product";

export class ProductRepository implements IProductRepository {
  async updateProduct(id: string, data: createProductDTO): Promise<void> {
    try {
      console.log(data, "data for updation");
      const updateData: Partial<createProductDTO> = {};
      if (data.stock !== undefined) {
        updateData.stock = data.stock;
      }
      if (data.price !== undefined) {
        updateData.price = data.price;
      }
      if (data.description !== undefined) {
        updateData.description = data.description;
      }
      if (data.title !== undefined) {
        updateData.title = data.title;
      }
      if (data.isBlocked !== undefined) {
        updateData.isBlocked = data.isBlocked;
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedProduct) {
        throw new Error("Product not found");
      }

      console.log("Product updated successfully:", updatedProduct);
    } catch (error: any) {
      console.error("Error updating product:", error.message);
      throw new Error("Product not updated: " + error.message);
    }
  }
  async createProduct(
    data: createProductDTO
  ): Promise<createProductDTO | null> {
    console.log("database", data);

    const product = new ProductModel(data);
    console.log("doc", product);

    //  lean() to get a plain JS object instead of a Mongoose document
    let savedProduct = await product
      .save()
      .then(() => product.toObject())
      .catch((err) => {
        console.error("Error saving user:", err);
        throw new Error(err.message);
      });

    if (!savedProduct) {
      throw new Error("User not created");
    }

    return savedProduct as unknown as Product;
  }
  catch(error: any) {
    console.log(error, "Error while creating user");
    return null;
  }
}

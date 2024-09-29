import { AppError } from "../_lib/utils/errors/customError";
import { createProductDTO } from "../DTO/createProductDTO";
import { IProuctRepository } from "../interfaces/IProductRepositroy";
import { IProductSchema, ProductModel } from "../models/schema/product";
import { Product } from "../models/schema/ProductEntity";

export class ProductRepository implements IProuctRepository {
  async getById(productId: string): Promise<IProductSchema | null> {
    try {
      return await ProductModel.findOne({ _id: productId });
    } catch (error: any) {
      throw AppError.badRequest(`${error}`);
    }
  }

  async getAll(): Promise<IProductSchema[]> {
    try {
      return await ProductModel.find({});
    } catch (error: any) {
      throw AppError.badRequest(`${error}`);
    }
  }
  async updateProduct(id: string, data: createProductDTO): Promise<void> {
    try {
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
          runValidators: true, // Validateing against schema before update
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

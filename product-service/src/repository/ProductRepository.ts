import { AppError } from "../_lib/utils/errors/customError";
import { IProuctRepository } from "../interfaces/IProductRepositroy";
import { IProductSchema, ProductModel } from "../models/schema/product";

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

}

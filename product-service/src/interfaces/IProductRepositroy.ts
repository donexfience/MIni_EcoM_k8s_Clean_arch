import { createProductDTO } from "../DTO/createProductDTO";
import { IProductSchema } from "../models/schema/product";

export interface IProuctRepository {
  getById(productId: string): Promise<IProductSchema | null>;
  getAll(): Promise<IProductSchema[]>;
  createProduct(data: createProductDTO): Promise<createProductDTO | null>;
  updateProduct(id: string, data: createProductDTO): Promise<void>;
}

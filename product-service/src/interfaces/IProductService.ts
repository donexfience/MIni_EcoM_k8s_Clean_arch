// src/interfaces/IProductService.ts

import { createProductDTO } from "../DTO/createProductDTO";
import { IProductSchema } from "../models/schema/product";

export interface IProductService {
  getProductById(productId: string): Promise<IProductSchema | null>;
  getAllProducts(): Promise<IProductSchema[]>;
  createProduct(data: createProductDTO): Promise<createProductDTO | null>;
  updateProduct(id: string, data: createProductDTO): Promise<void>;
}

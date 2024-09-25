// src/interfaces/IProductService.ts

import { IProductSchema } from "../models/schema/product";

export interface IProductService {
  getProductById(productId: string): Promise<IProductSchema | null>;
  getAllProducts(): Promise<IProductSchema[]>;
}

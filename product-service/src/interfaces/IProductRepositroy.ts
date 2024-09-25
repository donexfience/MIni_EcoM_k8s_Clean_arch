import { IProductSchema } from "../models/schema/product";

export interface IProuctRepository {
  getById(productId: string): Promise<IProductSchema | null>;
  getAll(): Promise<IProductSchema[]>;
}

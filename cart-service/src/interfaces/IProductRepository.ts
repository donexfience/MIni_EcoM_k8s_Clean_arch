import { createProductDTO } from "../DTO/creatProductDTO";

export interface IProductRepository {
  createProduct(data: createProductDTO): Promise<createProductDTO | null>;
  updateProduct(id: string, data: createProductDTO): Promise<void>;
}

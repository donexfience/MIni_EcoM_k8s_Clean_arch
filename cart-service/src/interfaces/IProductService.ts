import { createProductDTO } from "../DTO/creatProductDTO";

export interface IProductService {
  createProduct(data: createProductDTO): Promise<createProductDTO | null>;
  updateProduct(id: string, data: createProductDTO): Promise<void>;
}

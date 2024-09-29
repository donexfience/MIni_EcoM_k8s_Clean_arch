import { createProductDTO } from "../DTO/createProductDTO";
import { IProuctRepository } from "../interfaces/IProductRepositroy";
import { IProductService } from "../interfaces/IProductService";
import { IProductSchema } from "../models/schema/product";

export class ProductService implements IProductService {
  constructor(private repository: IProuctRepository) {}
  public async getProductById(
    productId: string
  ): Promise<IProductSchema | null> {
    return await this.repository.getById(productId);
  }
  public async getAllProducts(): Promise<IProductSchema[]> {
    return await this.repository.getAll();
  }
  public async createProduct(
    data: createProductDTO
  ): Promise<createProductDTO | null> {
    return await this.repository.createProduct(data);
  }
  public async updateProduct(
    id: string,
    data: createProductDTO
  ): Promise<void> {
    return await this.repository.updateProduct(id, data);
  }
}

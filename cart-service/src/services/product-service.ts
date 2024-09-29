import { createProductDTO } from "../DTO/creatProductDTO";
import { IProductService } from "../interfaces/IProductService";
import { ProductRepository } from "../repository/productRepository";

export class Productservice implements IProductService {
  constructor(private productRepository: ProductRepository) {}
  public async createProduct(
    userEntity: createProductDTO
  ): Promise<createProductDTO | null> {
    try {
      console.log(userEntity, "data at user service method");
      return this.productRepository.createProduct(userEntity);
    } catch (error: any) {
      throw new Error("user  not created in user service");
    }
  }
  public async updateProduct(
    userId: string,
    data: createProductDTO
  ): Promise<void> {
    try {
      return this.productRepository.updateProduct(userId, data);
    } catch (error: any) {
      throw new Error("user not updated in user service");
    }
  }
}

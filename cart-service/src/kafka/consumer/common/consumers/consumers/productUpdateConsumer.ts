import { createProductDTO } from "../../../../../DTO/creatProductDTO";
import { ProductRepository } from "../../../../../repository/productRepository";
import { Productservice } from "../../../../../services/product-service";

export const productUpdateConsumer = async (
  data: createProductDTO,
  id: string
) => {
  try {
    const productRepository = new ProductRepository();
    const userService = new Productservice(productRepository);
    console.log("datadd", data);
    const newUesr = await userService.updateProduct(id, data);
  } catch (error) {
    console.log(error);
  }
};

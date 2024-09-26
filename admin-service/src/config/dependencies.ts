import { userUseCase, productUseCase } from "../application/usecase";
import {
  productRepository,
  userRepository,
} from "../infrastructure/repostories/mongodb";
export  default { userUseCase, productUseCase, productRepository, userRepository };

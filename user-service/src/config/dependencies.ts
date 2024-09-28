import { addressUsecases, userUsecases } from "../application/usecase";
import {
  addressRepository,
  userRepository,
} from "../infrastructure/repositories/mongodb/repositories";
console.log(addressUsecases, "address");
export { addressRepository, addressUsecases, userRepository, userUsecases };

import { AppError } from "../../_lib/utils/errors/customError";
import { User } from "../../domain/entities/User/userEntitiy";
import { AuthRepository } from "../interface/repositories/IAuth";
import { ICreateUserCase } from "./../../domain/useCases/ICreateUseCase";

export class SignupUseCase implements ICreateUserCase {
  constructor(private authRepository: AuthRepository) {}
  async execute(userData: User): Promise<User | null> {
    const createdUser = await this.authRepository.create(userData);
    console.log(createdUser,"auth repos");
    if (!createdUser) {
      throw AppError.badRequest("user creation failed");
    }
    return createdUser;
  }
}

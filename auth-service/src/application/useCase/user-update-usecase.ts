import { AppError } from "../../_lib/utils/errors/customError";
import { User } from "../../domain/entities/User/userEntitiy";
import { IUpdateUserCase } from "../../domain/useCases/IUpdatUsecase";
import { AuthRepository } from "../interface/repositories/IAuth";

export class UserUpdatUsecase implements IUpdateUserCase {
  constructor(private authRepository: AuthRepository) {}
  public async execute(
    userId: string,
    data: Partial<User>
  ): Promise<User | null> {
    try {
      const user = await this.authRepository.updateUser(userId, data);
      if (!user) {
        throw AppError.badRequest("user doenst exist");
      }
      return user;
    } catch (error: any) {
      throw AppError.badRequest("user doenst exist");
    }
  }
}

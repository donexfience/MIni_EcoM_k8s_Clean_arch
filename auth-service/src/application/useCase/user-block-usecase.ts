import { AppError } from "../../_lib/utils/errors/customError";
import { IUserBlockUserCase } from "../../domain/useCases/IBlockUsecase";
import { IFindUserById } from "../../domain/useCases/IFindUserByid";
import { AuthRepository } from "../interface/repositories/IAuth";

export class UserBlockUseCase implements IUserBlockUserCase {
  constructor(private authRepository: AuthRepository) {}
  public async execute(userId: string, isBlocked: boolean): Promise<void> {
    try {
      const user = await this.authRepository.blockUser(userId, isBlocked);
      if (!user) {
        throw AppError.badRequest("user doenst exist");
      }
    } catch (error: any) {
      throw AppError.badRequest("user not blocked");
    }
  }
}

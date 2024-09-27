import { AppError } from "../../_lib/utils/errors/customError";
import { IUserUnBlockUserCase } from "../../domain/useCases/IUnblockUsecase";
import { AuthRepository } from "../interface/repositories/IAuth";

export class UserUnBlockUseCase implements IUserUnBlockUserCase {
  constructor(private authRepository: AuthRepository) {}
  public async execute(userId: string, isBlocked: boolean): Promise<void> {
    try {
      const user = await this.authRepository.UnblockUser(userId, isBlocked);
      if (!user) {
        throw AppError.badRequest("user doenst exist");
      }
    } catch (error: any) {
      throw AppError.badRequest("user not blocked");
    }
  }
}

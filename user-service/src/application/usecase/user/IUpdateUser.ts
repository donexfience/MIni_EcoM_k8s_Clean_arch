import { inject, injectable } from "inversify";
import { IUpdateUserUsecase } from "../../../domain/useCase/user/updateUserusecase";
import { IUserRepository } from "../../interface/IUser";
import { User } from "../../../domain/entities/user/userEntity";
@injectable()
export class UpdateUserCases implements IUpdateUserUsecase {
  private userRepository: IUserRepository;

  constructor(
    @inject("IuserRepository")
    userRepository: IUserRepository
  ) {
    this.userRepository = userRepository;
  }
  async execute(userId: string, userData: Partial<User>): Promise<void> {
    return await this.userRepository.updateUser(userData, userId);
  }
}

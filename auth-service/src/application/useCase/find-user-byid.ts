import { User } from "../../domain/entities/User/userEntitiy";
import { IFindUserById } from "../../domain/useCases/IFindUserByid";
import { AuthRepository } from "../interface/repositories/IAuth";

export class FindUserByID implements IFindUserById {
  constructor(private authRepository: AuthRepository) {}
  public async execute(userId: string): Promise<User | null> {
    const user = await this.authRepository.findUserById(userId);
    return user;
  }
}

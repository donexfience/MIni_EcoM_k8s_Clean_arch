import { User } from "../../domain/entities/User/userEntitiy";
import { IFindUserByEmail } from "../../domain/useCases/IFindUserByEmailCase";
import { AuthRepository } from "../interface/repositories/IAuth";

export class FindUserByEmail implements IFindUserByEmail {
  constructor(private authRepository: AuthRepository) {}
  public async execute(email: string): Promise<User | null> {
    const user = await this.authRepository.findByEmail(email);
    return user;
  }
}

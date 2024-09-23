import { UserFindByEmailRepository } from "./repositories/userFindByemail";
import { AuthRepository } from "../../../application/interface/repositories/IAuth";
import { UserCreationRepository } from "./repositories/userCreate";
import { User } from "../../../domain/entities/User/userEntitiy";

export class MongoAuthRepository extends AuthRepository {
  private userCreationRepo = new UserCreationRepository();
  private UserFindByEmailRepository = new UserFindByEmailRepository();
  public async create(userEntity: User): Promise<User | null> {
    return this.userCreationRepo.create(userEntity);
  }
  public async findByEmail(email: string): Promise<User | null> {
    return this.UserFindByEmailRepository.findByEmail(email);
  }
}

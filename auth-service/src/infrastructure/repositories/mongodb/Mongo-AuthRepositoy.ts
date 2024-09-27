import { unblockUser } from "./../../../../../admin-service/src/infrastructure/repostories/mongodb/user/userUnblock";
import { UserUnBlockRepository } from "./repositories/userUnBlockRepostiroy";
import { UserBlockRepository } from "./repositories/userBlock";
import { UserFindByIdRepository } from "./repositories/userFindById";
import { UserFindByEmailRepository } from "./repositories/userFindByemail";
import { AuthRepository } from "../../../application/interface/repositories/IAuth";
import { UserCreationRepository } from "./repositories/userCreate";
import { User } from "../../../domain/entities/User/userEntitiy";
import { UserUdpateRepository } from "./repositories/userUpdates";

export class MongoAuthRepository extends AuthRepository {
  private userCreationRepo = new UserCreationRepository();
  private UserFindByEmailRepository = new UserFindByEmailRepository();
  private UserFindByIdRepository = new UserFindByIdRepository();
  private UserBlockRepository = new UserBlockRepository();
  private UserUnBlockRepository = new UserUnBlockRepository();
  private UserUpdateRepository = new UserUdpateRepository();
  public async create(userEntity: User): Promise<User | null> {
    return this.userCreationRepo.create(userEntity);
  }
  public async findByEmail(email: string): Promise<User | null> {
    return this.UserFindByEmailRepository.findByEmail(email);
  }
  public async findUserById(userId: string): Promise<User | null> {
    return this.UserFindByIdRepository.findById(userId);
  }
  public async blockUser(userId: string, data: boolean): Promise<User | null> {
    return this.UserBlockRepository.blockUser(userId, data);
  }
  public async UnblockUser(
    userId: string,
    data: boolean
  ): Promise<User | null> {
    return this.UserUnBlockRepository.UnblockUser(userId, data);
  }
  public async updateUser(userId: string, data: User): Promise<User | null> {
    return this.UserUpdateRepository.UpdateUser(userId, data);
  }
}

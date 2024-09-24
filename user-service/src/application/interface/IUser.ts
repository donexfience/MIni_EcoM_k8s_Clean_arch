import { User } from "../../domain/entities/user/userEntity";

export interface IUserRepository {
  updateUser(userData: Partial<User>, userId: string): Promise<void>;

}

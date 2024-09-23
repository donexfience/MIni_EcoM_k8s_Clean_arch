import { User } from "../../domain/entities/userEntity";

export interface IUserRepository {
  updateUser(userData: Partial<User>, userId: string): Promise<void>;
}

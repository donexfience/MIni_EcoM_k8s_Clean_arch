import { User } from "../../../domain/entities/User/userEntitiy";

export interface IUserRepository {
  create(user: User): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
}

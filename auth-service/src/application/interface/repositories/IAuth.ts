import { User } from "../../../domain/entities/User/userEntitiy";

export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(userEntity: User): Promise<User | null>;
  abstract findUserById(userId: string): Promise<User | null>;
  abstract blockUser(userId: string, data: boolean): Promise<User | null>;
  abstract UnblockUser(userId: string, data: boolean): Promise<User | null>;
  abstract updateUser(
    userId: string,
    data: Partial<User>
  ): Promise<User | null>;
}

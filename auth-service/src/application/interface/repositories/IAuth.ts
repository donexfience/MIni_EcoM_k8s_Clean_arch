import { User } from "../../../domain/entities/User/userEntitiy";

export abstract class AuthRepository {
    abstract findByEmail(email: string): Promise<User | null>;
    abstract create(userEntity: User): Promise<User | null>;
  }
import { CreateUserDTO } from "../DTO/createUserDTO";
import { User } from "../model/userEntity";

export interface IUserService {
  create(userEntity: CreateUserDTO): Promise<User | null>;
  userBlock(userId: string): Promise<void>;
  userUnBlock(userId: string): Promise<void>;
  userUpdate(userId: string, data: CreateUserDTO): Promise<User | null>;
}

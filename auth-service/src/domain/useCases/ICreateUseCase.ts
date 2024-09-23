import { User } from "../entities/User/userEntitiy";

export interface ICreateUserCase {
  execute(userData: User): Promise<User | null>;
}

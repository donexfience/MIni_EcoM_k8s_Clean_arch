import { User } from "../userEntitiy";

export interface ICreateUserCase {
  execute(userData: User): Promise<User | null>;
}

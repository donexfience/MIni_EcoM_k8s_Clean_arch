import { User } from "../entities/User/userEntitiy";

export interface IFindUserByEmail {
  execute(email: string): Promise<User | null>;
}

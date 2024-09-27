import { User } from "../entities/User/userEntitiy";

export interface IFindUserById {
  execute(userId: string): Promise<User | null>;
}

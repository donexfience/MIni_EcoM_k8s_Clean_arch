import { User } from "../entities/User/userEntitiy";

export interface IUpdateUserCase {
  execute(userId: string, data: User): Promise<User | null>;
}

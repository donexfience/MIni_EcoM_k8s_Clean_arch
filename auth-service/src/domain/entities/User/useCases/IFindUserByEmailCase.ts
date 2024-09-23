import { User } from "../userEntitiy";

export interface IFindUserByEmail {
  execute(email: string): Promise<User | null>;
}

import { User } from "../entities/userEntity";

export interface IUpdateUserUsecase {
  execute(userId: string, userData: Partial<User>): Promise<void>;
}

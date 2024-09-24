import { User } from "../../entities/user/userEntity";

export interface IUpdateUserUsecase {
  execute(userId: string, userData: Partial<User>): Promise<void>;
}

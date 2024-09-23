import { User } from "../entities/User/userEntitiy";


export interface ILoginUseCase {
  execute(email: string, password: string): Promise<{ user: User; token: string }>; // Update return type
}

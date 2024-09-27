import { User } from "../../../../domain/entities/User/userEntitiy";
import userModel from "../models/User";

export class UserFindByIdRepository {
  private toEntity(user: any): User {
    return User.fromJson({
      _id: user._id,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      role: user.role,
    });
  }

  public async findById(userId: string): Promise<User | null> {
    const user = await userModel.findById(userId);
    return user ? this.toEntity(user) : null;
  }
}

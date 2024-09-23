import { User } from "../../../../domain/entities/User/userEntitiy";
import userModel from "../models/User";

export class UserCreationRepository {
  private toEntity(user: any): User {
    return User.fromJson({
      _id: user._id,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      role: user.role,
    });
  }

  public async create(userEntity: User): Promise<User | null> {
    const user = new userModel(userEntity);
    await user.save();
    return this.toEntity(user);
  }
}

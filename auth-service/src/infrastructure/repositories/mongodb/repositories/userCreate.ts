import { User } from "../../../../domain/entities/User/userEntitiy";
import userModel from "../models/User";

export class UserCreationRepository {
  private toEntity(user: any): User {
    return User.fromJson({
      _id: user._id,
      name:user.name,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      role: user.role,
    });
  }

  public async create(userEntity: User): Promise<User | null> {
    const user = new userModel(userEntity);
    const data = await user.save().then((data) => console.log("ddddddddddddddddddddddddddddddddd", data)).catch((el) => console.error(el))
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", user,)
    return this.toEntity(user);
  }
}

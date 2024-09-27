import { unblockUser } from "./../../../../../../admin-service/src/infrastructure/repostories/mongodb/user/userUnblock";
import { User } from "../../../../domain/entities/User/userEntitiy";
import userModel from "../models/User";

export class UserUdpateRepository {
  private toEntity(user: any): User {
    return User.fromJson({
      _id: user._id,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      role: user.role,
    });
  }
  public async UpdateUser(
    userId: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    const user = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return null;
    }
    return this.toEntity(user);
  }
}

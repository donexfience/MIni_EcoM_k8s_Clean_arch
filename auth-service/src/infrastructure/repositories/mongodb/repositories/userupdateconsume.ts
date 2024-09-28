import { unblockUser } from "./../../../../../../admin-service/src/infrastructure/repostories/mongodb/user/userUnblock";
import { User } from "../../../../domain/entities/User/userEntitiy";
import userModel from "../models/User";

export class UserUdpateConsumeRepository {
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
    console.log(userId, "In repository");
    const user = await userModel.findOneAndUpdate(
      { email: updateData.email },
      updateData,
      {
        new: true,
      }
    );
    if (!user) {
      return null;
    }
    return this.toEntity(user);
  }
}

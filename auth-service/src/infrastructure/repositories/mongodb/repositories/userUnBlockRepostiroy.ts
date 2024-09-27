import { blockUser } from "./../../../../../../admin-service/src/infrastructure/repostories/mongodb/user/userBlock";
import { User } from "../../../../domain/entities/User/userEntitiy";
import userModel from "../models/User";

export class UserUnBlockRepository {
  //convert mongoDb user document to user entity
  private toEntity(user: any): User {
    return User.fromJson({
      _id: user._id,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      role: user.role,
    });
  }
  public async UnblockUser(
    userId: string,
    isBlocked: boolean
  ): Promise<User | null> {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { isBlocked },
      { new: true }
    );
    if (!user) {
      return null;
    }
    return this.toEntity(user);
  }
}

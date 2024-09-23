import { injectable } from "inversify";
import { User } from "../../../../domain/entities/userEntity";
import { IUserRepository } from "../../../../application/interface/IUser";
import userModel from "../model/userModel";

@injectable()
export class UserRepository implements IUserRepository {
  private mapToUserEntity(userDoc: any): User {
    return new User(
      userDoc.name,
      userDoc.email,
      userDoc.password,
      userDoc.isAdmin,
      userDoc.isBlocked,
      userDoc._id
    );
  }
  async updateUser(userData: User, userId: string): Promise<void> {
    const user = await userModel.updateOne({ _id: userId }, { $set: userData });
  }
}

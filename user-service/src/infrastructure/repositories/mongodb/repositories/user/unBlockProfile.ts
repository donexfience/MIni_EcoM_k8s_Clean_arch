import { UserEntity } from "../../../../../domain/entities/user/userEntity";
import userModel from "../../model/userModel";

export const unblockUser = async (_id: string): Promise<UserEntity | null> => {
  try {
    console.log(_id);
    const user = await userModel.findOneAndUpdate(
      { _id: _id },
      { isBlocked: false },
      { new: true }
    );
    console.log(user);
    if (!user) {
      throw new Error("user not crated");
    }
    return user as UserEntity;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

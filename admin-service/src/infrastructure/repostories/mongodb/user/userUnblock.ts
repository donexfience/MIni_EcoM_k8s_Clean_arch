import { UserEntity } from "../../../../domain/entities/userEntity";
import userModel from "../model/user";

export const unblockUser = async (id: string): Promise<UserEntity | null> => {
  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    if (!user) {
      throw new Error("user not crated");
    }
    return user as UserEntity;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

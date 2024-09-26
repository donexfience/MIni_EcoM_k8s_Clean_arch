import { UserEntity } from "../../../../domain/entities/userEntity";
import userModel from "../model/user";

export const findProduct = async (id: string): Promise<UserEntity | null> => {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("user not available");
    }
    return user as UserEntity;
  } catch (error: any) {
    throw new Error("user is not in database");
  }
};

import { UserEntity } from "../../../../domain/entities/userEntity";
import userModel from "../model/user";

export const findUser = async (id: string): Promise<UserEntity | null> => {

  try {
    console.log(id,"id")
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      throw new Error("user not available");
    }
    return user as UserEntity;
  } catch (error: any) {
    throw new Error(error);
  }
};

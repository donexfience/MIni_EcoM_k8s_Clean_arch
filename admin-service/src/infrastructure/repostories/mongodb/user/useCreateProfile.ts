import { UserEntity } from "../../../../domain/entities";
import userModel from "../model/user";

export const createUser = async (
  data: UserEntity
): Promise<UserEntity | null> => {
  try {
    console.log("database", data);
    const newData = {
      _id: data.userId,
      ...data,
    };
    const user = new userModel(newData);
    console.log("doc", user);
    let ps = await user.save().catch((err) => {
      console.error("Error saving user:", err);
      throw new Error(err.message);
    });

    if (!user) {
      throw new Error("user not crated");
    }
    return user as UserEntity;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

import { UserEntity } from "../../../../domain/entities";
import userModel from "../model/user";

export const updateProfile = async (
  email: string,
  data: { name: string; email: string }
): Promise<UserEntity> => {
  console.log(data, "data", data.email);

  const user = await userModel.findOne({ email: data.email });

  if (!user) {
    throw new Error("User not found!");
  }

  console.log(user, "user in update");

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email: data.email },
      {
        name: data.name,
        email: data.email,
      },
      {
        new: true,
      }
    );

    console.log(updatedUser, "update user");

    if (!updatedUser) {
      throw new Error("Profile updation failed!");
    }

    return updatedUser as UserEntity;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

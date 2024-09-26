import { UserEntity } from "../../../../domain/entities/userEntity";
import userModel from "../model/user";

export const FindAllProduct = async (
  pages: 1,
  limit: 1
): Promise<UserEntity[] | [] | null> => {
  try {
    const page = pages || 1;
    const limits = limit || 10;
    const skip = (page - 1) * limit;
    const user = await userModel.find().skip(skip).limit(limits);
    if (!user) {
      throw new Error("users not availble");
    }
    return user as UserEntity[];
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

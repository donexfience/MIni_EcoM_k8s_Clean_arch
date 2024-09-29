import { CreateUserDTO } from "../DTO/createUserDTO";
import { IUserRepository } from "../interfaces/IUserRepository";
import userModel from "../model/schema/user";
import { User } from "../model/userEntity";

export class UserRepository implements IUserRepository {
  async create(userEntity: CreateUserDTO): Promise<User | null> {
    try {
      console.log("database", userEntity);
      const newData = {
        _id: userEntity.userId,
        ...userEntity,
      };

      const user = new userModel(newData);
      console.log("doc", user);

      //  lean() to get a plain JS object instead of a Mongoose document
      let savedUser = await user
        .save()
        .then(() => user.toObject())
        .catch((err) => {
          console.error("Error saving user:", err);
          throw new Error(err.message);
        });

      if (!savedUser) {
        throw new Error("User not created");
      }

      return savedUser as unknown as User;
    } catch (error: any) {
      console.log(error, "Error while creating user");
      return null;
    }
  }

  async userUpdate(userId: string, data: CreateUserDTO): Promise<User | null> {
    try {
      const user = await userModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("user not found");
      }
      const updatedUsers = await userModel.findByIdAndUpdate(
        userId,
        {
          name: data.name,
          email: data.email,
        },
        { new: true }
      );
      if (!updatedUsers) {
        throw new Error("user not updated");
      }

      return updatedUsers as unknown as User;
    } catch (error: any) {
      return null;
    }
  }
  async userBlock(_id: string): Promise<void> {
    console.log(_id, "repos");
    try {
      const user = await userModel.updateOne(
        { _id: _id },
        { isBlocked: true },
        { new: true }
      );
      console.log(user, "user userblock");
      if (!user) {
        throw new Error("user not crated");
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
  async userUnBlock(_id: string): Promise<void> {
    try {
      const user = await userModel.findByIdAndUpdate(
        _id,
        { isBlocked: false },
        { new: true }
      );

      console.log(user, "user userUNNNNblock");

      if (!user) {
        throw new Error("user not crated");
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}

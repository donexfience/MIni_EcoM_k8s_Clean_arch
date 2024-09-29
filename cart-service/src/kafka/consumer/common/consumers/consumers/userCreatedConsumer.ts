import { CreateUserDTO } from "../../../../../DTO/createUserDTO";
import { User } from "../../../../../model/userEntity";
import { UserRepository } from "../../../../../repository/userRepository";
import { Userservice } from "../../../../../services/user-service";

export const userCreateConsumer = async (data: CreateUserDTO) => {
  try {
    const userRepository = new UserRepository();
    const userService = new Userservice(userRepository);
    console.log("datadd", data);
    const newUesr = await userService.create(data);
  } catch (error) {
    console.log(error);
  }
};

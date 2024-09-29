import { CreateUserDTO } from "../../../../../DTO/createUserDTO";
import { UserRepository } from "../../../../../repository/userRepository";
import { Userservice } from "../../../../../services/user-service";

export const userBlockConsumer = async (id: string) => {
  try {
    const userRepository = new UserRepository();
    const userService = new Userservice(userRepository);
    console.log("datadd", id);
    const newUesr = await userService.userBlock(id);
  } catch (error) {
    console.log(error);
  }
};

import { CreateUserDTO } from "../../../../../DTO/createUserDTO";
import { User } from "../../../../../model/userEntity";
import { UserRepository } from "../../../../../repository/userRepository";
import { Userservice } from "../../../../../services/user-service";

export const userupdateConsumer = async (data: CreateUserDTO, id: string) => {
  try {
    const userRepository = new UserRepository();
    const userService = new Userservice(userRepository);
    console.log("datadd", data);
    const newUesr = await userService.userUpdate(id, data);
  } catch (error) {
    console.log(error);
  }
};

import { CreateUserDTO } from "../DTO/createUserDTO";
import { IUserService } from "../interfaces/IUserService";
import { User } from "../model/userEntity";
import { UserRepository } from "../repository/userRepository";

export class Userservice implements IUserService {
  constructor(private userRepository: UserRepository) {}
  public async create(userEntity: CreateUserDTO): Promise<User | null> {
    try {
      console.log(userEntity, "data at user service method");
      return this.userRepository.create(userEntity);
    } catch (error: any) {
      throw new Error("user  not created in user service");
    }
  }
  public async userUpdate(
    userId: string,
    data: CreateUserDTO
  ): Promise<User | null> {
    try {
      return this.userRepository.userUpdate(userId, data);
    } catch (error: any) {
      throw new Error("user not updated in user service");
    }
  }
  public async userBlock(userId: string): Promise<void> {
    try {
      console.log(userId, "in the user serivceWWWWWWWWWW");
      await this.userRepository.userBlock(userId);
    } catch (error) {
      throw new Error("user not blocked in the user service");
    }
  }
  public async userUnBlock(userId: string): Promise<void> {
    console.log(userId, "in the user serivce");

    try {
      return this.userRepository.userUnBlock(userId);
    } catch (error) {
      throw new Error("user not unblcoked in the user service");
    }
  }
}

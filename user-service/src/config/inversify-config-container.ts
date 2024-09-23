import { Container } from "inversify";
import { IUpdateUserUsecase } from "../domain/useCase/updateUserusecase";
import { UpdateUserCases } from "../application/usecase/IUpdateUser";
import { IUserRepository } from "../application/interface/IUser";
import { UserRepository } from "../infrastructure/repositories/mongodb/repositories/MongoUserRepository";
import { UserController } from "../presentation/inversify-express-utils/userController";

const container = new Container();

container.bind<IUpdateUserUsecase>("IupdateUserUseCase").to(UpdateUserCases);
container.bind<IUserRepository>("IuserRepository").to(UserRepository);
container.bind<UserController>(UserController).toSelf();

export { container };

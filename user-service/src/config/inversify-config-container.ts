import { Container } from "inversify";
import { IUpdateUserUsecase } from "../domain/useCase/user/updateUserusecase";
import { UpdateUserCases } from "../application/usecase/user/IUpdateUser";
import { IUserRepository } from "../application/interface/IUser";
import { UserRepository } from "../infrastructure/repositories/mongodb/repositories/user/MongoUserRepository";
import { UserController } from "../presentation/inversify-express-utils/controllers/userController";
import "reflect-metadata";
import "../presentation/inversify-express-utils/controllers/userController";
import "../presentation/inversify-express-utils/controllers/addressController";
import { AddressController } from "../presentation/inversify-express-utils/controllers/addressController";

const container = new Container();

container.bind<IUpdateUserUsecase>("IupdateUserUseCase").to(UpdateUserCases);
container.bind<IUserRepository>("IuserRepository").to(UserRepository);
container.bind<AddressController>(AddressController).toSelf();
container.bind<UserController>(UserController).toSelf();

export { container };

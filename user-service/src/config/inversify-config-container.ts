import { AdressRepository } from './../infrastructure/repositories/mongodb/repositories/address/MongoAdressRepository';
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
import { ICreateAdressuseCase } from "../domain/useCase/adress/createAdress";
import { createAddressCase } from "../application/usecase/address/ICreateAdress";
import { IDeleteAdressUsecase } from "../domain/useCase/adress/DeleteAdress";
import { DeleteAdressUseCase } from "../application/usecase/address/IDeleteAdress";
import { IAdressRepositroy } from "../application/interface/iAdress";

const container = new Container();

container.bind<IUpdateUserUsecase>("IupdateUserUseCase").to(UpdateUserCases);
container.bind<ICreateAdressuseCase>("ICreateAdressuseCase").to(createAddressCase);
container.bind<IDeleteAdressUsecase>("IDeleteAdressUsecase").to(DeleteAdressUseCase)
container.bind<IUserRepository>("IuserRepository").to(UserRepository);
container.bind<IAdressRepositroy>("IAdressRepository").to(AdressRepository)
container.bind<AddressController>(AddressController).toSelf();
container.bind<UserController>(UserController).toSelf();

export { container };

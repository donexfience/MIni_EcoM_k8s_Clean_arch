import * as dependencies from "../../../../config/dependencies";
import { UserEntity } from "../../../../domain/entities";

export const userCreateConsumer = async (data: UserEntity) => {
  const {
    userUseCase: { userCreateUsecase },
  } = dependencies;
  try {
    if (!dependencies) {
      throw new Error("not gettnig dpendennceis");
    }
    console.log("datadd", data);
    const userdata = await userCreateUsecase(dependencies).interactor(data);
    console.log(userdata);
  } catch (error) {}
};

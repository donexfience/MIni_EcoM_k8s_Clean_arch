import { createUser } from "./../../../repositories/mongodb/repositories/user/useCreateProfile";
import * as dependencies from "../../../../config/dependencies";

export const userUnblockConsumer = async (data: {
  isBlocked: boolean;
  id: string;
}) => {
  const {
    userUsecases: { userUnblockusecase },
  } = dependencies;
  try {
    const userdata = await userUnblockusecase(dependencies).interactor(data.id);
    console.log(userdata);
  } catch (error) {}
};

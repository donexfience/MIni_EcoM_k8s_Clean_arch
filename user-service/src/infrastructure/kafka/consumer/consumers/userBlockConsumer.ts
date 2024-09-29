import * as dependencies from "../../../../config/dependencies";

export const userblockConsumer = async (data: {
  isBlocked: boolean;
  id: string;
}) => {
  const {
    userUsecases: { userBlockusecase },
  } = dependencies;
  try {
    const userdata = await userBlockusecase(dependencies).interactor(data.id);
    console.log(userdata);
  } catch (error) {}
};

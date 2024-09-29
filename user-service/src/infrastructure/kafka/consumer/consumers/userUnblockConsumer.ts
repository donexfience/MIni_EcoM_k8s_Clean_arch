import * as dependencies from "../../../../config/dependencies";

export const userUnblockConsumer = async (data: {
  isBlocked: boolean;
  _id: string;
}) => {
  console.log(dependencies.userUsecases);
  const {
    userUsecases: { userUnblockusecase },
  } = dependencies;
  try {
    console.log(data, "consume -usecasae");
    const userdata = await userUnblockusecase(dependencies).interactor(
      data._id
    );
    console.log(userdata);
  } catch (error) {}
};

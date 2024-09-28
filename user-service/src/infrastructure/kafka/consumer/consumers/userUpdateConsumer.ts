import * as dependencies from "../../../../config/dependencies";

export const userUpdateConsumer = async (data: {
  name: string;
  email: string;
  id: string;
}): Promise<void> => {
  const {
    userUsecases: { updateUserusecase },
  } = dependencies;
  try {
    const userdata = await updateUserusecase(dependencies).interactor(
      data.id,
      data
    );
    console.log(userdata);
  } catch (error) {}
};

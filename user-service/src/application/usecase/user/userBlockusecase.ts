export default (dependencie: any) => {
  const {
    userRepositories: { blockUser },
  } = dependencie;

  if (!blockUser) {
    throw new Error("Dependency is required for update profile!");
  }

  const interactor = async (id: string) => {
    return await blockUser(id);
  };
  return { interactor };
};

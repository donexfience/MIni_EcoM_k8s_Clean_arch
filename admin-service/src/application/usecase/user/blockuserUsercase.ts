export default (dependencie: any) => {
  console.log(dependencie, "dpe");
  const {
    userRepository: { blockUser },
  } = dependencie;

  if (!blockUser) {
    throw new Error("Dependency is required for block user!");
  }

  const interactor = async (id: string) => {
    return await blockUser(id);
  };

  return { interactor };
};

export default (dependencies: any) => {
  console.log(dependencies, "finduser");
  const {
    userRepository: { findUser },
  } = dependencies;

  if (!findUser) {
    throw new Error("Dependency is required for find user!");
  }

  const interactor = async (id: string) => {
    console.log(id);
    return await findUser(id);
  };

  return { interactor };
};

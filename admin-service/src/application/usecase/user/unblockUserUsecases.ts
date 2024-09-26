export default (dependencies: any) => {
  const {
    userRepository: { unblockUser },
  } = dependencies;
  if (!unblockUser) {
    throw new Error("Dependency is required");
  }
  const interactor = async (id: string) => {
    return await unblockUser(id);
  };
  return { interactor };
};

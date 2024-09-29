export default (dependencie: any) => {
  const {
    userRepository: { unblockUser },
  } = dependencie;

  if (!unblockUser) {
    throw new Error("Dependency is required for update profile!");
  }

  const interactor = async (id: string) => {
    return await unblockUser(id);
  };
  return { interactor };
};

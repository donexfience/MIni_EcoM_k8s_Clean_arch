export default (dependencie: any) => {
  const {
    addressRepository: { addAddress },
  } = dependencie;

  if (!addAddress) {
    throw new Error("Dependency is required for add address!");
  }

  const interactor = async (id: string, data: any) => {
    return await addAddress(data, id);
  };

  return { interactor };
};

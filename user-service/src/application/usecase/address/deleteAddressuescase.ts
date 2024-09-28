export default (dependencie: any) => {

  const {
      addressRepositories: { deleteAddress }
  } = dependencie;

  if (!deleteAddress) {
      throw new Error('Dependency is required for delete address!');
  }

  const interactor = async (
      addressId: string
  ) => {
      return await deleteAddress(addressId);
  }

  return { interactor }
}
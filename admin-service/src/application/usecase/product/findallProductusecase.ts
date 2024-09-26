export default (dependencies: any) => {
  const {
    productRepository: { findAllProduct },
  } = dependencies;
  if (!findAllProduct) {
    throw new Error("Depedency is required ");
  }
  const interactor = async (page: number, limit: number) => {
    return await findAllProduct(page, limit);
  };
  return interactor;
};

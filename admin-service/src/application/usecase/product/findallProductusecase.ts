export default (dependencies: any) => {
  const {
    productRepository: { FindAllProduct },
  } = dependencies;
  if (!FindAllProduct) {
    throw new Error("Depedency is required ");
  }
  const interactor = async (page: number, limit: number) => {
    return await FindAllProduct(page, limit);
  };
  return interactor;
};

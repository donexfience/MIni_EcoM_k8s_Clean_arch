export default (dependencies: any) => {
    const {
      productRepository: { findProduct },
    } = dependencies;
    if (!findProduct) {
      throw new Error("Depedency is required ");
    }
    const interactor = async (id: string) => {
      return await findProduct(id);
    };
    return interactor;
  };
  
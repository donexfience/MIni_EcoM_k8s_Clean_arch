export default (dependencies: any) => {
  const {
    productRepository: { createProduct },
  } = dependencies;
  if (!createProduct) {
    throw new Error("dependenciese not getting");
  }
  const interactor = async (data: {
    title: string;
    stock: number;
    description: string;
    image: string;
    price: number;
    isBlocked: boolean;
  }) => {
    return await createProduct(data);
  };
  return { interactor };
};

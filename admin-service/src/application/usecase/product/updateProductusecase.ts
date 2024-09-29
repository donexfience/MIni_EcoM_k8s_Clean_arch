export default (dependencie: any) => {
    console.log(dependencie,"udpate prdouct admin uescase")
    const {
        productRepository: { updteProduct }
    } = dependencie;

    if (!updteProduct) {
        throw new Error('Dependency is required for update product!');
    }

    const interactor = async (
        id: string,
        data: {
            title: string;
            stock: number;
            description: string;
            image: string;
            price: number;
            isBlocked: boolean;
        }
    ) => {
        console.log(data,"in the usecase product",id)
        return await updteProduct(data, id);
    }

    return { interactor }
}
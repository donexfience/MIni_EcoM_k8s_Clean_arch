export default (dependencie: any) => {

    const {
        productRepositories: { updteProduct }
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
        return await updteProduct(id, data);
    }

    return { interactor }
}
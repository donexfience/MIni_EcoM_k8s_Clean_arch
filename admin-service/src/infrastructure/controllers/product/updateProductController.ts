import { Request, Response, NextFunction } from "express";

export default (dependencie: any) => {

    const {
        productUsecases: { updateProductUsecase }
    } = dependencie;


    const updateProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const data = req.body;

            if(!data?.image){
                data.image = req?.file?.filename;
            }

            const product = await updateProductUsecase(dependencie).interactor(id,data);

            // //produce-message
            // await productUpdatedProducer(product);

            res.status(200).json({
                success: true,
                data: product,
                message: "product updated!"
            });

        } catch (error: any) {
            next(error);
        }
    }

    return updateProduct;
}
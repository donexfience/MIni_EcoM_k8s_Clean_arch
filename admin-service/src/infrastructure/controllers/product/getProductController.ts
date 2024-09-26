import { Request, Response, NextFunction } from "express";

export default (dependencie: any) => {

    const {
        productUsecases: { findProductByidusercaset }
    } = dependencie;


    const getProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const id = req.params?.id;

            const product = await findProductByidusercaset(dependencie).interactor(id);

            res.status(200).json({
                success: true,
                data: product,
                message: "product data retrieved!"
            });

        } catch (error: any) {
            next(error);
        }
    }

    return getProduct;
}
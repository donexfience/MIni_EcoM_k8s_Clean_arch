import { NextFunction, Request, Response } from "express";
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
export default (dependencies: any) => {
  const {
    ProductUsecase: { createProductUsecase },
  } = dependencies;
  const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const image = req?.file?.filename;
      const data = req.body;
      const product = await createProductUsecase(dependencies).interactor({
        image: image,
        ...data,
      });
      res
        .status(200)
        .json({ success: true, data: product, message: "product created" });
    } catch (error: any) {
      next(error);
    }
  };
  return { createProduct };
};

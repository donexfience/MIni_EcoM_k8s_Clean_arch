import { NextFunction, Request, Response } from "express";
import { sendToaKafkaTopic } from "../../kafka/producer/producer";
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
export default (dependencies: any) => {
  console.log(dependencies, "cratepcontroller");
  const {
    productUseCase: { createProductusecase },
  } = dependencies;
  const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const image = req?.file?.filename;
      const data = req.body;
      const product = await createProductusecase(dependencies).interactor({
        image: image,
        ...data,
      });
      const topics = ["product-created"];
      const key = product._id.toString();
      const message = {
        productId: product._id,
        title: product.title,
        stock: product.stock,
        price: product.prize,
        description: product.description,
      };
      await sendToaKafkaTopic(topics, key, message);
      res
        .status(200)
        .json({ success: true, data: product, message: "product created" });
    } catch (error: any) {
      next(error);
    }
  };
  return createProduct;
};

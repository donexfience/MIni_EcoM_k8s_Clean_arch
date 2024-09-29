import { Request, Response, NextFunction } from "express";
import { sendToaKafkaTopic } from "../../kafka/producer/producer";

export default (dependencie: any) => {
  const {
    productUseCase: { updateProductusecase },
  } = dependencie;

  const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = req.body;
        console.log(req.body,"boyd",id);
        
      if (!data?.image) {
        data.image = req?.file?.filename;
      }

      const product = await updateProductusecase(dependencie).interactor(
        id,
        data
      );
      const topics = ["product-updated"];
      const key = product._id.toString();
      const message = {
        productId: product._id,
        title: product.title,
        stock: product.stock,
        price: product.prize,
        description: product.description,
      };
      // //produce-message
      await sendToaKafkaTopic(topics, key, message);

      res.status(200).json({
        success: true,
        data: product,
        message: "product updated!",
      });
    } catch (error: any) {
      next(error);
    }
  };

  return updateProduct;
};

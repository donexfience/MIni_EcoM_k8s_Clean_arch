import { Request, Response, NextFunction } from "express";

export default (dependencie: any) => {
  console.log(dependencie, "use case got");
  const {
    addressUsecases: { addAddressusecase },
  } = dependencie;

  const addAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userPayload?.userId;
      const data = req.body;

      const result = await addAddressusecase(dependencie).interactor(userId,data);

      res.status(201).json({
        success: true,
        data: result,
        message: "Address created",
      });
    } catch (error: any) {
      next(error);
    }
  };
  return addAddress;
};

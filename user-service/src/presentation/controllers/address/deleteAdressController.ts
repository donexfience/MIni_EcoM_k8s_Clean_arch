import { NextFunction, Request, Response } from "express";

export default (dependencies: any) => {
  console.log(dependencies, "depe");
  const {
    addressUsecases: { deleteAddressUsecase },
  } = dependencies;
  const deleteAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params?.id;

      await deleteAddressUsecase(dependencies).interactor(id);

      res.status(204).json({});
    } catch (error) {}
  };
  return deleteAddress;
};

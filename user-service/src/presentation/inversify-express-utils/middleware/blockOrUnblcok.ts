import { Request, Response, NextFunction } from "express";
import { container } from "../../../config/inversify-config-container"; // Adjust the import path as necessary
import { IUserRepository } from "../../../application/interface/IUser";
import { TYPES } from "../../../config/types";
import userModel from "../../../infrastructure/repositories/mongodb/model/userModel";

export const checkUserBlockStatus = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // const userRepository = container.get<IUserRepository>(TYPES.UserRepository);

    const userId = req.user?.userId;
    //if userrepo have this usecase u can use this
    // const user = await userRepository.findById(userId);
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "User is blocked" });
    }

    next();
  };
};

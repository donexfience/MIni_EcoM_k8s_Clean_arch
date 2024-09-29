import { upload } from "./../../utils/multer/singleFileupload";
import { NextFunction, Router } from "express";
import * as dependencies from "../../config/dependencies";
import {
  productController,
  userController,
} from "../../infrastructure/controllers";
import { requireAdmin, requrieAuth, } from "donexfdz";
import { setCurrentUser } from "../middleware/middleware/setCurrentUser";

const router: Router = Router();

const {
  blockUserController,
  getAllusrController,
  getUserController,
  unblockUserController,
} = userController(dependencies);

router.use((req, res, next: NextFunction) => {
  console.log("roues", req.url, req.method, req.body);
   next()
})

router
  .route("/api/admin/user")
  .get(setCurrentUser, getAllusrController);
router
  .route("/api/admin/users/:id")
  .get(setCurrentUser, getUserController);
router
  .route("/api/admin/users/unblock/:id")

  .put(setCurrentUser,  unblockUserController);

router
  .route("/api/admin/users/block/:id")

  .put(setCurrentUser, blockUserController);

export default router;

import { upload } from "./../../utils/multer/singleFileupload";
import { Router } from "express";
import  dependencies from "../../config/dependencies";
import {
  productController,
  userController,
} from "../../infrastructure/controllers";
import { requireAdmin, requrieAuth, setCurrentUser } from "donexfdz";

const router: Router = Router();

const {
  blockUserController,
  getAllusrController,
  getUserController,
  unblockUserController,
} = userController(dependencies);

router
  .route("/api/admin/user")
  .get(setCurrentUser, requireAdmin, getAllusrController);
router
  .route("api/admin/users/:id")
  .get(setCurrentUser, requireAdmin, getUserController);
router
  .route("/api/admin/users/unblock/:id")

  .put(setCurrentUser, requireAdmin, unblockUserController);

router
  .route("/api/admin/users/block/:id")

  .put(setCurrentUser, requireAdmin, blockUserController);

export default router;

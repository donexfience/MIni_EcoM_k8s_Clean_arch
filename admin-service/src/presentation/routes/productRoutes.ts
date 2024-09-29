import { upload } from "./../../utils/multer/singleFileupload";
import { Router } from "express";
import * as dependencies from "../../config/dependencies";
import { productController } from "../../infrastructure/controllers";
import { setCurrentUser } from "../middleware/middleware/setCurrentUser";
import { requireAdmin } from "../middleware/middleware/requireAdmin";

const router: Router = Router();

const {
  createProductController,
  getAllProductController,
  getProductController,
  updateProductController,
} = productController(dependencies);

router
  .route("/api/admin/products")
  .get(setCurrentUser, requireAdmin, getAllProductController)
  .post(
    setCurrentUser,

    upload.single("image"),
    createProductController
  );
router
  .route("/api/admin/products/:id")
  .get(setCurrentUser,requireAdmin, getProductController)
  .post(setCurrentUser,requireAdmin, upload.single("image"), updateProductController);

export default router;

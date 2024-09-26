import { upload } from "./../../utils/multer/singleFileupload";
import { Router } from "express";
import dependencies from "../../config/dependencies";
import { productController } from "../../infrastructure/controllers";
import { requireAdmin, requrieAuth, setCurrentUser } from "donexfdz";

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
    createProductController,
    setCurrentUser,
    requireAdmin,
    upload.single("file")
  );
router
  .route("/api/admin/products/:id")
  .get(setCurrentUser, requireAdmin, getProductController)
  .put(setCurrentUser, requireAdmin, updateProductController);

export default router;

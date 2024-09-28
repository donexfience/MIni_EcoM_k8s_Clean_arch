
import { Router } from "express";
import * as dependencies from "../../../config/dependencies";
import { addressController, userController } from "../../controllers";
import { isBlockedUser } from "../../middleware/blockOrUnblcok";
import { setCurrentUser } from "../../middleware/setCurrentUser";
import { requrieAuth } from "../../middleware/requireAuth";
const router: Router = Router();
const { addAddressController, deleteAddressController } =
  addressController(dependencies);
router
  .route("/api/user/address/:id")
  .post(setCurrentUser, isBlockedUser, requrieAuth, addAddressController)
  .delete(setCurrentUser, requrieAuth, isBlockedUser, deleteAddressController);

export default router;

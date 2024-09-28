import { Router } from "express";
import { userController } from "../../controllers";
import * as dependencies from "../../../config/dependencies";
import { isBlockedUser } from "../../middleware/blockOrUnblcok";
import { setCurrentUser } from "../../middleware/setCurrentUser";
import { requrieAuth } from "../../middleware/requireAuth";

const router: Router = Router();
const { currentUserController, updateUserController } =
  userController(dependencies);

router
  .route("/api/user")
  .put(setCurrentUser,requrieAuth,isBlockedUser, updateUserController)
  .get(setCurrentUser, requrieAuth, isBlockedUser, currentUserController);
export default router;

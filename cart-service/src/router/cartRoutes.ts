import { Request, Response, Router } from "express";
import { CartController } from "../controller/cart-controller";
import { cartRepository } from "../repository/cartRepository";
import { CartService } from "../services/cart-service";
import { setCurrentUser } from "../middleware/setCurrentUser";
import { requrieAuth } from "../middleware/requireAuth";
import { isBlockedUser } from "../middleware/blockOrUnblcok";

const router = Router();
const cartRepositoroy = new cartRepository();
const cartService = new CartService(cartRepositoroy);
const cartController = new CartController(cartService);

router.post(
  "/cart",
  setCurrentUser,
  requrieAuth,
  isBlockedUser,
  (req: Request, res: Response) => {
    cartController.addItemToCart(req, res);
  }
);
router.get(
  "/cart/:userId",
  setCurrentUser,
  requrieAuth,
  isBlockedUser,
  (req, res) => cartController.getCart(req, res)
);
router.delete(
  "/cart/:userId",
  setCurrentUser,
  isBlockedUser,
  requrieAuth,
  (req, res) => cartController.clearCart(req, res)
);
router.delete(
  "/cart/:userId/item",
  setCurrentUser,
  requrieAuth,
  isBlockedUser,
  (req, res) => cartController.removeItemFromCart(req, res)
);

export default router;

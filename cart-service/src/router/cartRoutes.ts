import { Request, Response, Router } from "express";
import { CartController } from "../controller/cart-controller";
import { cartRepository } from "../repository/cartRepository";
import { CartService } from "../services/cart-service";
import { checkBlockedUser, requrieAuth, setCurrentUser } from "donexfdz";

const router = Router();
const cartRepositoroy = new cartRepository();
const cartService = new CartService(cartRepositoroy);
const cartController = new CartController(cartService);

router.post(
  "/cart",
  setCurrentUser,
  requrieAuth,
  checkBlockedUser,
  (req: Request, res: Response) => {
    cartController.addItemToCart(req, res);
  }
);
router.get("/cart/:userId", (req, res) => cartController.getCart(req, res));
router.delete("/cart/:userId", (req, res) =>
  cartController.clearCart(req, res)
);
router.delete("/cart/:userId/item", (req, res) =>
  cartController.removeItemFromCart(req, res)
);

export default router;

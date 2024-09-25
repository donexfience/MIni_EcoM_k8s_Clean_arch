"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controller/cart-controller");
const cartRepository_1 = require("../repository/cartRepository");
const cart_service_1 = require("../services/cart-service");
const donexfdz_1 = require("donexfdz");
const router = (0, express_1.Router)();
const cartRepositoroy = new cartRepository_1.cartRepository();
const cartService = new cart_service_1.CartService(cartRepositoroy);
const cartController = new cart_controller_1.CartController(cartService);
router.post("/cart", donexfdz_1.setCurrentUser, donexfdz_1.requrieAuth, donexfdz_1.checkBlockedUser, (req, res) => {
    cartController.addItemToCart(req, res);
});
router.get("/cart/:userId", (req, res) => cartController.getCart(req, res));
router.delete("/cart/:userId", (req, res) => cartController.clearCart(req, res));
router.delete("/cart/:userId/item", (req, res) => cartController.removeItemFromCart(req, res));
exports.default = router;

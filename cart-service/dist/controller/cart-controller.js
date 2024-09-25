"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    addItemToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, productId, quantity } = req.body;
                const updatedCart = yield this.cartService.addItemToCart(userId, productId, quantity);
                res.status(200).json(updatedCart);
            }
            catch (error) {
                res.status(error.statusCode || 500).json({ message: error.message });
            }
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const cart = yield this.cartService.getCart(userId);
                res.status(200).json(cart);
            }
            catch (error) {
                res.status(error.statusCode || 500).json({ message: error.message });
            }
        });
    }
    removeItemFromCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { productId } = req.body;
                const updatedCart = yield this.cartService.removeItemFromCart(userId, productId);
                res.status(200).json(updatedCart);
            }
            catch (error) {
                res.status(error.statusCode || 500).json({ message: error.message });
            }
        });
    }
    clearCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                yield this.cartService.clearCart(userId);
                res.status(204).send();
            }
            catch (error) {
                res.status(error.statusCode || 500).json({ message: error.message });
            }
        });
    }
}
exports.CartController = CartController;

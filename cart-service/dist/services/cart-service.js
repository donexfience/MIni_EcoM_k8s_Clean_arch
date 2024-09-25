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
exports.CartService = void 0;
const customError_1 = require("../_lib/utils/errors/customError");
class CartService {
    constructor(repository) {
        this.repository = repository;
    }
    addItemToCart(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartData = {
                userId,
                items: [{ productId, quantity }],
            };
            return yield this.repository.addItemTocart(cartData);
        });
    }
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getCartByUserId(userId);
            }
            catch (error) {
                throw customError_1.AppError.notFound("cart not found");
            }
        });
    }
    removeItemFromCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                userId,
                productId,
            };
            return yield this.repository.delteFromCart(data);
        });
    }
    clearCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.repository.delteCart(userId);
            }
            catch (error) {
                throw customError_1.AppError.notFound("not found");
            }
        });
    }
}
exports.CartService = CartService;

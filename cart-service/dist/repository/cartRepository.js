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
exports.cartRepository = void 0;
const customError_1 = require("../_lib/utils/errors/customError");
const cart_1 = require("../model/schema/cart");
class cartRepository {
    getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_1.cartModel.findOne({ userId: userId }).exec();
                if (!cart) {
                    throw customError_1.AppError.notFound("cart not found for the user");
                }
                return cart.items;
            }
            catch (error) {
                throw customError_1.AppError.notFound("user not found");
            }
        });
    }
    addItemTocart(Cartdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, items } = Cartdata;
            const cart = yield cart_1.cartModel
                .findOneAndUpdate({ userId: userId }, { $push: { items: { $each: items } } }, { new: true, upsert: true })
                .exec();
            if (!cart) {
                throw customError_1.AppError.badRequest("not found");
            }
            return cart.items;
        });
    }
    delteFromCart(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, productId } = data;
            try {
                const cart = yield cart_1.cartModel
                    .findOneAndUpdate({ userId: userId }, { $pull: { items: { productId: productId } } })
                    .exec();
                if (!cart) {
                    throw customError_1.AppError.notFound("Cart not found for the user");
                }
                return cart.items; // Return the updated items in the cart
            }
            catch (error) {
                throw customError_1.AppError.internalServer("not deleted the item");
            }
        });
    }
    delteCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cart_1.cartModel.deleteOne({ userId: userId }).exec();
                if (result.deletedCount === 0) {
                    throw customError_1.AppError.notFound("cart not found");
                }
            }
            catch (error) {
                throw customError_1.AppError.internalServer("Error clearing the cart");
            }
        });
    }
}
exports.cartRepository = cartRepository;

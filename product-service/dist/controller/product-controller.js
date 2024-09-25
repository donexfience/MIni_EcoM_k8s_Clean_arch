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
exports.ProductController = void 0;
const customError_1 = require("../_lib/utils/errors/customError");
class ProductController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const product = yield this.cartService.getProductById(productId);
                res.status(200).json({ success: true, product: product });
            }
            catch (error) {
                throw customError_1.AppError.badRequest(`${error}`);
            }
        });
    }
    getAllProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.cartService.getAllProducts();
                res.status(200).json(products);
            }
            catch (error) {
                throw customError_1.AppError.badRequest(`${error}`);
            }
        });
    }
}
exports.ProductController = ProductController;

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
exports.ProductRepository = void 0;
const customError_1 = require("../_lib/utils/errors/customError");
const product_1 = require("../models/schema/product");
class ProductRepository {
    getById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield product_1.ProductModel.findOne({ _id: productId });
            }
            catch (error) {
                throw customError_1.AppError.badRequest(`${error}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield product_1.ProductModel.find({});
            }
            catch (error) {
                throw customError_1.AppError.badRequest(`${error}`);
            }
        });
    }
}
exports.ProductRepository = ProductRepository;

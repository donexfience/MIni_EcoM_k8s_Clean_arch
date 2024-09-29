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
exports.findProduct = void 0;
const product_1 = require("../model/product");
const findProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.ProductModel.findById(id);
        if (!product) {
            throw new Error("Product not available");
        }
        return product;
    }
    catch (error) {
        throw new Error("product is not in database");
    }
});
exports.findProduct = findProduct;

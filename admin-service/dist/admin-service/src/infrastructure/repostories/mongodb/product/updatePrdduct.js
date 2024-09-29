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
exports.updteProduct = void 0;
const product_1 = require("../model/product");
const updteProduct = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data, "data", id, "id");
        const updatedProduct = yield product_1.ProductModel.findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                stock: data.stock,
                price: data.price,
                description: data.description,
                isBlocked: data.isBlocked,
            },
        }, { new: true });
        if (!updatedProduct) {
            throw new Error("Product update failed");
        }
        return updatedProduct;
    }
    catch (error) {
        throw new Error("product update not completed");
    }
});
exports.updteProduct = updteProduct;

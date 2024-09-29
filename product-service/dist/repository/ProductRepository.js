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
    updateProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateData = {};
                if (data.stock !== undefined) {
                    updateData.stock = data.stock;
                }
                if (data.price !== undefined) {
                    updateData.price = data.price;
                }
                if (data.description !== undefined) {
                    updateData.description = data.description;
                }
                if (data.title !== undefined) {
                    updateData.title = data.title;
                }
                if (data.isBlocked !== undefined) {
                    updateData.isBlocked = data.isBlocked;
                }
                const updatedProduct = yield product_1.ProductModel.findByIdAndUpdate(id, updateData, {
                    new: true,
                    runValidators: true, // Validateing against schema before update
                });
                if (!updatedProduct) {
                    throw new Error("Product not found");
                }
                console.log("Product updated successfully:", updatedProduct);
            }
            catch (error) {
                console.error("Error updating product:", error.message);
                throw new Error("Product not updated: " + error.message);
            }
        });
    }
    createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("database", data);
            const product = new product_1.ProductModel(data);
            console.log("doc", product);
            //  lean() to get a plain JS object instead of a Mongoose document
            let savedProduct = yield product
                .save()
                .then(() => product.toObject())
                .catch((err) => {
                console.error("Error saving user:", err);
                throw new Error(err.message);
            });
            if (!savedProduct) {
                throw new Error("User not created");
            }
            return savedProduct;
        });
    }
    catch(error) {
        console.log(error, "Error while creating user");
        return null;
    }
}
exports.ProductRepository = ProductRepository;

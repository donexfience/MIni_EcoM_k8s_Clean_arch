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
const producer_1 = require("../../kafka/producer/producer");
exports.default = (dependencie) => {
    const { productUseCase: { updateProductusecase }, } = dependencie;
    const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const id = req.params.id;
            const data = req.body;
            console.log(req.body, "boyd", id);
            if (!(data === null || data === void 0 ? void 0 : data.image)) {
                data.image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
            }
            const product = yield updateProductusecase(dependencie).interactor(id, data);
            const topics = ["product-updated"];
            const key = product._id.toString();
            const message = {
                productId: product._id,
                title: product.title,
                stock: product.stock,
                price: product.prize,
                description: product.description,
            };
            // //produce-message
            yield (0, producer_1.sendToaKafkaTopic)(topics, key, message);
            res.status(200).json({
                success: true,
                data: product,
                message: "product updated!",
            });
        }
        catch (error) {
            next(error);
        }
    });
    return updateProduct;
};

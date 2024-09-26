"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = exports.userController = void 0;
const user_1 = __importDefault(require("./user"));
exports.userController = user_1.default;
const product_1 = __importDefault(require("./product"));
exports.productController = product_1.default;

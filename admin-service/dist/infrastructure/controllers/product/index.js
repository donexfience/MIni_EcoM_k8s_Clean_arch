"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createProductController_1 = __importDefault(require("./createProductController"));
const getAllProductController_1 = __importDefault(require("./getAllProductController"));
const getProductController_1 = __importDefault(require("./getProductController"));
const updateProductController_1 = __importDefault(require("./updateProductController"));
exports.default = (dependencie) => {
    return {
        createProductController: (0, createProductController_1.default)(dependencie),
        updateProductController: (0, updateProductController_1.default)(dependencie),
        getAllProductController: (0, getAllProductController_1.default)(dependencie),
        getProductController: (0, getProductController_1.default)(dependencie)
    };
};

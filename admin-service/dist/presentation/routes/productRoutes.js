"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleFileupload_1 = require("./../../utils/multer/singleFileupload");
const express_1 = require("express");
const dependencies_1 = __importDefault(require("../../config/dependencies"));
const controllers_1 = require("../../infrastructure/controllers");
const donexfdz_1 = require("donexfdz");
const router = (0, express_1.Router)();
const { createProductController, getAllProductController, getProductController, updateProductController, } = (0, controllers_1.productController)(dependencies_1.default);
router
    .route("/api/admin/products")
    .get(donexfdz_1.setCurrentUser, donexfdz_1.requireAdmin, getAllProductController)
    .post(createProductController, donexfdz_1.setCurrentUser, donexfdz_1.requireAdmin, singleFileupload_1.upload.single("file"));
router
    .route("/api/admin/products/:id")
    .get(donexfdz_1.setCurrentUser, donexfdz_1.requireAdmin, getProductController)
    .put(donexfdz_1.setCurrentUser, donexfdz_1.requireAdmin, updateProductController);
exports.default = router;

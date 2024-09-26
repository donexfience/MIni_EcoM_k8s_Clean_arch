"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dependencies_1 = __importDefault(require("../../config/dependencies"));
const controllers_1 = require("../../infrastructure/controllers");
const donexfdz_1 = require("donexfdz");
const router = (0, express_1.Router)();
const { blockUserController, getAllusrController, getUserController, unblockUserController, } = (0, controllers_1.userController)(dependencies_1.default);
router
    .route("/api/admin/user")
    .get(donexfdz_1.setCurrentUser, donexfdz_1.requireAdmin, getAllusrController);
router
    .route("api/admin/users/:id")
    .get(donexfdz_1.setCurrentUser, donexfdz_1.requireAdmin, getUserController);
router
    .route("/api/admin/users/unblock/:id")
    .put(donexfdz_1.setCurrentUser, donexfdz_1.requireAdmin, unblockUserController);
router
    .route("/api/admin/users/block/:id")
    .put(donexfdz_1.setCurrentUser, donexfdz_1.requireAdmin, blockUserController);
exports.default = router;

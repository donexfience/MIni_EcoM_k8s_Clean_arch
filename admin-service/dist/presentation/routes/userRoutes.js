"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dependencies = __importStar(require("../../config/dependencies"));
const controllers_1 = require("../../infrastructure/controllers");
const setCurrentUser_1 = require("../middleware/middleware/setCurrentUser");
const router = (0, express_1.Router)();
const { blockUserController, getAllusrController, getUserController, unblockUserController, } = (0, controllers_1.userController)(dependencies);
router.use((req, res, next) => {
    console.log("roues", req.url, req.method, req.body);
    next();
});
router
    .route("/user")
    .get(setCurrentUser_1.setCurrentUser, getAllusrController);
router
    .route("/users/:id")
    .get(setCurrentUser_1.setCurrentUser, getUserController);
router
    .route("/users/unblock/:id")
    .put(setCurrentUser_1.setCurrentUser, unblockUserController);
router
    .route("/users/block/:id")
    .put(setCurrentUser_1.setCurrentUser, blockUserController);
exports.default = router;

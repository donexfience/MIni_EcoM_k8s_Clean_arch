"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getaAllusercontroller_1 = __importDefault(require("./getaAllusercontroller"));
const getUserController_1 = __importDefault(require("./getUserController"));
const unblockUserController_1 = __importDefault(require("./unblockUserController"));
const blockUserController_1 = __importDefault(require("./blockUserController"));
exports.default = (dependencie) => {
    return {
        getAllusrController: (0, getaAllusercontroller_1.default)(dependencie),
        getUserController: (0, getUserController_1.default)(dependencie),
        unblockUserController: (0, unblockUserController_1.default)(dependencie),
        blockUserController: (0, blockUserController_1.default)(dependencie),
    };
};

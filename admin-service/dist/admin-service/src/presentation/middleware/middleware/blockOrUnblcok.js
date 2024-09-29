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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlockedUser = void 0;
const user_1 = __importDefault(require("../../../infrastructure/repostories/mongodb/model/user"));
const isBlockedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if ((_a = req.userPayload) === null || _a === void 0 ? void 0 : _a.isBlocked) {
            throw new Error("You are blocked from the site!");
        }
        const user = yield user_1.default.findOne({ email: (_b = req.userPayload) === null || _b === void 0 ? void 0 : _b.email });
        if (user === null || user === void 0 ? void 0 : user.isBlocked) {
            throw new Error("You are blocked from the site!");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.isBlockedUser = isBlockedUser;

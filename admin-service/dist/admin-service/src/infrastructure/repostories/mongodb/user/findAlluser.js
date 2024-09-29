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
exports.FindAllUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const FindAllUser = (pages, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = pages || 1;
        const limits = limit || 10;
        const skip = (page - 1) * limit;
        const user = yield user_1.default.find().skip(skip).limit(limits);
        if (!user) {
            throw new Error("users not availble");
        }
        return user;
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.FindAllUser = FindAllUser;

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
exports.updateProfile = void 0;
const user_1 = __importDefault(require("../model/user"));
const updateProfile = (email, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data, "data", data.email);
    const user = yield user_1.default.findOne({ email: data.email });
    if (!user) {
        throw new Error("User not found!");
    }
    console.log(user, "user in update");
    try {
        const updatedUser = yield user_1.default.findOneAndUpdate({ email: data.email }, {
            name: data.name,
            email: data.email,
        }, {
            new: true,
        });
        console.log(updatedUser, "update user");
        if (!updatedUser) {
            throw new Error("Profile updation failed!");
        }
        return updatedUser;
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.updateProfile = updateProfile;

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
exports.createUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("database", data);
        const newData = Object.assign({ _id: data.userId }, data);
        const user = new user_1.default(newData);
        console.log("doc", user);
        let ps = yield user.save().catch((err) => {
            console.error("Error saving user:", err);
            throw new Error(err.message);
        });
        if (!user) {
            throw new Error("user not crated");
        }
        return user;
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createUser = createUser;

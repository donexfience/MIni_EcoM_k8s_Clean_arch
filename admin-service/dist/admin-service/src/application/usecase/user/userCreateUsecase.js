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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencie) => {
    console.log("user-created ", dependencie.userRepository);
    const { userRepository: { createUser }, } = dependencie;
    if (!createUser) {
        throw new Error("Dependency is required for update profile!");
    }
    console.log("user create rep", createUser);
    const interactor = (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("calling", data, createUser);
        return yield createUser(data);
    });
    return { interactor };
};

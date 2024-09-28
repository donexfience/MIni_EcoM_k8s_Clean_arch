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
exports.Userservice = void 0;
class Userservice {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(userEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(userEntity, "data at user service method");
                return this.userRepository.create(userEntity);
            }
            catch (error) {
                throw new Error("user  not created in user service");
            }
        });
    }
    userUpdate(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.userRepository.userUpdate(userId, data);
            }
            catch (error) {
                throw new Error("user not updated in user service");
            }
        });
    }
    userBlock(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.userRepository.userBlock(userId);
            }
            catch (error) {
                throw new Error("user not blocked in the user service");
            }
        });
    }
    userUnBlock(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.userRepository.userUnBlock(userId);
            }
            catch (error) {
                throw new Error("user not unblcoked in the user service");
            }
        });
    }
}
exports.Userservice = Userservice;

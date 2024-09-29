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
exports.UserRepository = void 0;
const user_1 = __importDefault(require("../model/schema/user"));
class UserRepository {
    create(userEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("database", userEntity);
                const newData = Object.assign({ _id: userEntity.userId }, userEntity);
                const user = new user_1.default(newData);
                console.log("doc", user);
                //  lean() to get a plain JS object instead of a Mongoose document
                let savedUser = yield user
                    .save()
                    .then(() => user.toObject())
                    .catch((err) => {
                    console.error("Error saving user:", err);
                    throw new Error(err.message);
                });
                if (!savedUser) {
                    throw new Error("User not created");
                }
                return savedUser;
            }
            catch (error) {
                console.log(error, "Error while creating user");
                return null;
            }
        });
    }
    userUpdate(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error("user not found");
                }
                const updatedUsers = yield user_1.default.findByIdAndUpdate(userId, {
                    name: data.name,
                    email: data.email,
                }, { new: true });
                if (!updatedUsers) {
                    throw new Error("user not updated");
                }
                return updatedUsers;
            }
            catch (error) {
                return null;
            }
        });
    }
    userBlock(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(_id, "repos");
            try {
                const user = yield user_1.default.updateOne({ _id: _id }, { isBlocked: true }, { new: true });
                console.log(user, "user userblock");
                if (!user) {
                    throw new Error("user not crated");
                }
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    userUnBlock(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findByIdAndUpdate(_id, { isBlocked: false }, { new: true });
                console.log(user, "user userUNNNNblock");
                if (!user) {
                    throw new Error("user not crated");
                }
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
}
exports.UserRepository = UserRepository;

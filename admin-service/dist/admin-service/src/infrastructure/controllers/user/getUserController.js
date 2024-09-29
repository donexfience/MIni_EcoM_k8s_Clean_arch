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
    console.log(dependencie.userUseCase, "user");
    const { userUseCase: { findUserUsecase }, } = dependencie;
    const getAlluser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            console.log("callllllllllllllllll");
            console.log(req.params);
            const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
            console.log(id, "id in the controller");
            const user = yield findUserUsecase(dependencie).interactor(id);
            console.log(user, "user");
            res
                .status(200)
                .json({ success: true, data: user, message: "user listed" });
        }
        catch (error) {
            console.log(error);
        }
    });
    return getAlluser;
};

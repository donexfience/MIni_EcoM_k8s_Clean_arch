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
    console.log(dependencie, "dpe");
    const { userUseCase: { finAllUsersUsecase }, } = dependencie;
    const getAlluser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const page = (_a = req.query) === null || _a === void 0 ? void 0 : _a.page;
            const limit = (_b = req.query) === null || _b === void 0 ? void 0 : _b.limit;
            const user = yield finAllUsersUsecase(dependencie).interactor(page, limit);
            res
                .status(200)
                .json({ success: true, data: user, message: "user listed" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
    return getAlluser;
};

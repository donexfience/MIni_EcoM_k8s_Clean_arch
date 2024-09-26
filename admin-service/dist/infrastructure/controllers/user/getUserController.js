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
    const { userUseCase: { findUserCase }, } = dependencie;
    const getAlluser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a._id;
            const user = yield findUserCase(dependencie).interactor(id);
            res
                .status(200)
                .json({ success: true, data: user, message: "user listed" });
        }
        catch (error) { }
    });
    return getAlluser;
};

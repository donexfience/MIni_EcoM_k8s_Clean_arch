"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requrieAuth = void 0;
const requrieAuth = (req, res, next) => {
    if (!req.userPayload) {
        throw new Error("not authorized");
    }
    next();
};
exports.requrieAuth = requrieAuth;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const requireAdmin = (req, res, next) => {
    if (!req.userPayload) {
        throw new Error("user not found");
    }
    if (!req.userPayload.isAdmin) {
        throw new Error("user not admin");
    }
    next();
};
exports.requireAdmin = requireAdmin;

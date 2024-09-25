"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenHandler {
    constructor() {
        this.accessTokenSecret =
            process.env.ACCESS_TOKEN_SECRET || "ysdfsfasfsdafkl;ads3243022342034";
        this.accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "1h";
    }
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessTokenSecret, {
            expiresIn: this.accessTokenExpiry,
        });
    }
    verifyAccessToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.accessTokenSecret);
            return decoded.userId || null;
        }
        catch (error) {
            return null;
        }
    }
}
exports.TokenHandler = TokenHandler;

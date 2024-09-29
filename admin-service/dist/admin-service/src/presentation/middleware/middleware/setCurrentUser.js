"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const setCurrentUser = (req, res, next) => {
    var _a;
    console.log("heelloo form sercurrent user", req.url);
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    const SECRET = process.env.JWT_SECRET || "ysdfsfasfsdafkl;ads3243022342034";
    if (!token) {
        next();
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        console.log(decoded, "user");
        req.userPayload = decoded;
        console.log(req.userPayload, "userpayload");
    }
    catch (error) {
        console.error("Error decoding JWT:", error);
        res.status(401).json({ message: "Invalid token" });
    }
    console.log("heloo form setcurrent user");
    next();
};
exports.setCurrentUser = setCurrentUser;

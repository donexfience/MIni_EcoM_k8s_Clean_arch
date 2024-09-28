"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name, email, password, isAdmin = false, isBlocked = false, _id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isBlocked = isBlocked;
        this._id = _id;
    }
    static fromJson(obj) {
        const { name, email, password, isAdmin, isBlocked, _id } = obj;
        return new User(name, email, password, isAdmin, isBlocked, _id);
    }
}
exports.User = User;

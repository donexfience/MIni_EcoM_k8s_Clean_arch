"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(title, stock, description, image, price, isBlocked, userId, _id) {
        this.title = title;
        this.stock = stock;
        this.description = description;
        this.image = image;
        this.price = price;
        this.isBlocked = isBlocked;
        this.userId = userId;
    }
    static fromJson(obj) {
        const { title, stock, image, price, userId, description, _id, isBlocked } = obj;
        return new Product(title, stock, description, image, price, isBlocked, userId, _id);
    }
}
exports.Product = Product;

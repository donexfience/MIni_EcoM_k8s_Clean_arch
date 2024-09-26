"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usecase_1 = require("../application/usecase");
const mongodb_1 = require("../infrastructure/repostories/mongodb");
exports.default = { userUseCase: usecase_1.userUseCase, productUseCase: usecase_1.productUseCase, productRepository: mongodb_1.productRepository, userRepository: mongodb_1.userRepository };

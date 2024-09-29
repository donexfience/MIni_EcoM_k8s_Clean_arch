"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.productRepository = exports.productUseCase = exports.userUseCase = void 0;
const usecase_1 = require("../application/usecase");
Object.defineProperty(exports, "productUseCase", { enumerable: true, get: function () { return usecase_1.productUseCase; } });
Object.defineProperty(exports, "userUseCase", { enumerable: true, get: function () { return usecase_1.userUseCase; } });
const mongodb_1 = require("../infrastructure/repostories/mongodb");
Object.defineProperty(exports, "productRepository", { enumerable: true, get: function () { return mongodb_1.productRepository; } });
Object.defineProperty(exports, "userRepository", { enumerable: true, get: function () { return mongodb_1.userRepository; } });

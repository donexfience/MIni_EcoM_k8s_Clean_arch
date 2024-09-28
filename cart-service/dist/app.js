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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("./repository/userRepository");
const express_1 = __importDefault(require("express"));
const connection_1 = require("./config/MongoDB/connection");
const donexfdz_1 = require("donexfdz");
const cartRoutes_1 = __importDefault(require("./router/cartRoutes"));
const user_service_1 = require("./services/user-service");
const consumer_manager_1 = require("./kafka/consumer/consumer_manager/consumer_manager");
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initializeMiddleware();
        this.initializeServices();
    }
    initializeMiddleware() {
        this.app.use(donexfdz_1.errorHandler);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use("/api", cartRoutes_1.default);
        // Error Handling Middleware
        // this.app.use(ErrorMiddleware.handleError);
    }
    initializeServices() {
        return __awaiter(this, void 0, void 0, function* () {
            // Database connection
            yield connection_1.Database.connect();
            // Initialize Kafka consumer
            const brokers = ["localhost:9092"];
            const userRepository = new userRepository_1.UserRepository();
            const userService = new user_service_1.Userservice(userRepository);
            this.consumerManager = new consumer_manager_1.ConsumerManager(brokers, userService);
            try {
                yield this.consumerManager.startConsumers();
                console.log("Kafka consumers started successfully.");
            }
            catch (error) {
                console.error("Error starting consumers:", error);
            }
        });
    }
    stopConsumers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumerManager.stopConsumers();
                console.log("Kafka consumers stopped successfully.");
            }
            catch (error) {
                console.error("Error stopping consumers:", error);
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`CART-SERVICE RUNNING ON PORT ${this.port}`);
        });
    }
}
exports.default = App;

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
exports.ConsumerManager = void 0;
const __1 = require("../..");
const consumer_1 = require("../consumer");
class ConsumerManager {
    constructor(brokers, userService) {
        this.kafkaClient = new __1.KafkaClient("PRODUCT_SERVICE_CLIENT", brokers);
        // Initialize Kafka consumers with distinct group IDs
        this.productUpdateConsumer = new consumer_1.KafkaConsumer(brokers, "product-update-group", userService);
        this.productCreateConsumer = new consumer_1.KafkaConsumer(brokers, "product-create-group", userService);
    }
    startConsumers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all([
                    this.productCreateConsumer.connect(),
                    this.productUpdateConsumer.connect(),
                ]);
                yield Promise.all([
                    this.productCreateConsumer.startConsume(["user-updated"]),
                    this.productUpdateConsumer.startConsume(["user-created"]),
                ]);
                console.log("Consumers started successfully.");
            }
            catch (error) {
                console.error("Error starting consumers:", error);
            }
        });
    }
    stopConsumers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all([
                    this.productCreateConsumer.disconnect(),
                    this.productUpdateConsumer.disconnect(),
                ]);
                console.log("Consumers stopped successfully.");
            }
            catch (error) {
                console.error("Error stopping consumers:", error);
            }
        });
    }
}
exports.ConsumerManager = ConsumerManager;

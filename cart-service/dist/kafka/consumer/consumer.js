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
exports.KafkaConsumer = void 0;
const kafkajs_1 = require("kafkajs");
class KafkaConsumer {
    constructor(brokers, groupId, userService) {
        this.userService = userService;
        this.kafka = new kafkajs_1.Kafka({
            clientId: "AUTH_SERVICE_CLIENT",
            brokers,
        });
        this.consumer = this.kafka.consumer({ groupId });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.connect();
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.disconnect();
        });
    }
    startConsume(topics) {
        return __awaiter(this, void 0, void 0, function* () {
            // Subscribe to multiple topics
            yield Promise.all(topics.map((topic) => this.consumer.subscribe({ topic, fromBeginning: false })));
            yield this.consumer.run({
                eachMessage: (payload) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (!payload.message.value) {
                            throw new Error("Message value is empty");
                        }
                        const data = JSON.parse(payload.message.value.toString());
                        console.log("Data received:", data, data.action);
                        if (data.id) {
                            if (data.isBlocked !== undefined) {
                                if (data.isBlocked) {
                                    yield this.userService.userBlock(data.id);
                                }
                                else {
                                    yield this.userService.userUnBlock(data.id);
                                }
                            }
                            else {
                                // User update logic
                                yield this.userService.userUpdate(data.id, data);
                            }
                        }
                        else {
                            yield this.userService.create(data);
                        }
                    }
                    catch (error) {
                        console.error("Error in Kafka consumer:", error);
                    }
                }),
            });
        });
    }
}
exports.KafkaConsumer = KafkaConsumer;

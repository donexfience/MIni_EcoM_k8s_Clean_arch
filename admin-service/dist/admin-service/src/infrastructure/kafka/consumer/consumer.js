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
exports.stopConsumer = exports.startConsumer = void 0;
const kafkaClient_1 = require("../kafkaClient");
const startConsumer = (topics, topicHandlers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield kafkaClient_1.consumer.connect();
        // Subscribe to each specified topic
        for (const topic of topics) {
            yield kafkaClient_1.consumer.subscribe({ topic, fromBeginning: true });
        }
        console.log(`Consumer connected and subscribed to: ${topics.join(", ")}`);
        yield kafkaClient_1.consumer.run({
            eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
                var _b;
                const data = JSON.parse(((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) || "{}");
                if (topicHandlers[topic]) {
                    yield topicHandlers[topic](data); // Call the appropriate handler
                }
                else {
                    console.warn(`No handler found for topic: ${topic}`);
                }
            }),
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.startConsumer = startConsumer;
// Function to stop the consumer
const stopConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield kafkaClient_1.consumer.disconnect();
    console.log("Consumer disconnected");
});
exports.stopConsumer = stopConsumer;

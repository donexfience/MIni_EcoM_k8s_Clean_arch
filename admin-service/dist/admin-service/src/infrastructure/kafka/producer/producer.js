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
exports.sendToaKafkaTopic = void 0;
const kafkaClient_1 = require("../kafkaClient");
const sendToaKafkaTopic = (topics, key, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield kafkaClient_1.producer.connect();
        //making message for the batch
        const topicMessages = topics.map((topic) => ({
            topic,
            messages: [
                {
                    key,
                    value: JSON.stringify(message),
                },
            ],
        }));
        yield kafkaClient_1.producer.sendBatch({ topicMessages });
        console.log("messages send", topics);
    }
    catch (error) {
        console.error("kafka produce error", error.message);
    }
    finally {
        yield kafkaClient_1.producer.disconnect();
    }
});
exports.sendToaKafkaTopic = sendToaKafkaTopic;

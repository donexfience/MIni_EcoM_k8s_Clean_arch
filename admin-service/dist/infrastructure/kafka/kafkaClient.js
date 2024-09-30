"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.producer = exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
exports.kafka = new kafkajs_1.Kafka({
    clientId: "ADMIN_SERVICE_CLIENT",
    brokers: ["localhost:9092"],
});
exports.producer = exports.kafka.producer();
exports.consumer = exports.kafka.consumer({
    groupId: "admin-service-kafka-group",
});

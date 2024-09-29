import { Consumer, Kafka, Producer } from "kafkajs";
export const kafka = new Kafka({
  clientId: "ADMIN_SERVICE_CLIENT",
  brokers: ["localhost:9092"],
});
export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
  groupId: "admin-service-kafka-group",
});

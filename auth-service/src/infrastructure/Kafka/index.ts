import { Kafka, Producer, Consumer } from "kafkajs";

export class KafkaClient {
  private kafka: Kafka;
  public producer: Producer;
  public consumer: Consumer;

  constructor(clientId: string, brokers: string[]) {
    this.kafka = new Kafka({
      clientId,
      brokers,
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({
      groupId: "auth-service-kafka-group",
    });
    
  }
}

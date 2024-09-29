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
      groupId: "cart-service-kafka-group",
    });
  }

  public async connectProducer() {
    await this.producer.connect();
  }

  public async connectConsumer() {
    await this.consumer.connect();
  }

  public async disconnect() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }
}

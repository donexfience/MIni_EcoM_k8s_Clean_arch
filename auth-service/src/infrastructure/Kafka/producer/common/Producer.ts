import { Kafka } from "kafkajs";

export class KafkaProducerService {
  private kafka: Kafka;
  private producer: any;

  constructor() {
    // Splitting list of broker IDs from environment variable or defaulting to localhost
    const brokers = process.env.BROKERS_URLS?.split(",") || ["localhost:9092"];
    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID || "AUTH_SERVICE_CLIENT",
      brokers: brokers,
    });

    this.producer = this.kafka.producer({ allowAutoTopicCreation: true });
  }

  // Connect producer
  public async connectProducer() {
    try {
      await this.producer.connect();
    } catch (error) {
      console.error("Error connecting Kafka producer:", error);
    }
  }

  // Disconnect producer
  public async disconnectProducer() {
    try {
      await this.producer.disconnect();
    } catch (error) {
      console.error("Error disconnecting Kafka producer:", error);
    }
  }

  // Produce a message to a topic
  public async produce(topic: string, message: any): Promise<void> {
    try {
      await this.connectProducer();
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      console.log("succfully produced");
      
      await this.disconnectProducer();
    } catch (error) {
      console.error(`Error sending message to topic ${topic}:`, error);
    }
  }

  // Send multiple messages to a topic
  public async send(
    topic: string,
    messages: { key?: string; value: string }[]
  ): Promise<void> {
    try {
      await this.connectProducer();
      await this.producer.send({
        topic,
        messages,
      });
      await this.disconnectProducer();
    } catch (error) {
      console.error(`Error sending messages to topic ${topic}:`, error);
    }
  }
  //multiple topics can recieve same message using this batch processing and sending
  // Inside KafkaProducerService
  public async sendBatch(
    topicMessages: {
      topic: string;
      messages: { key?: string; value: string }[];
    }[]
  ): Promise<void> {
    try {
      await this.connectProducer();
      await this.producer.sendBatch({
        topicMessages,
      });
      await this.disconnectProducer();
    } catch (error) {
      console.error("Error sending batch messages:", error);
    }
  }
}

import { Kafka, EachMessagePayload } from "kafkajs";
import { ProductService } from "../../services/productservice";

export class KafkaConsumer {
  private kafka: Kafka;
  public consumer: any;

  constructor(
    brokers: string[],
    groupId: string,
    private productService: ProductService
  ) {
    this.kafka = new Kafka({
      clientId: "AUTH_SERVICE_CLIENT",
      brokers,
    });
    this.consumer = this.kafka.consumer({ groupId });
  }

  public async connect() {
    await this.consumer.connect();
  }

  public async disconnect() {
    await this.consumer.disconnect();
  }

  public async startConsume(topics: string[]) {
    // Subscribe to multiple topics
    await Promise.all(
      topics.map((topic) =>
        this.consumer.subscribe({ topic, fromBeginning: false })
      )
    );

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        try {
          if (!payload.message.value) {
            throw new Error("Message value is empty");
          }

          const data = JSON.parse(payload.message.value.toString());
          console.log("Data received:", data, data.action);

          if (data.id) {
            await this.productService.createProduct(data);
          } else {
            await this.productService.updateProduct(data.id, data);
            console.log("Product created:", data);
          }
        } catch (error) {
          console.error("Error in Kafka consumer:", error);
        }
      },
    });
  }
}

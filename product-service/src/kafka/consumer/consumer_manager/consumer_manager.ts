import { KafkaClient } from "../..";
import { ProductService } from "../../../services/productservice";
import { KafkaConsumer } from "../consumer";
export class ConsumerManager {
  private kafkaClient: KafkaClient;
  private productUpdateConsumer: KafkaConsumer;
  private productCreateConsumer: KafkaConsumer;

  constructor(brokers: string[], userService: ProductService) {
    this.kafkaClient = new KafkaClient("PRODUCT_SERVICE_CLIENT", brokers);

    // Initialize Kafka consumers with distinct group IDs
    this.productUpdateConsumer = new KafkaConsumer(
      brokers,
      "product-update-group",
      userService
    );
    this.productCreateConsumer = new KafkaConsumer(
      brokers,
      "product-create-group",
      userService
    );
  }

  public async startConsumers() {
    try {
      await Promise.all([
        this.productCreateConsumer.connect(),
        this.productUpdateConsumer.connect(),
      ]);
      await Promise.all([
        this.productCreateConsumer.startConsume(["user-updated"]),
        this.productUpdateConsumer.startConsume(["user-created"]),
      ]);
      console.log("Consumers started successfully.");
    } catch (error) {
      console.error("Error starting consumers:", error);
    }
  }

  public async stopConsumers() {
    try {
      await Promise.all([
        this.productCreateConsumer.disconnect(),
        this.productUpdateConsumer.disconnect(),
      ]);
      console.log("Consumers stopped successfully.");
    } catch (error) {
      console.error("Error stopping consumers:", error);
    }
  }
}

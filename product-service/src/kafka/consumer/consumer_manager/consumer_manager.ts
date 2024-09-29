import { KafkaClient } from "../..";
import { ProductService } from "../../../services/productservice";
import { KafkaConsumer } from "../consumer";

export class ConsumerManager {
  private kafkaClient: KafkaClient;
  private productCreateConsumer: KafkaConsumer;
  private productUpdateConsumer: KafkaConsumer;

  constructor(
    brokers: string[],
    productService: ProductService
  ) {
    this.kafkaClient = new KafkaClient("CART_SERVICE_CLIENT", brokers);

    // Initialize Kafka consumers with distinct group IDs
    this.productCreateConsumer = new KafkaConsumer(
      brokers,
      "product-create-group",
      productService
    );
    this.productUpdateConsumer = new KafkaConsumer(
      brokers,
      "product-update-group",
      productService
    );
  }

  public async startConsumers() {
    try {
      await Promise.all([
        this.productCreateConsumer.connect(),
        this.productUpdateConsumer.connect(),
      ]);
      await Promise.all([
        this.productCreateConsumer.startConsume(["product-created"]),
        this.productUpdateConsumer.startConsume(["product-updated"]),
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

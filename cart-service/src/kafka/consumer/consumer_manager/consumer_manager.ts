import { KafkaClient } from "../..";
import { Productservice } from "../../../services/product-service";
import { Userservice } from "../../../services/user-service";
import { KafkaConsumer } from "../consumer";

export class ConsumerManager {
  private kafkaClient: KafkaClient;
  private userUpdateConsumer: KafkaConsumer;
  private userBlockConsumer: KafkaConsumer;
  private userUnBlockConsumer: KafkaConsumer;
  private productCreateConsumer: KafkaConsumer;
  private productUpdateConsumer: KafkaConsumer;
  private userCreateConsumer: KafkaConsumer;

  constructor(
    brokers: string[],
    userService: Userservice,
    productService: Productservice
  ) {
    this.kafkaClient = new KafkaClient("CART_SERVICE_CLIENT", brokers);

    // Initialize Kafka consumers with distinct group IDs
    this.userUpdateConsumer = new KafkaConsumer(
      brokers,
      "user-update-group",
      userService
    );
    this.userCreateConsumer = new KafkaConsumer(
      brokers,
      "user-create-group",
      userService
    );
    this.userBlockConsumer = new KafkaConsumer(
      brokers,
      "user-block-group",
      userService
    );
    this.userUnBlockConsumer = new KafkaConsumer(
      brokers,
      "user-unblock-group",
      userService
    );
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
        this.userUpdateConsumer.connect(),
        this.userCreateConsumer.connect(),
        this.userBlockConsumer.connect(),
        this.userUnBlockConsumer.connect(),
        this.productCreateConsumer.connect(),
        this.productUpdateConsumer.connect(),
      ]);
      await Promise.all([
        this.userUpdateConsumer.startConsume(["user-updated"]),
        this.userCreateConsumer.startConsume(["user-created"]),
        this.userUnBlockConsumer.startConsume(["user-unblock"]),
        this.userBlockConsumer.startConsume(["user-block"]),
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
        this.userUpdateConsumer.disconnect(),
        this.userCreateConsumer.disconnect(),
        this.userBlockConsumer.disconnect(),
        this.userUnBlockConsumer.disconnect(),
      ]);
      console.log("Consumers stopped successfully.");
    } catch (error) {
      console.error("Error stopping consumers:", error);
    }
  }
}

import { KafkaClient } from "../..";
import { Userservice } from "../../../services/user-service";
import { KafkaConsumer } from "../consumer";

export class ConsumerManager {
  private kafkaClient: KafkaClient;
  private userUpdateConsumer: KafkaConsumer;
  private userCreateConsumer: KafkaConsumer;

  constructor(brokers: string[], userService: Userservice) {
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
  }

  public async startConsumers() {
    try {
      await Promise.all([
        this.userUpdateConsumer.connect(),
        this.userCreateConsumer.connect(),
      ]);
      await Promise.all([
        this.userUpdateConsumer.startConsume(["user-updated"]),
        this.userCreateConsumer.startConsume(["user-created"]),
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
      ]);
      console.log("Consumers stopped successfully.");
    } catch (error) {
      console.error("Error stopping consumers:", error);
    }
  }
}

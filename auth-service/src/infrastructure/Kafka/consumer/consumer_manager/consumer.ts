import { KafkaClient } from "../..";
import { UserBlockConsumer } from "../common/consumers/userBlockedConsumer";

export class ConsumerManager {
  private kafkaClient: KafkaClient;
  private userBlockConsumer: UserBlockConsumer;

  constructor(brokers: string[]) {
    this.kafkaClient = new KafkaClient(
      process.env.KAFKA_CLIENT_ID || "AUTH_SERVICE_CLIENT",
      brokers
    );
    const topic = "USER_BLOCK_TOPIC";
    this.userBlockConsumer = new UserBlockConsumer(brokers, topic);
  }

  public async startConsumers() {
    try {
      await this.userBlockConsumer.startConsuming();
      console.log("User Block Consumer started successfully");
    } catch (error) {
      console.error("Error starting consumers:", error);
    }
  }
}

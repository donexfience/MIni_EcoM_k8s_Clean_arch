import { KafkaClient } from "../..";
import { UserBlockConsumer } from "../common/consumers/userBlockedConsumer";
import { UserUnBlockUseCase } from "../../../../application/useCase/user-unblock-user";
import { UserBlockUseCase } from "../../../../application/useCase/user-block-usecase";
import { UserUnBlockConsumer } from "../common/consumers/userUnblockConsumer";

export class ConsumerManager {
  private kafkaClient: KafkaClient;
  private userBlockConsumer: UserBlockConsumer;
  private userUnBlockConsumer: UserUnBlockConsumer;

  constructor(
    brokers: string[],
    private userUnBlockuseCase: UserUnBlockUseCase,
    private userBlockuseCase: UserBlockUseCase
  ) {
    this.kafkaClient = new KafkaClient(
      process.env.KAFKA_CLIENT_ID || "AUTH_SERVICE_CLIENT",
      brokers
    );
    const topic = "USER_BLOCK_TOPIC";
    this.userBlockConsumer = new UserBlockConsumer(
      brokers,
      topic,
      this.userBlockuseCase
    );
    this.userUnBlockConsumer = new UserUnBlockConsumer(
      brokers,
      topic,
      this.userUnBlockuseCase
    );
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

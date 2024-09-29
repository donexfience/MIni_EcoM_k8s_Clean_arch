import { UserUpdatUsecase } from "./../../../../application/useCase/user-update-usecase";
import { KafkaClient } from "../..";
import { UserBlockConsumer } from "../common/consumers/userBlockedConsumer";
import { UserUnBlockUseCase } from "../../../../application/useCase/user-unblock-user";
import { UserBlockUseCase } from "../../../../application/useCase/user-block-usecase";
import { UserUnBlockConsumer } from "../common/consumers/userUnblockConsumer";
import { UserUpdateConsumer } from "../common/consumers/userUpdatedConsumer";

export class ConsumerManager {
  private kafkaClient: KafkaClient;
  private userBlockConsumer: UserBlockConsumer;
  private userUnBlockConsumer: UserUnBlockConsumer;
  private userUdateConsumer: UserUpdateConsumer;

  constructor(
    brokers: string[],
    private userUnBlockuseCase: UserUnBlockUseCase,
    private userBlockuseCase: UserBlockUseCase,
    private UserUpdatUsecase: UserUpdatUsecase
  ) {
    this.kafkaClient = new KafkaClient(
      process.env.KAFKA_CLIENT_ID || "AUTH_SERVICE_CLIENT",
      brokers
    );
    const topic = "user-updated";
    const topic2 = "user-block";
    const topic3 = "user-unblock";
    this.userBlockConsumer = new UserBlockConsumer(
      brokers,
      topic,
      this.userBlockuseCase
    );
    this.userUnBlockConsumer = new UserUnBlockConsumer(
      brokers,
      topic2,
      this.userUnBlockuseCase
    );
    this.userUdateConsumer = new UserUpdateConsumer(
      brokers,
      topic3,
      this.UserUpdatUsecase
    );
  }

  public async startConsumers() {
    try {
      await this.userBlockConsumer.startConsuming();
      await this.userUnBlockConsumer.startConsuming();
      await this.userUdateConsumer.startConsuming();
      console.log("User Block Consumer started successfully");
    } catch (error) {
      console.error("Error starting consumers:", error);
    }
  }
}

import { UserBlockUseCase } from "../../../../../application/useCase/user-block-usecase";
import { User } from "../../../../../domain/entities/User/userEntitiy";
import userModel from "../../../../repositories/mongodb/models/User";
import { KafkaConsumer } from "../consumer";

export class UserBlockConsumer extends KafkaConsumer {
  private topic: string;
  private userBlockUserUseCase: UserBlockUseCase;

  constructor(
    brokers: string[],
    topic: string,
    userBlockUserUsecase: UserBlockUseCase
  ) {
    super(brokers, "auth-service-kafka-group");
    this.topic = topic;
    this.userBlockUserUseCase = userBlockUserUsecase;
  }

  public async startConsuming(
    maxMessages: number = 10,
    duration: number = 60000
  ) {
    await this.connect(); // Connect to the Kafka consumer

    // Subscribe to the specified topic
    await this.subscribeToTopic();

    // Start consuming messages
    await this.consume(this.topic, maxMessages, duration);
  }

  private async subscribeToTopic() {
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
    console.log(`Subscribed to topic: ${this.topic}`);
  }

  protected async handleUserBlock(data: {
    _id: string;
    email: string;
    isBlocked: boolean;
  }) {
    try {
      const user = await this.userBlockUserUseCase.execute(
        data._id,
        data.isBlocked
      );
      console.log(user, "user consumed by blockoconsumer");
      console.log("==========");
      console.log("User block consumed in auth-service");
      console.log("==========");
    } catch (error: any) {
      console.log("Error processing user block:", error?.message);
    }
  }

  protected async processMessage(data: any) {
    await this.handleUserBlock(data);
  }

  public async consume(
    topic: string,
    maxMessages: number,
    duration: number
  ): Promise<any[]> {
    const messages: any[] = [];
    this.isRunning = true;

    await this.consumer.subscribe({ topic, fromBeginning: true });

    const startTime = Date.now();

    await this.consumer.run({
      eachMessage: async (payload) => {
        if (!this.isRunning) return;

        try {
          if (!payload.message.value) {
            throw new Error("message is empty");
          }

          const data = JSON.parse(payload.message.value.toString());
          messages.push(data);
          console.log("Received data:", data);

          // Process the user block message
          await this.processMessage(data);

          // Check for stopping conditions
          if (
            messages.length >= maxMessages ||
            Date.now() - startTime >= duration
          ) {
            console.log("Stopping consumption.");
            this.isRunning = false; // Stop processing messages
            await this.disconnect();
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      },
    });

    while (this.isRunning) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return messages;
  }
}

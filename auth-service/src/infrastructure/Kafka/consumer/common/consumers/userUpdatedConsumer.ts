import { UserBlockUseCase } from "../../../../../application/useCase/user-block-usecase";
import { UserUnBlockUseCase } from "../../../../../application/useCase/user-unblock-user";
import { UserUpdatUsecase } from "../../../../../application/useCase/user-update-usecase";
import { User } from "../../../../../domain/entities/User/userEntitiy";

import userModel from "../../../../repositories/mongodb/models/User";
import { KafkaConsumer } from "../consumer";

export class UserUpdateConsumer extends KafkaConsumer {
  private topic: string;
  private userUpdateUseCase: UserUpdatUsecase;

  constructor(
    brokers: string[],
    topic: string,
    userUpdateUseCase: UserUpdatUsecase
  ) {
    super(brokers, "auth-service-kafka-group");
    this.topic = topic;
    this.userUpdateUseCase = userUpdateUseCase;
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

  // Updated method to handle user updates
  protected async handleUserUpdate(data: {
    userId: string;
    updates: Partial<User>;
  }) {
    try {
      console.log("==========");
      console.log("User update consumed in auth-service");
      console.log("User ID:", data.userId);
      console.log("Updates:", data.updates);
      console.log("==========");

      // Call the UserUpdateUseCase to update the user
      const updatedUser = await this.userUpdateUseCase.execute(
        data.userId,
        data.updates
      );
      if (updatedUser) {
        console.log("User updated successfully:", updatedUser);
      } else {
        console.log("User not found for ID:", data.userId);
      }
    } catch (error: any) {
      console.log("Error processing user update:", error?.message);
    }
  }

  protected async processMessage(data: any) {
    console.log(data,"data here procesing")
    await this.handleUserUpdate(data);
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

          // Process the user update message
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

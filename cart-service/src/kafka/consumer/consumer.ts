import { Kafka, EachMessagePayload } from "kafkajs";

export class KafkaConsumer {
  private kafka: Kafka;
  public consumer: any;
  private service: any; 

  constructor(brokers: string[], groupId: string, service: any) {
    this.kafka = new Kafka({
      clientId: "AUTH_SERVICE_CLIENT",
      brokers,
    });
    this.consumer = this.kafka.consumer({ groupId });
    this.service = service;
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

          // Separate logic for products (if productId exists)
          if (data.productId) {
            console.log("Product handling, productId:", data.productId);
            await this.handleProductData(data);
          }
          // Separate logic for users (if _id exists)
          else if (data._id) {
            console.log("User handling, userId:", data._id);
            await this.handleUserData(data);
          }
          // Log unhandled data
          else {
            console.log("Received data does not match known schemas:", data);
          }
        } catch (error) {
          console.error("Error in Kafka consumer:", error);
        }
      },
    });
  }

  // Handle product-related data
  private async handleProductData(data: any) {
    try {
      // Call product-related service methods
      if (data.productId) {
        console.log("Handling product data with productId:", data.productId);
        await this.service.createProduct(data);
      } else {
        console.log("Handling product update");
        await this.service.updateProduct(data);
      }
    } catch (error) {
      console.error("Error handling product data:", error);
    }
  }

  // Handle user-related data
  private async handleUserData(data: any) {
    try {
      // If the user isBlocked flag exists, handle blocking/unblocking
      if (data.isBlocked !== undefined) {
        if (data.isBlocked) {
          console.log("Blocking user with userId:", data._id);
          await this.service.userBlock(data._id);
        } else {
          console.log("Unblocking user with userId:", data._id);
          await this.service.userUnBlock(data._id);
        }
      } else {
        // Otherwise, handle user updates
        console.log("Updating user with userId:", data._id);
        await this.service.userUpdate(data._id, data);
      }
    } catch (error) {
      console.error("Error handling user data:", error);
    }
  }
}

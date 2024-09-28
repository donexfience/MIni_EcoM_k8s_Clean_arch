import { Kafka, EachMessagePayload } from "kafkajs";
import { Userservice } from "../../services/user-service";

export class KafkaConsumer {
  private kafka: Kafka;
  public consumer: any;

  constructor(
    brokers: string[],
    groupId: string,
    private userService: Userservice
  ) {
    this.kafka = new Kafka({
      clientId: "AUTH_SERVICE_CLIENT",
      brokers,
    });
    this.consumer = this.kafka.consumer({ groupId });
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

          if (data.id) {
            if (data.isBlocked !== undefined) {
              if (data.isBlocked) {
                await this.userService.userBlock(data.id);
              } else {
                await this.userService.userUnBlock(data.id);
              }
            } else {
              // User update logic
              await this.userService.userUpdate(data.id, data);
            }
          } else {
            await this.userService.create(data);
          }
        } catch (error) {
          console.error("Error in Kafka consumer:", error);
        }
      },
    });
  }
}

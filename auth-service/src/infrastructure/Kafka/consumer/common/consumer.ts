import { Kafka, Consumer, EachMessagePayload } from "kafkajs";

export class KafkaConsumer {
  private kafka: Kafka;
  public consumer: Consumer;
  public isRunning: boolean = false;

  constructor(brokers: string[], groupId: string) {
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
      eachMessage: async (payload: EachMessagePayload) => {
        if (!this.isRunning) return;

        try {
          if (!payload.message.value) {
            throw new Error("message is empty");
          }
          const data = JSON.parse(payload.message.value.toString());
          messages.push(data);
          console.log("Received data:", data);

          // if we've reached the maximum number of messages or elapsed duration
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
      await new Promise((resolve) => setTimeout(resolve, 100)); // Polling
    }

    return messages;
  }
}

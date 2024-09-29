import { consumer } from "../kafkaClient";

export const startConsumer = async (
  topics: string[],
  topicHandlers: { [topic: string]: (data: any) => Promise<void> }
) => {
  try {
    await consumer.connect();

    // Subscribe to each specified topic
    for (const topic of topics) {
      await consumer.subscribe({ topic, fromBeginning: true });
    }

    console.log(`Consumer connected and subscribed to: ${topics.join(", ")}`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const data = JSON.parse(message.value?.toString() || "{}");
        console.log("consumed data", data);
        if (topicHandlers[topic]) {
          await topicHandlers[topic](data); // Call the appropriate handler
        } else {
          console.warn(`No handler found for topic: ${topic}`);
        }
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to stop the consumer
export const stopConsumer = async () => {
  await consumer.disconnect();
  console.log("Consumer disconnected");
};

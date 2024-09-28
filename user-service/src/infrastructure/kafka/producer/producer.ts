import { Producer, ProducerRecord } from "kafkajs";
import { producer } from "../kafkaClient";

export const sendToaKafkaTopic = async (
  topics: string[],
  key: string,
  message: Record<string, any>
): Promise<void> => {
  try {
    await producer.connect();
    //making message for the batch
    const topicMessages: ProducerRecord[] = topics.map((topic) => ({
      topic,
      messages: [
        {
          key,
          value: JSON.stringify(message),
        },
      ],
    }));
    await producer.sendBatch({ topicMessages });
    console.log("messages send", topics);
  } catch (error: any) {
    console.error("kafka produce error", error.message);
  } finally {
    await producer.disconnect();
  }
};

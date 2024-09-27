import AWS from "aws-sdk";

import { SQS_QUEUE_URL } from "@/config";
import { MessagePayload } from "@/schemas/message-payload";

AWS.config.update({ region: "us-east-1" });

class SQSService {
  private sqs: AWS.SQS;
  private pollInterval: NodeJS.Timeout | null = null;
  private queueUrl: string;

  constructor(queueUrl: string) {
    if (!queueUrl) throw new Error("Queue URL not provided");
    this.sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
    this.queueUrl = queueUrl;
  }

  async sendMessage(messageBody: MessagePayload): Promise<void> {
    try {
      await this.sqs
        .sendMessage({
          QueueUrl: this.queueUrl,
          MessageBody: JSON.stringify(messageBody),
        })
        .promise();
    } catch (error) {
      console.error("[ERROR] Error sending message:", error);
    }
  }

  async receiveMessages(
    callback: (message: string) => Promise<void> | void
  ): Promise<void> {
    try {
      const data = await this.sqs
        .receiveMessage({
          QueueUrl: this.queueUrl,
          MaxNumberOfMessages: 10,
          WaitTimeSeconds: 10,
        })
        .promise();

      if (!data.Messages || data.Messages.length === 0) return;

      for (const message of data.Messages) {
        await callback(message.Body);
        await this.deleteMessage(message.ReceiptHandle!);
      }
    } catch (error) {
      console.error("[ERROR] Error receiving messages:", error);
    }
  }

  private async deleteMessage(receiptHandle: string): Promise<void> {
    try {
      await this.sqs
        .deleteMessage({
          QueueUrl: this.queueUrl,
          ReceiptHandle: receiptHandle,
        })
        .promise();
    } catch (error) {
      console.error("[ERROR] Error deleting message:", error);
    }
  }

  startPolling(
    intervalMs: number = 15000,
    callback: (message: string) => Promise<void> | void
  ): void {
    console.log("[SQS] Polling started");
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      this.receiveMessages(callback);
    }, intervalMs) as NodeJS.Timeout;
  }

  stopPolling(): void {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }
}

const sqsService = new SQSService(SQS_QUEUE_URL);

export default sqsService;

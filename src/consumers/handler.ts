import { messagePayloadSchema } from "@/schemas/message-payload";

import { saveBoardData } from "./save-board-data";

export async function messageHandler(rawMessage: string) {
  const jsonMessage = JSON.parse(rawMessage);
  const parsedMessage = messagePayloadSchema.parse(jsonMessage);

  switch (parsedMessage.action) {
    case "save-board":
      await saveBoardData(parsedMessage);
      break;
    default:
      throw new Error("Invalid message action");
  }
}

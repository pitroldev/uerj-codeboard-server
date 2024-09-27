import { z } from "zod";

export const messagePayloadSchema = z.object({
  action: z.enum(["save-board"]),
  payload: z.any(),
});

export type MessagePayload = z.infer<typeof messagePayloadSchema>;

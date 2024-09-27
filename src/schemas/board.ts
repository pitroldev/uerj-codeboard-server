import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const boardSchema = z.object({
  content: z.string({ message: "O conteúdo é obrigatório." }),
  user: z.string().refine(isValidObjectId),
  room: z.string().refine(isValidObjectId),
  updatedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
});

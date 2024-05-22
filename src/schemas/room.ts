import { z } from "zod";

export const roomSchema = z.object({
  name: z
    .string({
      message: "O nome é obrigatório.",
    })
    .min(3, {
      message: "O nome deve ter no mínimo 3 caracteres.",
    })
    .max(64, {
      message: "O nome deve ter no máximo 64 caracteres.",
    }),
  description: z
    .string()
    .min(3, {
      message: "A descrição deve ter no mínimo 3 caracteres.",
    })
    .max(1024, {
      message: "A descrição deve ter no máximo 1024 caracteres.",
    })
    .optional(),
});

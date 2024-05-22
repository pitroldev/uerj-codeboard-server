import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({
      message: "O nome é obrigatório.",
    })
    .min(2, {
      message: "O nome deve ter no mínimo 2 caracteres.",
    })
    .max(128, {
      message: "O nome deve ter no máximo 128 caracteres.",
    }),
  email: z
    .string({
      message: "O e-mail é obrigatório.",
    })
    .email({
      message: "O e-mail é inválido.",
    }),
  password: z
    .string({
      message: "A senha é obrigatória.",
    })
    .min(8, {
      message: "A senha deve ter no mínimo 8 caracteres.",
    })
    .regex(/[A-Z]/, {
      message: "A senha deve ter no mínimo uma letra maiúscula.",
    })
    .regex(/[a-z]/, {
      message: "A senha deve ter no mínimo uma letra minúscula.",
    })
    .regex(/[0-9]/, {
      message: "A senha deve ter no mínimo um número.",
    }),
  profilePictureUrl: z
    .string()
    .url({
      message: "A URL da foto de perfil é inválida.",
    })
    .optional(),
});

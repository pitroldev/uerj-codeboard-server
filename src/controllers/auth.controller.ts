import { z } from "zod";
import { Request, Response } from "express";

import { userSchema } from "@/schemas/user";

import User from "@/models/mongo/user";

export const login = async (req: Request, res: Response) => {
  const { body } = req;

  const expectedSchema = z.object({
    email: userSchema.shape.email,
    password: z.string({
      message: "Senha é obrigatória",
    }),
  });

  const result = expectedSchema.safeParse(body);
  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const user = await User.findOne({ email: body.email }).select("+password");
  if (!user) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  const isValidPassword = await user.compareHash(body.password);
  if (!isValidPassword) {
    res.status(400).json({ message: "Senha inválida" });
    return;
  }

  const authToken = await user.generateAuthToken();

  return res
    .status(200)
    .json({ data: user, authToken, message: "Usuário logado com sucesso" });
};

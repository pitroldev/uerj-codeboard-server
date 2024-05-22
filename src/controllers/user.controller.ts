import { Request, Response } from "express";

import { AuthRequest } from "@/types/request";
import { userSchema } from "@/schemas/user";

import User from "@/models/mongo/user";

export async function create(req: Request, res: Response) {
  const { body } = req;

  const result = userSchema.safeParse(body);
  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const userExists = await User.exists({ email: body.email });

  if (userExists) {
    res.status(409).json({ message: "Usuário já existe" });
    return;
  }

  const user = await User.create(result.data);
  delete user.password;

  return res.status(201).json({
    data: user,
    message: "Usuário criado com sucesso",
  });
}

export async function update(req: AuthRequest, res: Response) {
  const { body, user } = req;

  const result = userSchema
    .pick({ name: true, profilePictureUrl: true })
    .safeParse(body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const updatedUser = await User.findById(user._id);
  if (!updatedUser) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  updatedUser.set(result.data);
  await updatedUser.save();

  return res.status(200).json({
    data: updatedUser,
    message: "Usuário atualizado com sucesso",
  });
}

export async function show(req: AuthRequest, res: Response) {
  const { user } = req;

  return res.status(200).json({ data: user });
}

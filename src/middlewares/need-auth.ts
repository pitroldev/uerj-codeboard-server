import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { DecodedJWT } from "@/types/jwt";

import User from "@/models/mongo/user";

async function needAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("Token não fornecido");

    const [, token] = authHeader.split(" ");

    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret) as DecodedJWT;

    const user = await User.findById(decoded?.user?._id);
    if (!user) throw new Error("Usuário não encontrado");

    Object.assign(req, { user });
    next();
  } catch (err) {
    res.status(401).json({ error: "Token Inválido" });
  }
}

export default needAuth;

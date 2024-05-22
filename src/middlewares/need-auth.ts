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
    if (!authHeader) {
      res.status(401).json({ error: "Token não encontrado" });
      return;
    }
    const [, token] = authHeader.split(" ");

    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret) as DecodedJWT;

    const user = await User.findById(decoded?.user?._id);
    if (!user) {
      res.status(401).json({ message: "Token inválido" });
      return;
    }

    Object.assign(req, { user });
    next();
  } catch (err) {
    res.status(401).json({ error: "Token Inválido" });
  }
}

export default needAuth;

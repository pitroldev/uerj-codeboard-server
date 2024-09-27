import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

import { DecodedJWT } from "@/types/jwt";

import User from "@/models/mongo/user";

export function handleSocketAuth(socket: Socket, next: (e?: Error) => void) {
  try {
    const authToken = socket.handshake.auth.Authorization;
    if (!authToken) throw new Error("Token não fornecido");

    const [, token] = authToken.split(" ");

    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret) as DecodedJWT;

    User.findById(decoded?.user?._id).then((user) => {
      if (!user) throw new Error("Usuário não encontrado");

      Object.assign(socket, { user: user.toJSON() });
      next();
    });
  } catch (error) {
    socket.emit("error", { type: "auth", message: "INVALID_TOKEN" });
  }
}

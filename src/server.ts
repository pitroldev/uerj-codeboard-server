import { Server as HttpServer } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";

import "@/db/mongo";
import "@/db/redis";
import app from "@/app";

import { handleSocketAuth } from "@/middlewares/socket-auth";

import Board from "@/models/redis/board";
import OnlineUser from "@/models/redis/online-user";
import { UserProps } from "@/models/mongo/user";

const httpServer = new HttpServer(app);

const io = new SocketIOServer(httpServer, {
  cors: { methods: ["GET", "POST"] },
});

io.use(handleSocketAuth);

io.on("connect", (socket: Socket & { user: UserProps & { _id: string } }) => {
  const userId = socket.user._id;

  socket.on("room:join", (roomId: string) => {
    // TODO: Implementar a lógica de verificação de permissão

    OnlineUser.addToRoom(roomId, userId).then(() => {
      socket.join(roomId);
      socket.emit("room:joined", userId);
      socket.to(roomId).emit("room:joined", userId);

      OnlineUser.findByRoomId(roomId).then((users) => {
        socket.emit("room:members", users);
      });
    });

    Board.find(roomId, userId).then((content) => {
      socket.emit("board:read", {
        userId,
        content,
      });
    });

    socket.on("disconnect", () => {
      OnlineUser.removeFromRoom(roomId, userId);
      socket.to(roomId).emit("room:left", userId);
    });
  });

  socket.on("board:write", (roomId: string, content: string) => {
    Board.update(roomId, userId, content).then(() => {
      socket.to(roomId).emit("board:written", userId);
      socket.emit("board:written", userId);
    });
  });

  socket.on("board:read", (roomId: string, targetUserId: string) => {
    Board.find(roomId, targetUserId).then((content) => {
      socket.emit("board:read", {
        userId: targetUserId,
        content,
      });
    });
  });
});

const { SERVER_PORT, ENV } = process.env;
httpServer.listen(SERVER_PORT);
console.log(`[SERVER] ${ENV} server running on port ${SERVER_PORT}`);

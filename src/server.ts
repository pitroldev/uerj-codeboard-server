import { Server as HttpServer } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";

import "@/db/mongo";
import "@/db/redis";
import app from "@/app";

import { handleSocketAuth } from "@/middlewares/socket-auth";

import Board from "@/models/redis/board";
import OnlineUser from "@/models/redis/online-user";
import BoardViewers from "@/models/redis/board-viewers";

import { UserProps } from "@/models/mongo/user";

const httpServer = new HttpServer(app);

const io = new SocketIOServer(httpServer, {
  cors: { methods: ["GET", "POST"] },
});

io.use(handleSocketAuth);

io.on("connect", (socket: Socket & { user: UserProps & { _id: string } }) => {
  const userId = socket.user._id;

  socket.on("disconnecting", () => {
    socket.rooms.forEach((id) => {
      const isRoom = id.startsWith("room:");
      if (isRoom) {
        const roomId = id.replace("room:", "");
        OnlineUser.removeFromRoom(roomId, userId);
        socket.to(id).emit("room:left", userId);
      }

      const isBoard = id.startsWith("board:");
      if (isBoard) {
        const [roomId, boardId] = id.replace("board:", "").split(":")[1];
        BoardViewers.removeFromBoard(roomId, boardId, userId);
        socket.to(id).emit("board:left", id, userId);
      }
    });
  });

  socket.on("room:join", (roomId: string) => {
    // TODO: Implementar a lógica de verificação de permissão

    OnlineUser.addToRoom(roomId, userId).then(() => {
      socket.join(`room:${roomId}`);
      socket.emit("room:joined", userId);
      socket.to(`room:${roomId}`).emit("room:joined", userId);

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
  });

  socket.on("board:join", (roomId: string, boardId: string) => {
    BoardViewers.addToBoard(roomId, boardId, userId);
    BoardViewers.find(roomId, boardId).then((viewers) => {
      socket.emit("board:viewers", viewers);
    });
    socket.join(`board:${roomId}:${boardId}`);
    socket
      .to(`board:${roomId}:${boardId}`)
      .emit("board:joined", { boardId, userId });
  });

  socket.on("board:leave", (roomId: string, boardId: string) => {
    BoardViewers.removeFromBoard(roomId, boardId, userId);
    socket.leave(`board:${roomId}:${boardId}`);
    socket
      .to(`board:${roomId}:${boardId}`)
      .emit("board:left", { boardId, userId });
  });

  socket.on("board:write", (roomId: string, content: string) => {
    socket.emit("board:typed", userId);
    socket.to(`room:${roomId}`).emit("board:typed", userId);

    // TODO: Implementar a lógica de verificação de permissão
    // TODO: Clarificar a lógica de escrita no board
    Board.update(roomId, userId, content).then(() => {
      socket
        .to(`board:${roomId}:${userId}`)
        .emit("board:written", { boardId: userId, content });
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

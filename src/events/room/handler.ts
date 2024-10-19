import { Socket } from "socket.io";

import Board from "@/models/redis/board";
import OnlineUser from "@/models/redis/online-user";

export const handleRoomEvents = (socket: Socket, userId: string) => {
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

    Board.find(roomId, userId).then((data) => {
      socket.emit("board:read", {
        userId,
        ...data,
      });
    });
  });
};

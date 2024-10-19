import { Socket } from "socket.io";

import Board from "@/models/redis/board";
import BoardViewers from "@/models/redis/board-viewers";

export const handleBoardEvents = (socket: Socket, userId: string) => {
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

  socket.on(
    "board:write",
    (roomId: string, data: { content: string; language: string }) => {
      socket.emit("board:typed", userId);
      socket.to(`room:${roomId}`).emit("board:typed", userId);

      // TODO: Implementar a lógica de verificação de permissão
      // TODO: Clarificar a lógica de escrita no board
      Board.update(roomId, userId, data).then(() => {
        socket
          .to(`board:${roomId}:${userId}`)
          .emit("board:written", { boardId: userId, ...data });
      });
    }
  );

  socket.on(
    "board:highlight",
    (roomId: string, boardId: string, selection: any) => {
      socket
        .to(`board:${roomId}:${boardId}`)
        .emit("board:highlighted", { boardId, userId, selection });
    }
  );

  socket.on("board:read", (roomId: string, targetUserId: string) => {
    Board.find(roomId, targetUserId).then((data) => {
      socket.emit("board:read", {
        userId: targetUserId,
        ...data,
      });
    });
  });
};

import { Socket } from "socket.io";

import sqsService from "@/services/sqs";

import Board from "@/models/redis/board";
import OnlineUser from "@/models/redis/online-user";
import BoardViewers from "@/models/redis/board-viewers";

export const handleDisconnectEvents = (socket: Socket, userId: string) => {
  socket.on("disconnecting", () => {
    socket.rooms.forEach((id) => {
      const isRoom = id.startsWith("room:");
      if (isRoom) {
        const roomId = id.replace("room:", "");
        OnlineUser.removeFromRoom(roomId, userId);
        socket.to(id).emit("room:left", userId);

        Board.find(roomId, userId).then(({ content, language }) => {
          sqsService.sendMessage({
            action: "save-board",
            payload: {
              user: userId,
              room: roomId,
              content,
              language,
              createdAt: new Date(),
            },
          });
        });
      }

      const isBoard = id.startsWith("board:");
      if (isBoard) {
        const [roomId, boardId] = id.replace("board:", "").split(":");
        BoardViewers.removeFromBoard(roomId, boardId, userId);
        socket.to(id).emit("board:left", id, userId);
      }
    });
  });
};

import Board, { BoardProps } from "@/models/mongo/board";

import { boardSchema } from "@/schemas/board";
import { MessagePayload } from "@/schemas/message-payload";

type SaveBoardMessage = MessagePayload & {
  action?: "save-board";
  payload?: BoardProps;
};

export async function saveBoardData(message: SaveBoardMessage) {
  if (message.action !== "save-board") return;

  const boardData = boardSchema.parse(message.payload);

  const currentBoard = await Board.findOne({
    room: boardData.room,
    user: boardData.user,
  });

  if (!currentBoard) {
    await Board.create(boardData);
    return;
  }

  if (currentBoard.createdAt > boardData.createdAt) return;

  await Board.findOneAndUpdate(
    { room: boardData.room, user: boardData.user },
    { content: boardData.content, language: boardData.language }
  );
}

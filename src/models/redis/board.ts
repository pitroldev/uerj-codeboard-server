import redis from "@/db/redis";

type BoardData = string;

export default {
  find: async (roomId: string, boardId: string): Promise<BoardData> => {
    const data = await redis.get(`board:${roomId}:${boardId}:code`);
    if (!data) return null;

    return data;
  },
  update: async (roomId: string, boardId: string, boardData: BoardData) => {
    return redis.set(
      `board:${roomId}:${boardId}:code`,
      boardData,
      "EX",
      60 * 60 * 24 * 7
    );
  },
};

import redis from "@/db/redis";

type BoardData = string;

export default {
  find: async (roomId: string, userId: string): Promise<BoardData> => {
    const data = await redis.get(`boards:${roomId}:${userId}`);
    if (!data) return null;

    return data;
  },
  update: async (roomId: string, userId: string, boardData: BoardData) => {
    return redis.set(
      `boards:${roomId}:${userId}`,
      boardData,
      "EX",
      60 * 60 * 24 * 7
    );
  },
};

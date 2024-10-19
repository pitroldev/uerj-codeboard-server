import redis from "@/db/redis";

type BoardData = { content: string; language: string };

export default {
  find: async (roomId: string, boardId: string): Promise<BoardData> => {
    const data = await redis.get(`board:${roomId}:${boardId}:code`);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  },
  update: async (roomId: string, boardId: string, data: BoardData) => {
    return redis.set(
      `board:${roomId}:${boardId}:code`,
      JSON.stringify(data),
      "EX",
      60 * 60 * 24 * 7
    );
  },
};

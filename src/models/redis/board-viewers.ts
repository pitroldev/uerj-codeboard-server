import redis from "@/db/redis";

export default {
  find: async (roomId: string, boardId: string) => {
    return redis.smembers(`boards:${roomId}:${boardId}:viewers`);
  },
  addToBoard: async (roomId: string, boardId: string, userId: string) => {
    return redis.sadd(`boards:${roomId}:${boardId}:viewers`, userId);
  },
  removeFromBoard: async (roomId: string, boardId: string, userId: string) => {
    return redis.srem(`boards:${roomId}:${boardId}:viewers`, userId);
  },
};

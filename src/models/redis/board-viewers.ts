import redis from "@/db/redis";

export default {
  find: async (roomId: string, boardId: string) => {
    return redis.smembers(`board:${roomId}:${boardId}:viewers`);
  },
  addToBoard: async (roomId: string, boardId: string, userId: string) => {
    return redis.sadd(`board:${roomId}:${boardId}:viewers`, userId);
  },
  removeFromBoard: async (roomId: string, boardId: string, userId: string) => {
    return redis.srem(`board:${roomId}:${boardId}:viewers`, userId);
  },
};
